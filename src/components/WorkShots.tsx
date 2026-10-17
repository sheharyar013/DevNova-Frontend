import type { ReactNode } from 'react'
import type { WorkShot } from '../data/content'

const A = '#2E5BFF'

const Frame = ({ label, children }: { label: string; children: ReactNode }) => (
  <svg width="100%" height="100%" viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" role="img" aria-label={label} fontFamily="IBM Plex Sans, sans-serif">
    {children}
  </svg>
)

const attendanceRows = [
  { y: 72, w: 42, ok: true },
  { y: 94, w: 36, ok: true },
  { y: 116, w: 46, ok: false },
  { y: 138, w: 40, ok: true },
  { y: 160, w: 34, ok: true },
]

const College = () => (
  <Frame label="Aspire College CMS attendance app screens">
    <rect width="400" height="225" fill="#EEF2FF" />
    <rect x="30" y="62" width="100" height="64" rx="12" fill="#FFFFFF" />
    <text x="44" y="92" fontSize="22" fontWeight="700" fill="#0A1022">92%</text>
    <text x="44" y="110" fontSize="9" fill="#5A6478">Present today</text>
    <rect x="145" y="16" width="110" height="222" rx="18" fill="#0A1022" />
    <rect x="151" y="22" width="98" height="210" rx="13" fill="#FFFFFF" />
    <path d="M151 35 a13 13 0 0 1 13 -13 h72 a13 13 0 0 1 13 13 v22 h-98 z" fill={A} />
    <text x="160" y="45" fontSize="10" fontWeight="600" fill="#FFFFFF">Attendance</text>
    {attendanceRows.map((r) => (
      <g key={r.y}>
        <circle cx="163" cy={r.y} r="6" fill="#C7D2FE" />
        <rect x="173" y={r.y - 3} width={r.w} height="5" rx="2.5" fill="#CBD5E1" />
        <rect x="223" y={r.y - 6} width="18" height="12" rx="6" fill={r.ok ? '#DCFCE7' : '#FEE2E2'} />
        <text x="229" y={r.y + 3} fontSize="8" fontWeight="700" fill={r.ok ? '#15803D' : '#B91C1C'}>{r.ok ? 'P' : 'A'}</text>
      </g>
    ))}
    <rect x="160" y="184" width="80" height="22" rx="8" fill={A} />
    <text x="177" y="198" fontSize="9" fontWeight="600" fill="#FFFFFF">Mark all</text>
    <rect x="272" y="104" width="100" height="56" rx="12" fill="#FFFFFF" />
    <text x="286" y="126" fontSize="11" fontWeight="700" fill="#0A1022">BS-CS · Sem 3</text>
    <text x="286" y="144" fontSize="9" fill="#5A6478">Lecture 2 · 9:30</text>
  </Frame>
)

const Hospital = () => (
  <Frame label="Hospital management queue and token screen">
    <rect width="400" height="225" fill="#E6F6F3" />
    <rect x="30" y="22" width="340" height="215" rx="10" fill="#FFFFFF" />
    <rect x="30" y="22" width="340" height="18" rx="10" fill="#F1F5F9" />
    <rect x="30" y="32" width="340" height="8" fill="#F1F5F9" />
    <circle cx="42" cy="31" r="3" fill="#CBD5E1" /><circle cx="52" cy="31" r="3" fill="#CBD5E1" /><circle cx="62" cy="31" r="3" fill="#CBD5E1" />
    <rect x="30" y="40" width="66" height="197" fill="#0A1022" />
    <rect x="40" y="54" width="44" height="6" rx="3" fill={A} />
    <rect x="40" y="72" width="38" height="5" rx="2.5" fill="#34406A" />
    <rect x="40" y="88" width="42" height="5" rx="2.5" fill="#34406A" />
    <rect x="40" y="104" width="34" height="5" rx="2.5" fill="#34406A" />
    <rect x="40" y="120" width="40" height="5" rx="2.5" fill="#34406A" />
    <text x="110" y="60" fontSize="9" fontWeight="600" fill="#5A6478">NOW SERVING</text>
    <rect x="110" y="68" width="112" height="68" rx="10" fill={A} />
    <text x="128" y="112" fontSize="30" fontWeight="800" fill="#FFFFFF">A-12</text>
    <text x="238" y="60" fontSize="9" fontWeight="600" fill="#5A6478">UP NEXT</text>
    {[{ y: 68, t: 'A-13', w: 50 }, { y: 92, t: 'A-14', w: 40 }, { y: 116, t: 'A-15', w: 56 }].map((r) => (
      <g key={r.t}>
        <rect x="238" y={r.y} width="118" height="20" rx="6" fill="#F1F5F9" />
        <text x="246" y={r.y + 14} fontSize="9" fontWeight="700" fill="#0A1022">{r.t}</text>
        <rect x="276" y={r.y + 8} width={r.w} height="5" rx="2.5" fill="#CBD5E1" />
      </g>
    ))}
    <text x="110" y="160" fontSize="9" fontWeight="600" fill="#5A6478">BILLING</text>
    <rect x="110" y="168" width="246" height="16" rx="5" fill="#F8FAFC" stroke="#E2E8F0" />
    <rect x="118" y="174" width="80" height="4" rx="2" fill="#CBD5E1" /><rect x="316" y="174" width="30" height="4" rx="2" fill="#16A34A" />
    <rect x="110" y="188" width="246" height="16" rx="5" fill="#F8FAFC" stroke="#E2E8F0" />
    <rect x="118" y="194" width="64" height="4" rx="2" fill="#CBD5E1" /><rect x="316" y="194" width="30" height="4" rx="2" fill="#F59E0B" />
  </Frame>
)

