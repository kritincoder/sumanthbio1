"""
QA suite for the production build. Usage:
  npm run build && npm start   (in another shell)
  python3 tests/qa.py [--shots DIR]

Checks every route on desktop and mobile:
  - HTTP status, console errors, page errors, failed requests (404s)
  - exactly one <h1>, heading order, images have alt text
  - no horizontal overflow
  - both Amazon CTAs present with the exact client-supplied URLs
  - all internal links resolve
  - keyboard: Tab reaches the skip link first, focus ring visible
  - reduced motion: hero is not pinned, content visible, no canvas
  - mobile menu opens, traps Escape, closes
"""
import asyncio, json, sys, urllib.request
from playwright.async_api import async_playwright

BASE = "http://localhost:3000"
ROUTES = ["/", "/the-book", "/about", "/philosophy", "/insights", "/press", "/contact"]
AMAZON = {"https://www.amazon.com/dp/9375008665", "https://www.amazon.in/dp/B0HJ8R9GXW"}
SHOTS = sys.argv[sys.argv.index("--shots") + 1] if "--shots" in sys.argv else None
IGNORE = ("THREE.Clock", "GL Driver", "GPU stall", "Download the React DevTools")

results, failures = [], []

def check(cond, msg):
    (results if cond else failures).append(msg)

