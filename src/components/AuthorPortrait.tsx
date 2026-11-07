import Image from "next/image";
import { author } from "@/data/author";
import { DraftMark } from "./DraftMark";

/**
 * Shows the first approved portrait. Until one is supplied, a quiet
 * typographic frame stands in — never a generated likeness.
 */
export function AuthorPortrait({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  const p = author.portraits[0];
  if (p) {
    return (
      <div className={`overflow-hidden rounded-[4px] ${className}`}>
        <Image src={p.src} width={p.width} height={p.height} alt={p.alt} priority={priority} className="h-full w-full object-cover" sizes="(min-width: 768px) 40vw, 90vw" />
      </div>
    );
  }
  return (
    <div className={`relative flex aspect-[4/5] flex-col items-center justify-center rounded-[4px] border hairline ${className}`}>
      <span aria-hidden="true" className="display text-[clamp(5rem,12vw,9rem)] text-[color:var(--muted)] opacity-40">
        SN
      </span>
      <div className="absolute bottom-6 flex flex-col items-center gap-3 px-6 text-center">
        <DraftMark label="Portrait to be supplied" />
      </div>
      <span className="sr-only">Author portrait to follow.</span>
    </div>
  );
}