const posTiles = [
  { x: 44, y: 64, c: '#FDBA74', w: 40 },
  { x: 113, y: 64, c: '#86EFAC', w: 36 },
  { x: 182, y: 64, c: '#93C5FD', w: 42 },
  { x: 44, y: 128, c: '#F9A8D4', w: 34 },
  { x: 113, y: 128, c: '#FDE68A', w: 40 },
  { x: 182, y: 128, c: '#C4B5FD', w: 30 },
]

const Pos = () => (
  <Frame label="Retail ERP point of sale screen">
    <rect width="400" height="225" fill="#FFF4E8" />
    <rect x="30" y="22" width="340" height="215" rx="10" fill="#FFFFFF" />
    <rect x="44" y="36" width="200" height="18" rx="6" fill="#F1F5F9" />
    <rect x="52" y="43" width="70" height="4" rx="2" fill="#CBD5E1" />
    {posTiles.map((t) => (
      <g key={`${t.x}-${t.y}`}>
        <rect x={t.x} y={t.y} width="62" height="56" rx="8" fill="#F8FAFC" stroke="#E2E8F0" />
        <rect x={t.x + 8} y={t.y + 8} width="18" height="18" rx="5" fill={t.c} />
        <rect x={t.x + 8} y={t.y + 34} width={t.w} height="4" rx="2" fill="#CBD5E1" />
        <rect x={t.x + 8} y={t.y + 43} width="22" height="4" rx="2" fill={A} />
      </g>
    ))}
    <rect x="258" y="22" width="112" height="215" fill="#0A1022" />
    <text x="270" y="46" fontSize="10" fontWeight="700" fill="#FFFFFF">Cart</text>
    <rect x="270" y="58" width="60" height="5" rx="2.5" fill="#34406A" /><rect x="338" y="58" width="20" height="5" rx="2.5" fill="#34406A" />
    <rect x="270" y="74" width="52" height="5" rx="2.5" fill="#34406A" /><rect x="338" y="74" width="20" height="5" rx="2.5" fill="#34406A" />
    <rect x="270" y="90" width="64" height="5" rx="2.5" fill="#34406A" /><rect x="338" y="90" width="20" height="5" rx="2.5" fill="#34406A" />
    <rect x="270" y="112" width="88" height="1" fill="#34406A" />
    <text x="270" y="132" fontSize="9" fill="#9AA4B8">Total</text>
    <text x="270" y="152" fontSize="16" fontWeight="800" fill="#FFFFFF">Rs 4,850</text>
    <rect x="270" y="166" width="88" height="24" rx="7" fill={A} />
    <text x="302" y="182" fontSize="10" fontWeight="700" fill="#FFFFFF">Pay</text>
  </Frame>
)

