/**
 * OLIVEIRA monogram — a layered "O" mark.
 * Two offset rings create depth; a lime accent dot anchors the bottom.
 * Works as favicon, nav mark, and standalone identity piece.
 */
export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      aria-label="OLIVEIRA monogram"
    >
      {/* Outer ring */}
      <circle cx="14" cy="14" r="12.4" stroke="#0F0E0C" strokeWidth="1.1" />
      {/* Inner offset ring — shifted up-right, creates lens/eye depth */}
      <circle cx="15.5" cy="12.5" r="6.8" stroke="#0F0E0C" strokeWidth="1.1" />
      {/* Lime accent dot — 7 o'clock on the outer ring */}
      <circle cx="7.2" cy="20.4" r="1.8" fill="#C6F432" />
    </svg>
  );
}
