// Flat food illustrations drawn in SVG, so the menu has pictures without needing image files.

export type ArtKind = "burger" | "cheeseburger" | "sandwich" | "fries" | "nachos" | "soda";

// Soft background tint behind each illustration.
export const ART_TINT: Record<ArtKind, string> = {
  burger: "#fcefd9",
  cheeseburger: "#fdf3d3",
  sandwich: "#fcebee",
  fries: "#fff2cf",
  nachos: "#f9eedb",
  soda: "#fde6e3",
};

function Shadow() {
  return <ellipse cx="60" cy="104" rx="38" ry="5" fill="#18201a" opacity="0.08" />;
}

function Burger({ cheese }: { cheese: boolean }) {
  return (
    <>
      <Shadow />
      <rect x="20" y="82" width="80" height="17" rx="8.5" fill="#dc9232" />
      <rect x="18" y="68" width="84" height="15" rx="7.5" fill="#6a3a1f" />
      {cheese && (
        <path d="M18 66h84l-6 6-6-4-8 9-7-7-9 6-8-6-9 8-7-7-8 5-6-6z" fill="#f6c335" />
      )}
      <path
        d="M16 64c3.7-5 7.3-5 11 0s7.3 5 11 0 7.3-5 11 0 7.3 5 11 0 7.3-5 11 0 7.3 5 11 0 7.3-5 11 0 7.3 5 11 0v4H16z"
        fill="#5db346"
      />
      <path d="M20 60c0-22 18-36 40-36s40 14 40 36z" fill="#e9a43c" />
      <g fill="#fff4da">
        <ellipse cx="44" cy="40" rx="2.6" ry="1.5" transform="rotate(-20 44 40)" />
        <ellipse cx="60" cy="34" rx="2.6" ry="1.5" />
        <ellipse cx="76" cy="40" rx="2.6" ry="1.5" transform="rotate(20 76 40)" />
        <ellipse cx="52" cy="48" rx="2.6" ry="1.5" transform="rotate(-10 52 48)" />
        <ellipse cx="68" cy="48" rx="2.6" ry="1.5" transform="rotate(10 68 48)" />
      </g>
    </>
  );
}

function Sandwich() {
  return (
    <>
      <Shadow />
      <rect x="16" y="76" width="88" height="20" rx="8" fill="#d99a4e" />
      <rect x="21" y="79" width="78" height="12" rx="5" fill="#f5ddaa" />
      <path
        d="M14 66h92v4c-3.8 6-7.7 6-11.5 0s-7.7-6-11.5 0-7.7 6-11.5 0-7.7-6-11.5 0-7.7 6-11.5 0-7.7-6-11.5 0-7.7 6-11.5 0-7.7-6-11.5 0z"
        fill="#ee8c9a"
      />
      <path
        d="M16 64c3.7-5 7.3-5 11 0s7.3 5 11 0 7.3-5 11 0 7.3 5 11 0 7.3-5 11 0 7.3 5 11 0 7.3-5 11 0 7.3 5 11 0v4H16z"
        fill="#6cbf4b"
      />
      <rect x="16" y="34" width="88" height="27" rx="10" fill="#d99a4e" />
      <rect x="21" y="38" width="78" height="17" rx="7" fill="#f5ddaa" />
    </>
  );
}

function Fries() {
  return (
    <>
      <Shadow />
      <g>
        <rect x="34" y="30" width="8" height="40" rx="2" fill="#f5be3a" transform="rotate(-16 38 50)" />
        <rect x="44" y="22" width="8" height="46" rx="2" fill="#fad567" transform="rotate(-7 48 45)" />
        <rect x="54" y="16" width="8" height="52" rx="2" fill="#f5be3a" />
        <rect x="64" y="20" width="8" height="48" rx="2" fill="#fad567" transform="rotate(7 68 44)" />
        <rect x="74" y="28" width="8" height="42" rx="2" fill="#f5be3a" transform="rotate(15 78 49)" />
      </g>
      <path d="M28 54h64l-8 46H36z" fill="#dc3a2f" />
      <path d="M28 54h64l-1.4 8H29.4z" fill="#b92e25" />
      <circle cx="60" cy="80" r="9" fill="#ffd45a" />
    </>
  );
}

function Nachos() {
  return (
    <>
      <Shadow />
      <g fill="#f1b63e" stroke="#d9952a" strokeWidth="2" strokeLinejoin="round">
        <polygon points="28,66 44,30 62,62" />
        <polygon points="50,64 68,22 84,60" />
        <polygon points="70,66 90,36 98,66" />
        <polygon points="40,66 56,42 74,66" />
      </g>
      <path
        d="M34 56c6 4 10-2 16 2s10-4 16 0 10-2 16 2 8-2 12 0"
        fill="none"
        stroke="#ffe07a"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path d="M16 64h88c-2 22-20 36-44 36S18 86 16 64z" fill="#2f8f55" />
      <rect x="14" y="61" width="92" height="8" rx="4" fill="#3ba866" />
      <path d="M32 82h56" stroke="#f6c445" strokeWidth="3" strokeLinecap="round" />
    </>
  );
}

function Soda() {
  return (
    <>
      <Shadow />
      <rect x="36" y="22" width="48" height="80" rx="10" fill="#d9382e" />
      <path d="M36 56c8-8 16 8 24 0s16 8 24 0v16c-8 8-16-8-24 0s-16-8-24 0z" fill="#ffffff" />
      <rect x="44" y="30" width="5" height="64" rx="2.5" fill="#ffffff" opacity="0.25" />
      <rect x="38" y="16" width="44" height="10" rx="5" fill="#c7ccd1" />
      <rect x="53" y="12" width="14" height="6" rx="3" fill="#aeb4ba" />
      <rect x="38" y="98" width="44" height="7" rx="3.5" fill="#c7ccd1" />
    </>
  );
}

export default function FoodArt({ kind, className }: { kind: ArtKind; className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      {kind === "burger" && <Burger cheese={false} />}
      {kind === "cheeseburger" && <Burger cheese />}
      {kind === "sandwich" && <Sandwich />}
      {kind === "fries" && <Fries />}
      {kind === "nachos" && <Nachos />}
      {kind === "soda" && <Soda />}
    </svg>
  );
}
