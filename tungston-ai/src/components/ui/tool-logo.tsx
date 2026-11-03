/**
 * A tool's logo, drawn from its path. Decorative: the tool's name always sits beside it,
 * so it is hidden from assistive technology. Takes its colour from `currentColor`.
 */
export function ToolLogo({ path, className }: { path: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor" className={className}>
      <path d={path} />
    </svg>
  );
}
