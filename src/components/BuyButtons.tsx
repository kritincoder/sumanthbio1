import { purchaseLinks } from "@/data/book";

/**
 * Exact client-supplied purchase links. Plain anchors — always visible and
 * functional, independent of animation or WebGL.
 */
export function BuyButtons({ tone = "dark", align = "start" }: { tone?: "dark" | "light"; align?: "start" | "center" }) {
  const primary =
    tone === "dark"
      ? "bg-ivory text-obsidian hover:bg-white"
      : "bg-obsidian text-ivory hover:bg-graphite";
  const secondary =
    tone === "dark"
      ? "border border-ivory/35 text-ivory hover:border-ivory hover:bg-ivory/5"
      : "border border-obsidian/30 text-obsidian hover:border-obsidian hover:bg-obsidian/5";

  return (
    <ul
      className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap ${align === "center" ? "sm:justify-center" : ""}`}
      aria-label="Buy The Other Side Of Nine"
    >
      {purchaseLinks.map((link, i) => (
        <li key={link.id}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group inline-flex min-h-12 w-full items-center justify-between gap-6 rounded-full px-6 text-[0.8125rem] font-medium uppercase tracking-[0.14em] transition-[background-color,border-color,transform] duration-300 ease-(--ease-out-quint) active:scale-[0.98] sm:w-auto ${
              i === 0 ? primary : secondary
            }`}
          >
            <span>{link.label}</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              aria-hidden="true"
              className="transition-transform duration-300 ease-(--ease-out-quint) group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              <path d="M4 10L10 4M5 4h5v5" fill="none" stroke="currentColor" strokeWidth="1.3" />
            </svg>
            <span className="sr-only">(opens Amazon in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
