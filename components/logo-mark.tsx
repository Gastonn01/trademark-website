// Custom brand mark — replaces the generic Lucide Shield icon. An angular,
// faceted shield (not the stock rounded outline) with a checkmark cut into
// it in the badge's own background color, reading as a notarized seal
// rather than a plain security icon.
export function LogoMark({
  badgeClassName,
  shieldColor,
  notchColor,
}: {
  badgeClassName: string
  shieldColor: string
  notchColor: string
}) {
  return (
    <div className={`flex items-center justify-center w-11 h-11 rounded-lg ${badgeClassName}`}>
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
        <path d="M4 4H20V12.2L12 21L4 12.2V4Z" fill={shieldColor} />
        <path
          d="M8 11.5L10.8 14.5L16.2 8.5"
          stroke={notchColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
