import Link from "next/link";

export default function NotFound() {
  return (
    <section className="env-dark flex min-h-svh items-center">
      <div className="shell">
        <p className="eyebrow mb-6">404</p>
        <h1 className="display max-w-[14ch] text-[clamp(3rem,8vw,7rem)]">
          This page is on <span className="italic text-silver">another side.</span>
        </h1>
        <Link href="/" className="mt-10 inline-flex min-h-12 items-center rounded-full bg-ivory px-7 text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-obsidian">
          Return home
        </Link>
      </div>
    </section>
  );
}
