import { book } from "@/data/book";

export function BookSpecs({ className = "" }: { className?: string }) {
  const rows: [string, string][] = [
    ["Publisher", book.publisher],
    ["Published", book.published],
    ["Length", `${book.pages} pages`],
    ["Formats", book.formats.join(" · ")],
    ["ISBN-13", book.isbn13Display],
    ["ISBN-10", book.isbn10],
  ];
  return (
    <dl className={`grid grid-cols-2 gap-x-8 border-t hairline text-sm ${className}`}>
      {rows.map(([k, v]) => (
        <div key={k} className="border-b hairline py-4">
          <dt className="eyebrow mb-1.5">{k}</dt>
          <dd className="tabular-nums">{v}</dd>
        </div>
      ))}
    </dl>
  );
}
