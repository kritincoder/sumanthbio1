import Image from "next/image";
import { book } from "@/data/book";
import { DraftMark } from "./DraftMark";

/** The real book cover, presented like a product: quiet shadow, precise edge, no effects on the artwork. */
export function BookCover({
  priority = false,
  sizes = "(min-width: 1024px) 28rem, 70vw",
  className = "",
  showNote = true,
}: {
  priority?: boolean;
  sizes?: string;
  className?: string;
  showNote?: boolean;
}) {
  return (
    <figure className={className}>
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute inset-x-[6%] -bottom-[4%] h-[12%] rounded-[50%] bg-black/55 blur-2xl"
        />
        <div className="relative overflow-hidden rounded-[3px] shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_40px_80px_-30px_rgba(0,0,0,0.65)]">
          <Image
            src={book.cover.src}
            width={book.cover.width}
            height={book.cover.height}
            alt={book.cover.alt}
            sizes={sizes}
            priority={priority}
            className="h-auto w-full"
          />
          {/* Spine light — a hairline highlight, does not touch the artwork's colour */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-[3%] bg-gradient-to-r from-black/30 to-transparent" />
        </div>
      </div>
      {showNote && book.cover.status === "pending" ? (
        <figcaption className="mt-5 flex justify-center">
          <DraftMark label="Provisional cover — low resolution" />
        </figcaption>
      ) : null}
    </figure>
  );
}
