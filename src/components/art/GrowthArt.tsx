/**
 * GrowthArt — hand-built SVG scenes for the BusinessGrowth tier cards.
 *
 * One visual grammar across all three stages so the cards read as a set:
 * a glow orb, a platform disc with a contact shadow, a brand-purple
 * gradient subject, and floating glass chips tethered by dashed
 * connectors. Theme-dependent strokes/fills come from the .growth-art
 * custom properties in index.css, so light mode needs no second set of
 * artwork. Brand hexes (#8b4fbf, #b98af0, #dacaff, #4a1f6b, #34164f,
 * #5b2a86) are fixed on purpose: the dark-purple subjects sit happily
 * on both themes, like a dark-UI illustration on a light page.
 */

const glass = { fill: 'var(--ga-glass)' }
const glassStrong = { fill: 'var(--ga-glass-strong)' }
const edge = { stroke: 'var(--ga-line)' }
const edgeFaint = { stroke: 'var(--ga-line-faint)' }
const dot = { fill: 'var(--ga-dot)' }
const dotStroke = { stroke: 'var(--ga-dot)' }
const groundShadow = { fill: 'var(--ga-shadow)' }

function Defs({ n }: { n: number }) {
  return (
    <defs>
      <radialGradient id={`ga${n}-orb`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#8b4fbf" stopOpacity={0.3} />
        <stop offset="55%" stopColor="#8b4fbf" stopOpacity={0.12} />
        <stop offset="100%" stopColor="#8b4fbf" stopOpacity={0} />
      </radialGradient>
      <linearGradient id={`ga${n}-body`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8b4fbf" />
        <stop offset="52%" stopColor="#5b2a86" />
        <stop offset="100%" stopColor="#34164f" />
      </linearGradient>
      <linearGradient id={`ga${n}-bar`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#b98af0" />
        <stop offset="100%" stopColor="#5b2a86" />
      </linearGradient>
    </defs>
  )
}

/** Glow orb + platform disc + contact shadow, identical across stages. */
function Environment({ n }: { n: number }) {
  return (
    <g>
      <ellipse cx={200} cy={138} rx={165} ry={122} fill={`url(#ga${n}-orb)`} />
      <ellipse cx={200} cy={230} rx={118} ry={26} {...glass} {...edgeFaint} strokeWidth={1} />
      <ellipse cx={200} cy={230} rx={80} ry={17} fill="none" {...edgeFaint} strokeWidth={1} strokeDasharray="3 6" />
      <path d="M88 236 L98 233" {...edgeFaint} strokeWidth={1} strokeLinecap="round" />
      <path d="M312 236 L302 233" {...edgeFaint} strokeWidth={1} strokeLinecap="round" />
      <ellipse cx={200} cy={228} rx={76} ry={13} {...groundShadow} />
    </g>
  )
}

/** Small plus-shaped sparkles scattered around the scene. */
function Sparkles({ n }: { n: number }) {
  const plus = (x: number, y: number, s: number, o: number, delay?: string) => (
    <path
      key={`${x}-${y}`}
      d={`M${x - s} ${y} H${x + s} M${x} ${y - s} V${y + s}`}
      {...dotStroke}
      strokeWidth={2}
      strokeLinecap="round"
      opacity={o}
      className="ga-float"
      style={delay ? { animationDelay: delay } : undefined}
    />
  )
  return (
    <g aria-hidden="true">
      {plus(88, 84, 5, 0.55, '-1.2s')}
      {plus(326, 160, 4, 0.4, '-3.1s')}
      {plus(62, 192, 4, 0.35, '-5s')}
      {n === 3 && plus(338, 88, 5, 0.5, '-2s')}
    </g>
  )
}

/** Stage 1 — storefront with a sprout on the roof: the foundation. */
function Storefront() {
  return (
    <g>
      <g className="ga-float">
        {/* Facade */}
        <rect x={158} y={148} width={84} height={78} rx={4} fill="url(#ga1-body)" {...edge} strokeWidth={1} />
        <rect x={150} y={137} width={100} height={12} rx={3} fill="#4a1f6b" {...edge} strokeWidth={1} />
        {/* Windows */}
        <rect x={166} y={158} width={24} height={20} rx={2} fill="#dacaff" opacity={0.85} />
        <rect x={210} y={158} width={24} height={20} rx={2} fill="#dacaff" opacity={0.85} />
        {/* Scalloped awning */}
        <path
          d="M158 181 H242 V187 a8.4 8.4 0 0 1 -16.8 0 a8.4 8.4 0 0 1 -16.8 0 a8.4 8.4 0 0 1 -16.8 0 a8.4 8.4 0 0 1 -16.8 0 a8.4 8.4 0 0 1 -16.8 0 Z"
          fill="url(#ga1-bar)"
        />
        {/* Door */}
        <path d="M186 226 V200 a3 3 0 0 1 3 -3 h22 a3 3 0 0 1 3 3 v26 Z" fill="#34164f" {...edgeFaint} strokeWidth={1} />
        <circle cx={208} cy={213} r={1.6} fill="#dacaff" opacity={0.9} />
        {/* Sprout on the roof */}
        <path d="M200 137 V122" stroke="#8b4fbf" strokeWidth={2.5} strokeLinecap="round" fill="none" />
        <path d="M200 126 C194 126 189 122 189 115 C195 115 200 119 200 126 Z" fill="#b98af0" />
        <path d="M200 124 C206 124 211 120 211 113 C205 113 200 117 200 124 Z" fill="#8b4fbf" />
      </g>

      {/* Trend chip, tethered to the roof */}
      <g className="ga-float" style={{ animationDelay: '-2.4s' }}>
        <path d="M284 136 L252 145" fill="none" {...edgeFaint} strokeWidth={1} strokeDasharray="4 5" />
        <rect x={288} y={96} width={64} height={44} rx={9} {...glassStrong} {...edge} strokeWidth={1} />
        <path
          d="M298 126 L310 112 L320 118 L336 103"
          stroke="#b98af0"
          strokeWidth={2.5}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx={336} cy={103} r={2.5} fill="#dacaff" />
        <path d="M298 132 H336" {...edgeFaint} strokeWidth={1} />
      </g>

      {/* Growth coin chip */}
      <g className="ga-float" style={{ animationDelay: '-4.6s' }}>
        <path d="M110 126 L148 142" fill="none" {...edgeFaint} strokeWidth={1} strokeDasharray="4 5" />
        <circle cx={96} cy={118} r={17} {...glassStrong} {...edge} strokeWidth={1} />
        <path
          d="M88 124 L95 114 L100 119 L106 109"
          stroke="#b98af0"
          strokeWidth={2.2}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx={106} cy={109} r={2} fill="#dacaff" />
      </g>
    </g>
  )
}

/** Stage 2 — stepped mid-rise beside an ascending bar chart: momentum. */
function MidRise() {
  return (
    <g>
      <g className="ga-float">
        {/* Base block */}
        <rect x={160} y={142} width={80} height={84} rx={4} fill="url(#ga2-body)" {...edge} strokeWidth={1} />
        <rect x={170} y={154} width={18} height={11} rx={2} fill="#dacaff" opacity={0.8} />
        <rect x={196} y={154} width={18} height={11} rx={2} fill="#dacaff" opacity={0.5} />
        <rect x={170} y={172} width={18} height={11} rx={2} fill="#dacaff" opacity={0.5} />
        <rect x={196} y={172} width={18} height={11} rx={2} fill="#dacaff" opacity={0.8} />
        <rect x={170} y={190} width={18} height={11} rx={2} fill="#dacaff" opacity={0.8} />
        <rect x={196} y={190} width={18} height={11} rx={2} fill="#dacaff" opacity={0.5} />
        {/* Crown block */}
        <rect x={172} y={102} width={56} height={40} rx={4} fill="url(#ga2-body)" {...edge} strokeWidth={1} />
        <rect x={182} y={112} width={36} height={8} rx={2} fill="#dacaff" opacity={0.8} />
        <rect x={182} y={125} width={36} height={8} rx={2} fill="#dacaff" opacity={0.55} />
        {/* Antenna */}
        <path d="M200 102 V88" stroke="#8b4fbf" strokeWidth={2.5} strokeLinecap="round" fill="none" />
        <circle cx={200} cy={85} r={3.5} fill="#dacaff" />
        <circle cx={200} cy={85} r={7.5} fill="none" stroke="#8b4fbf" strokeWidth={1} opacity={0.4} />
      </g>

      {/* Ascending bar chart */}
      <g className="ga-float" style={{ animationDelay: '-2s' }}>
        <path d="M338 144 C342 118 262 92 232 100" fill="none" {...edgeFaint} strokeWidth={1} strokeDasharray="4 5" />
        <rect x={284} y={196} width={16} height={30} rx={3} fill="#4a1f6b" {...edgeFaint} strokeWidth={1} />
        <rect x={306} y={176} width={16} height={50} rx={3} fill="#612c8b" {...edgeFaint} strokeWidth={1} />
        <rect x={328} y={150} width={16} height={76} rx={3} fill="url(#ga2-bar)" {...edgeFaint} strokeWidth={1} />
      </g>

      {/* Report chip */}
      <g className="ga-float" style={{ animationDelay: '-4.4s' }}>
        <path d="M120 138 L156 158" fill="none" {...edgeFaint} strokeWidth={1} strokeDasharray="4 5" />
        <rect x={82} y={102} width={60} height={48} rx={9} {...glassStrong} {...edge} strokeWidth={1} />
        <rect x={92} y={114} width={34} height={4} rx={2} fill="#dacaff" opacity={0.9} />
        <rect x={92} y={123} width={26} height={4} rx={2} fill="#dacaff" opacity={0.5} />
        <rect x={92} y={132} width={30} height={4} rx={2} fill="#b98af0" opacity={0.9} />
      </g>
    </g>
  )
}

/** Stage 3 — skyline under an orbit ring: enterprise scale. */
function Skyline() {
  return (
    <g>
      {/* Orbit ring sits behind the towers */}
      <ellipse cx={200} cy={106} rx={102} ry={30} fill="none" stroke="#8b4fbf" strokeWidth={1.25} opacity={0.5} />

      <g className="ga-float">
        {/* Left tower */}
        <rect x={138} y={138} width={30} height={88} rx={3} fill="url(#ga3-body)" {...edge} strokeWidth={1} />
        <rect x={144} y={148} width={18} height={6} rx={2} fill="#dacaff" opacity={0.7} />
        <rect x={144} y={162} width={18} height={6} rx={2} fill="#dacaff" opacity={0.45} />
        <rect x={144} y={176} width={18} height={6} rx={2} fill="#dacaff" opacity={0.7} />
        <rect x={144} y={190} width={18} height={6} rx={2} fill="#dacaff" opacity={0.45} />
        {/* Right tower */}
        <rect x={232} y={124} width={36} height={102} rx={3} fill="url(#ga3-bar)" {...edge} strokeWidth={1} />
        <rect x={240} y={136} width={20} height={6} rx={2} fill="#dacaff" opacity={0.7} />
        <rect x={240} y={152} width={20} height={6} rx={2} fill="#dacaff" opacity={0.45} />
        <rect x={240} y={168} width={20} height={6} rx={2} fill="#dacaff" opacity={0.7} />
        <rect x={240} y={184} width={20} height={6} rx={2} fill="#dacaff" opacity={0.45} />
        {/* Center tower */}
        <rect x={176} y={92} width={48} height={134} rx={4} fill="url(#ga3-body)" {...edge} strokeWidth={1} />
        <rect x={185} y={104} width={30} height={7} rx={2} fill="#dacaff" opacity={0.85} />
        <rect x={185} y={121} width={30} height={7} rx={2} fill="#dacaff" opacity={0.5} />
        <rect x={185} y={138} width={30} height={7} rx={2} fill="#dacaff" opacity={0.85} />
        <rect x={185} y={155} width={30} height={7} rx={2} fill="#dacaff" opacity={0.5} />
        <rect x={185} y={172} width={30} height={7} rx={2} fill="#dacaff" opacity={0.85} />
        <rect x={185} y={189} width={30} height={7} rx={2} fill="#dacaff" opacity={0.5} />
        <rect x={185} y={206} width={30} height={7} rx={2} fill="#dacaff" opacity={0.85} />
        {/* Antenna */}
        <path d="M200 92 V76" stroke="#8b4fbf" strokeWidth={2.5} strokeLinecap="round" fill="none" />
        <circle cx={200} cy={73} r={3.5} fill="#dacaff" />
        <circle cx={200} cy={73} r={7.5} fill="none" stroke="#8b4fbf" strokeWidth={1} opacity={0.4} />
      </g>

      {/* Ring nodes */}
      <g>
        <circle cx={98} cy={106} r={3} {...dot} />
        <circle cx={98} cy={106} r={7} fill="none" stroke="#8b4fbf" strokeWidth={1} opacity={0.35} />
        <circle cx={302} cy={106} r={3} {...dot} />
        <circle cx={302} cy={106} r={7} fill="none" stroke="#8b4fbf" strokeWidth={1} opacity={0.35} />
      </g>

      {/* Satellite chip on the ring */}
      <g className="ga-float" style={{ animationDelay: '-2.6s' }}>
        <path d="M76 108 L92 106" fill="none" {...edgeFaint} strokeWidth={1} strokeDasharray="4 5" />
        <rect x={58} y={94} width={18} height={18} rx={5} {...glassStrong} {...edge} strokeWidth={1} />
      </g>

      {/* Network chip, tethered to the right ring node */}
      <g className="ga-float" style={{ animationDelay: '-4.8s' }}>
        <path d="M318 110 L305 106" fill="none" {...edgeFaint} strokeWidth={1} strokeDasharray="4 5" />
        <rect x={306} y={70} width={56} height={40} rx={9} {...glassStrong} {...edge} strokeWidth={1} />
        <path d="M324 84 L344 90 M324 84 L332 98 M344 90 L332 98" stroke="#b98af0" strokeWidth={1.5} opacity={0.8} />
        <circle cx={324} cy={84} r={2.5} {...dot} />
        <circle cx={344} cy={90} r={2.5} {...dot} />
        <circle cx={332} cy={98} r={2.5} {...dot} />
      </g>
    </g>
  )
}

export function GrowthArt({ stage, className }: { stage: 1 | 2 | 3; className?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      className={`growth-art ${className ?? ''}`}
      aria-hidden="true"
      focusable="false"
    >
      <Defs n={stage} />
      <Environment n={stage} />
      {stage === 1 && <Storefront />}
      {stage === 2 && <MidRise />}
      {stage === 3 && <Skyline />}
      <Sparkles n={stage} />
    </svg>
  )
}
