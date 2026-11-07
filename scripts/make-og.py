"""Regenerate public/og.jpg (1200x630 social share image) from the cover and site fonts.
Requires: pip install fonttools brotli pillow. Run: python3 scripts/make-og.py
Re-run after replacing the provisional cover with the high-resolution original."""
import os, tempfile
from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont, ImageFilter

tmp = tempfile.mkdtemp()
def ttf(name):
    f = TTFont(f"src/fonts/{name}.woff2"); f.flavor = None
    out = os.path.join(tmp, name + ".ttf"); f.save(out); return out

serif, serif_i, sans = ttf("instrument-serif-latin-400-normal"), ttf("instrument-serif-latin-400-italic"), ttf("inter-latin-wght-normal")
W, H = 1200, 630
im = Image.new("RGB", (W, H), "#101114")
glow = Image.new("L", (W, H), 0); ImageDraw.Draw(glow).ellipse((720, 40, 1160, 600), fill=60)
im.paste(Image.new("RGB", (W, H), "#bda47d"), (0, 0), glow.filter(ImageFilter.GaussianBlur(90)))
cov = Image.open("public/images/book/cover-provisional.jpg")
ch = 500; cw = int(cov.width * ch / cov.height); cov = cov.resize((cw, ch), Image.LANCZOS)
sh = Image.new("L", (W, H), 0); ImageDraw.Draw(sh).rectangle((860 - cw // 2 + 10, 85, 860 + cw // 2 + 10, 85 + ch + 18), fill=150)
im.paste(Image.new("RGB", (W, H), "#000"), (0, 0), sh.filter(ImageFilter.GaussianBlur(22)))
im.paste(cov, (860 - cw // 2, 65))
d = ImageDraw.Draw(im)
d.text((72, 96), "PERSPECTIVE CHANGES EVERYTHING.", font=ImageFont.truetype(sans, 20), fill="#bda47d")
d.text((70, 150), "The Other Side", font=ImageFont.truetype(serif, 96), fill="#eee9de")
d.text((70, 250), "Of Nine", font=ImageFont.truetype(serif_i, 96), fill="#b8b6b1")
d.text((72, 390), "Discover the Hidden Truth", font=ImageFont.truetype(serif_i, 30), fill="#eee9de")
d.text((72, 428), "Behind Every Perspective.", font=ImageFont.truetype(serif_i, 30), fill="#eee9de")
d.text((72, 530), "SUMANTH NAMBURI", font=ImageFont.truetype(sans, 20), fill="#b8b6b1")
im.save("public/og.jpg", quality=88)
print("wrote public/og.jpg")
