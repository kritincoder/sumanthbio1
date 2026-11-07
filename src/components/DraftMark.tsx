import { siteConfig } from "@/data/site.config";

/** Visible marker for content awaiting author approval. Renders nothing outside review mode. */
export function DraftMark({ label = "Awaiting approval", className = "" }: { label?: string; className?: string }) {
  if (!siteConfig.reviewMode) return null;
  return (
    <span className={`draft-mark ${className}`} title="Review mode: this content is not yet approved for publication">
      <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
        <circle cx="4" cy="4" r="3" fill="currentColor" />
      </svg>
      {label}
    </span>
  );
}

/** Shows children only if the content is approved, or if review mode is on. */
export function Gate({ status, children }: { status: "verified" | "pending"; children: React.ReactNode }) {
  if (status === "pending" && !siteConfig.reviewMode) return null;
  return <>{children}</>;
}