async def audit(ctx, route, label):
    page = await ctx.new_page()
    errors, bad = [], []
    page.on("console", lambda m: m.type in ("error", "warning") and not any(i in m.text for i in IGNORE) and errors.append(f"{m.type}: {m.text}"))
    page.on("pageerror", lambda e: errors.append(f"pageerror: {e}"))
    page.on("response", lambda r: r.status >= 400 and r.url.startswith(BASE) and bad.append(f"{r.status} {r.url}"))
    resp = await page.goto(BASE + route, wait_until="networkidle")
    await page.wait_for_timeout(1800)
    check(resp.status == 200, f"[{label}] {route} status {resp.status}")
    info = await page.evaluate("""() => ({
      h1: document.querySelectorAll('h1').length,
      headings: [...document.querySelectorAll('h1,h2,h3')].map(h => +h.tagName[1]),
      imgsNoAlt: [...document.images].filter(i => !i.hasAttribute('alt')).length,
      overflow: document.documentElement.scrollWidth - window.innerWidth,
      links: [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')),
      title: document.title,
      desc: document.querySelector('meta[name=description]')?.content || '',
      ogImage: document.querySelector('meta[property="og:image"]')?.content || '',
      jsonld: [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => s.textContent),
    })""")
    check(info["h1"] == 1, f"[{label}] {route} one h1 (found {info['h1']})")
    skips = [b for a, b in zip(info["headings"], info["headings"][1:]) if b - a > 1]
    check(not skips, f"[{label}] {route} heading levels do not skip ({info['headings']})")
    check(info["imgsNoAlt"] == 0, f"[{label}] {route} all images have alt")
    check(info["overflow"] <= 0, f"[{label}] {route} no horizontal overflow ({info['overflow']}px)")
    check(bool(info["title"]) and bool(info["desc"]), f"[{label}] {route} title+description: {info['title']!r}")
    check(not errors, f"[{label}] {route} no console errors {errors[:3]}")
    check(not bad, f"[{label}] {route} no failed requests {bad[:3]}")
    for j in info["jsonld"]:
        d = json.loads(j)
        s = json.dumps(d)
        check("aggregateRating" not in s and "review" not in s.lower() and "offers" not in s, f"[{label}] {route} JSON-LD has no ratings/reviews/prices")
    if route in ("/", "/the-book"):
        found = {h for h in info["links"] if "amazon" in h}
        check(found == AMAZON, f"[{label}] {route} Amazon links exact: {sorted(found)}")
    if SHOTS:
        await page.screenshot(path=f"{SHOTS}/{label}{route.replace('/', '_') or '_home'}.png", full_page=route != "/")
    await page.close()
    return [h for h in info["links"] if h.startswith("/")]

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--use-angle=swiftshader", "--enable-unsafe-swiftshader"])
        desktop = await b.new_context(viewport={"width": 1440, "height": 900})
        mobile = await b.new_context(viewport={"width": 390, "height": 844}, is_mobile=True, has_touch=True, device_scale_factor=2)
        internal = set()
        for r in ROUTES:
            internal |= set(await audit(desktop, r, "desktop"))
            internal |= set(await audit(mobile, r, "mobile"))

        # Internal links resolve
        for href in sorted(internal):
            path = href.split("#")[0] or "/"
            code = urllib.request.urlopen(BASE + path).status
            check(code == 200, f"internal link {href} -> {code}")
        try:
            urllib.request.urlopen(BASE + "/does-not-exist")
            check(False, "unknown route returns 404")
        except urllib.error.HTTPError as e:
            check(e.code == 404, f"unknown route returns 404 ({e.code})")

        # Keyboard: first Tab lands on skip link with visible focus
        page = await desktop.new_page()
        await page.goto(BASE + "/the-book", wait_until="networkidle")
        await page.keyboard.press("Tab")
        await page.wait_for_timeout(400)
        f = await page.evaluate("({t: document.activeElement.textContent.trim(), o: getComputedStyle(document.activeElement).outlineStyle, top: document.activeElement.getBoundingClientRect().top})")
        check(f["t"] == "Skip to content" and f["top"] >= 0, f"keyboard: first Tab focuses visible skip link ({f})")
        for _ in range(3):
            await page.keyboard.press("Tab")
        o = await page.evaluate("getComputedStyle(document.activeElement).outlineStyle")
        check(o != "none", f"keyboard: focus ring visible on nav ({o})")
        await page.close()

        # Hero cinematic mode (desktop). This container renders WebGL in software, which the
        # site deliberately treats as "not capable" — so ?force3d is used to exercise the 3D path.
        page = await desktop.new_page()
        await page.goto(BASE + "/?force3d", wait_until="networkidle")
        await page.wait_for_timeout(2500)
        hero = await page.evaluate("({canvas: !!document.querySelector('canvas'), h: document.querySelector('section').offsetHeight, vh: innerHeight})")
        check(hero["canvas"] and hero["h"] > hero["vh"] * 3, f"cinematic: WebGL canvas present, hero pinned ({hero})")
        await page.goto(BASE + "/", wait_until="networkidle")
        await page.wait_for_timeout(1500)
        sw = await page.evaluate("({canvas: !!document.querySelector('canvas'), h: document.querySelector('section').offsetHeight, vh: innerHeight})")
        check(not sw["canvas"] and sw["h"] < sw["vh"] * 3, f"software-WebGL device gets static hero ({sw})")
        await page.close()

        # Reduced motion: no canvas, hero not pinned, all reveal content visible
        rm = await b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce")
        page = await rm.new_page()
        await page.goto(BASE + "/", wait_until="networkidle")
        await page.wait_for_timeout(1500)
        r = await page.evaluate("""() => ({canvas: !!document.querySelector('canvas'), h: document.querySelector('section').offsetHeight,
          hidden: [...document.querySelectorAll('[data-reveal]')].filter(e => getComputedStyle(e).opacity !== '1').length,
          preloader: getComputedStyle(document.querySelector('.preloader')).display})""")
        check(not r["canvas"] and r["hidden"] == 0 and r["preloader"] == "none", f"reduced motion: static hero, all content visible, no preloader ({r})")
        if SHOTS:
            await page.screenshot(path=f"{SHOTS}/reduced_home.png", full_page=True)
        await rm.close()

        # No JavaScript: content and CTAs still present and visible
        nojs = await b.new_context(viewport={"width": 1440, "height": 900}, java_script_enabled=False)
        page = await nojs.new_page()
        await page.goto(BASE + "/", wait_until="load")
        await page.wait_for_timeout(1800)
        n = await page.evaluate("""() => ({links: [...document.querySelectorAll('a[href*=amazon]')].filter(a => a.offsetParent).length,
          hidden: [...document.querySelectorAll('[data-reveal]')].filter(e => getComputedStyle(e).opacity !== '1').length,
          veil: getComputedStyle(document.querySelector('.preloader')).visibility})""")
        check(n["links"] >= 2 and n["hidden"] == 0 and n["veil"] == "hidden", f"no-JS: purchase links visible, content visible, veil ends by itself ({n})")
        await nojs.close()

        # Mobile menu: opens, Escape closes, focus returns
        page = await mobile.new_page()
        await page.goto(BASE + "/about", wait_until="networkidle")
        await page.click("button[aria-controls=mobile-menu]")
        opened = await page.evaluate("!document.getElementById('mobile-menu').hidden")
        await page.keyboard.press("Escape")
        closed = await page.evaluate("document.getElementById('mobile-menu').hidden && document.activeElement.getAttribute('aria-controls') === 'mobile-menu'")
        check(opened and closed, f"mobile menu opens and Escape closes with focus return ({opened}, {closed})")
        await page.click("button[aria-controls=mobile-menu]")
        await page.click("#mobile-menu a[href='/the-book']")
        await page.wait_for_url(BASE + "/the-book")
        closed2 = await page.evaluate("document.getElementById('mobile-menu').hidden")
        check(closed2, "mobile menu closes on navigation")
        await page.close()
        await b.close()

    for r in results:
        print("PASS", r)
    for f in failures:
        print("FAIL", f)
    print(f"\n{len(results)} passed, {len(failures)} failed")
    sys.exit(1 if failures else 0)

asyncio.run(main())
