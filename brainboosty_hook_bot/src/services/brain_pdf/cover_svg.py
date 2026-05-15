"""SVG-заглушка обложки, если нет PNG hero."""

COVER_HERO_FALLBACK_SVG = """
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 320" class="w-full max-w-2xl mx-auto cover-hero-svg">
  <defs>
    <linearGradient id="cvStroke" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#a5f3fc"/>
      <stop offset="35%" stop-color="#22d3ee"/>
      <stop offset="70%" stop-color="#818cf8"/>
      <stop offset="100%" stop-color="#c084fc"/>
    </linearGradient>
    <linearGradient id="cvFill" x1="20%" y1="0%" x2="80%" y2="100%">
      <stop offset="0%" stop-color="#0c1222"/>
      <stop offset="50%" stop-color="#151b2e"/>
      <stop offset="100%" stop-color="#0a0e18"/>
    </linearGradient>
    <radialGradient id="cvHot" cx="32%" cy="28%" r="28%">
      <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.55"/>
      <stop offset="55%" stop-color="#7c3aed" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0"/>
    </radialGradient>
    <filter id="cvGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="5" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="cvGlowStrong" x="-90%" y="-90%" width="280%" height="280%">
      <feGaussianBlur stdDeviation="16" result="b"/>
      <feColorMatrix in="b" type="matrix"
        values="0 0 0 0 0.08  0 0 0 0 0.82  0 0 0 0 0.95  0 0 0 0.55 0" result="g"/>
      <feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <pattern id="cvMesh" width="14" height="14" patternUnits="userSpaceOnUse">
      <path d="M14 0H0V14" fill="none" stroke="#22d3ee" stroke-opacity="0.06" stroke-width="0.45"/>
    </pattern>
  </defs>
  <ellipse cx="220" cy="165" rx="200" ry="148" fill="url(#cvHot)" opacity="0.9"/>
  <path d="M52 168 C48 102 88 44 168 32 C268 18 368 72 392 152 C402 198 388 248 352 278 C368 298 372 322 342 338 C312 352 268 338 248 312 C198 332 118 318 72 268 C38 228 32 178 48 132 C50 142 50 155 52 168Z"
        fill="url(#cvFill)" stroke="url(#cvStroke)" stroke-width="2.4" filter="url(#cvGlowStrong)"/>
  <path d="M52 168 C48 102 88 44 168 32 C268 18 368 72 392 152 C402 198 388 248 352 278 C368 298 372 322 342 338 C312 352 268 338 248 312 C198 332 118 318 72 268 C38 228 32 178 48 132"
        fill="url(#cvMesh)" fill-opacity="0.35" opacity="0.9"/>
  <path d="M108 118 C138 88 198 78 258 98 C318 118 348 168 332 218 C318 268 258 298 188 288 C118 278 78 228 88 168 C90 148 98 130 108 118Z"
        fill="none" stroke="#475569" stroke-width="0.9" opacity="0.5"/>
  <path d="M125 155 Q210 135 295 165 M118 205 Q205 188 288 215 M145 248 Q220 232 278 262"
        fill="none" stroke="#64748b" stroke-width="0.75" opacity="0.35"/>
  <g stroke="#22d3ee" stroke-width="0.7" fill="none" opacity="0.28" filter="url(#cvGlow)">
    <path d="M118 95 L228 82 L318 118 L268 198 L155 175 Z"/>
    <path d="M198 118 L338 142 L355 228 L245 278 L168 205 Z"/>
  </g>
  <path d="M118 72 C168 48 248 52 298 92 C338 128 338 188 298 228 C258 268 178 272 128 242 C88 212 78 158 98 112 C102 98 108 82 118 72Z"
        fill="none" stroke="url(#cvStroke)" stroke-width="1.85" filter="url(#cvGlow)"/>
  <path d="M138 98 C188 72 258 78 302 118 C332 152 328 198 292 228 C248 262 178 262 128 228 C88 198 88 138 118 105 C124 100 132 98 138 98Z"
        fill="rgba(34,211,238,0.08)" stroke="#67e8f9" stroke-width="1.2" opacity="0.95" filter="url(#cvGlow)"/>
</svg>
"""
