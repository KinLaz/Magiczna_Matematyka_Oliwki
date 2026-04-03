// Bajkowa wróżka-Oliwka jako ilustracja SVG inline
export default function FairyIllustration() {
  return (
    <svg
      viewBox="0 0 200 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-44 h-56 drop-shadow-lg animate-float"
      aria-label="Wróżka Oliwka"
    >
      {/* Skrzydła lewe */}
      <ellipse cx="68" cy="148" rx="38" ry="22" fill="#f9a8d4" opacity="0.7" transform="rotate(-30 68 148)" />
      <ellipse cx="62" cy="165" rx="26" ry="14" fill="#f9a8d4" opacity="0.5" transform="rotate(-20 62 165)" />

      {/* Skrzydła prawe */}
      <ellipse cx="132" cy="148" rx="38" ry="22" fill="#c4b5fd" opacity="0.7" transform="rotate(30 132 148)" />
      <ellipse cx="138" cy="165" rx="26" ry="14" fill="#c4b5fd" opacity="0.5" transform="rotate(20 138 165)" />

      {/* Sukienka */}
      <path d="M80 170 Q100 200 120 170 L125 230 Q100 245 75 230 Z" fill="#f472b6" opacity="0.9" />
      <path d="M82 172 Q100 195 118 172" stroke="#ec4899" strokeWidth="1.5" fill="none" />

      {/* Tors */}
      <rect x="85" y="140" width="30" height="35" rx="10" fill="#fda4af" />

      {/* Głowa */}
      <circle cx="100" cy="115" r="32" fill="#fde68a" />
      <circle cx="100" cy="115" r="30" fill="#fef3c7" />

      {/* Rumieniec */}
      <circle cx="84" cy="122" r="7" fill="#fca5a5" opacity="0.5" />
      <circle cx="116" cy="122" r="7" fill="#fca5a5" opacity="0.5" />

      {/* Oczy */}
      <circle cx="91" cy="113" r="5" fill="#7c3aed" />
      <circle cx="109" cy="113" r="5" fill="#7c3aed" />
      <circle cx="92.5" cy="111.5" r="1.5" fill="white" />
      <circle cx="110.5" cy="111.5" r="1.5" fill="white" />

      {/* Uśmiech */}
      <path d="M91 123 Q100 131 109 123" stroke="#db2777" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Włosy */}
      <path d="M68 110 Q70 78 100 75 Q130 78 132 110" fill="#a78bfa" />
      <path d="M70 110 Q65 95 72 85 Q76 78 85 76" fill="#8b5cf6" />
      <path d="M130 110 Q135 95 128 85 Q124 78 115 76" fill="#8b5cf6" />
      {/* loki */}
      <path d="M68 108 Q58 115 62 125 Q66 135 72 128" fill="#a78bfa" />
      <path d="M132 108 Q142 115 138 125 Q134 135 128 128" fill="#a78bfa" />

      {/* Różdżka */}
      <line x1="125" y1="155" x2="155" y2="125" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
      {/* Gwiazda na różdżce */}
      <polygon points="155,118 157,124 163,124 158,128 160,134 155,130 150,134 152,128 147,124 153,124"
        fill="#fbbf24" stroke="#f59e0b" strokeWidth="1" />

      {/* Korona / diadem */}
      <path d="M86 78 L88 68 L93 75 L100 65 L107 75 L112 68 L114 78" stroke="#fbbf24" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="100" cy="65" r="3" fill="#f472b6" />

      {/* Gwiazdki dekoracyjne */}
      <text x="30" y="90"  fontSize="14" fill="#f472b6" className="animate-sparkle">✦</text>
      <text x="155" y="100" fontSize="12" fill="#a78bfa" className="animate-sparkle" style={{animationDelay:'0.5s'}}>✦</text>
      <text x="40"  y="175" fontSize="10" fill="#fbbf24" className="animate-sparkle" style={{animationDelay:'1s'}}>✦</text>
      <text x="160" y="170" fontSize="10" fill="#f472b6" className="animate-sparkle" style={{animationDelay:'1.5s'}}>✦</text>
    </svg>
  )
}