const Social = () => (
  <Frame label="Social media growth analytics dashboard">
    <rect width="400" height="225" fill="#FCEFF6" />
    <rect x="30" y="22" width="340" height="215" rx="10" fill="#FFFFFF" />
    {[{ x: 44, t: '+18%' }, { x: 122, t: '24.1k' }, { x: 200, t: '36' }].map((k) => (
      <g key={k.t}>
        <rect x={k.x} y="36" width="70" height="38" rx="8" fill="#F8FAFC" stroke="#E2E8F0" />
        <rect x={k.x + 8} y="44" width="30" height="4" rx="2" fill="#CBD5E1" />
        <text x={k.x + 8} y="66" fontSize="13" fontWeight="800" fill="#0A1022">{k.t}</text>
      </g>
    ))}
    <path d="M44 180 H270" stroke="#E2E8F0" /><path d="M44 150 H270" stroke="#F1F5F9" /><path d="M44 120 H270" stroke="#F1F5F9" />
    <path d="M44 172 L80 164 L110 166 L140 148 L170 150 L200 128 L230 122 L270 96 L270 180 L44 180 Z" fill={A} opacity="0.12" />
    <path d="M44 172 L80 164 L110 166 L140 148 L170 150 L200 128 L230 122 L270 96" fill="none" stroke={A} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="270" cy="96" r="4.5" fill={A} />
    <text x="284" y="46" fontSize="9" fontWeight="600" fill="#5A6478">SCHEDULED</text>
    {[{ y: 62, c: '#EC4899', w: 52 }, { y: 82, c: '#3B82F6', w: 44 }, { y: 102, c: '#F59E0B', w: 50 }, { y: 122, c: '#0EA5E9', w: 40 }].map((p) => (
      <g key={p.y}>
        <circle cx="290" cy={p.y} r="5" fill={p.c} />
        <rect x="300" y={p.y - 2} width={p.w} height="5" rx="2.5" fill="#CBD5E1" />
      </g>
    ))}
    <rect x="284" y="140" width="72" height="22" rx="7" fill={A} />
    <text x="296" y="155" fontSize="9" fontWeight="600" fill="#FFFFFF">New post</text>
  </Frame>
)

const Gym = () => (
  <Frame label="Gym manager member app and owner dashboard">
    <rect width="400" height="225" fill="#EAF7EE" />
    <rect x="170" y="34" width="204" height="170" rx="12" fill="#FFFFFF" />
    <text x="236" y="56" fontSize="9" fontWeight="600" fill="#5A6478">CHECK-INS THIS WEEK</text>
    {[{ x: 236, y: 130 }, { x: 256, y: 110 }, { x: 276, y: 120 }, { x: 296, y: 90, hi: true }, { x: 316, y: 104 }, { x: 336, y: 140 }].map((b) => (
      <rect key={b.x} x={b.x} y={b.y} width="14" height={180 - b.y} rx="3" fill={b.hi ? A : '#BBF7D0'} />
    ))}
    <path d="M236 186 H354" stroke="#E2E8F0" />
    <rect x="60" y="16" width="110" height="222" rx="18" fill="#0A1022" />
    <rect x="66" y="22" width="98" height="210" rx="13" fill="#FFFFFF" />
    <text x="76" y="46" fontSize="10" fontWeight="700" fill="#0A1022">Today's workout</text>
    {[{ y: 58, w: 44, done: true }, { y: 82, w: 36, done: true }, { y: 106, w: 40, done: false }].map((r) => (
      <g key={r.y}>
        <rect x="76" y={r.y} width="78" height="20" rx="6" fill="#F1F5F9" />
        <rect x="82" y={r.y + 6} width="8" height="8" rx="2" fill={r.done ? '#16A34A' : 'none'} stroke={r.done ? undefined : '#94A3B8'} />
        <rect x="96" y={r.y + 8} width={r.w} height="4" rx="2" fill="#CBD5E1" />
      </g>
    ))}
    <rect x="76" y="138" width="78" height="24" rx="12" fill="#FFEDD5" />
    <text x="84" y="153" fontSize="8" fontWeight="600" fill="#C2410C">Fee due in 3 days</text>
    <circle cx="115" cy="196" r="20" fill={A} />
    <text x="101" y="199" fontSize="8" fontWeight="700" fill="#FFFFFF">Check in</text>
  </Frame>
)

const shots: Record<WorkShot, () => JSX.Element> = { college: College, hospital: Hospital, pos: Pos, social: Social, gym: Gym }

const WorkShotImage = ({ shot }: { shot: WorkShot }) => {
  const Shot = shots[shot]
  return <Shot />
}

export default WorkShotImage
