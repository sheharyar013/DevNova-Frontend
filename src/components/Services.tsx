import { extraServices, products, services, stagger } from '../data/content'
import { Check, Container, Eyebrow, H2, Icon, SplitHeader } from './ui'

const Services = () => (
  <section id="services" className="bg-white">
    <Container className="flex flex-col gap-14 py-28">
      <SplitHeader
        eyebrow="Our Services"
        title="End-to-end technology services, under one roof."
        aside="Whatever you need built, launched or grown, we have a dedicated team for it, backed by one project manager who is accountable for the result."
      />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-5">
        {services.map((s, i) => (
          <div key={s.title} className={`${stagger(i)} flex flex-col gap-3.5 rounded-2xl border border-line bg-white p-7`}>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mist-accent text-accent">
              <Icon d={s.icon} />
            </div>
            <h3 className="m-0 font-display text-[19px] font-bold tracking-[-0.01em]">{s.title}</h3>
            <p className="m-0 text-[15px] leading-[1.6] text-body">{s.body}</p>
          </div>
        ))}
      </div>
      <div className="rv flex flex-wrap items-center gap-2.5 text-sm text-body-strong">
        <span className="mr-1.5 font-semibold">Also:</span>
        {extraServices.map((name) => (
          <span key={name} className="rounded-full bg-mist-chip px-3.5 py-2">{name}</span>
        ))}
      </div>
    </Container>
  </section>
)

export const Products = () => (
  <section id="products" className="bg-mist">
    <Container className="flex flex-col gap-14 py-28">
      <div className="rv flex max-w-[760px] flex-col gap-4">
        <Eyebrow>Ready-made Products</Eyebrow>
        <H2>Business software you can launch this month.</H2>
        <p className="m-0 text-[17px] leading-[1.65] text-body">
          Proven management systems, customised to your workflow, branded for you and installed on the cloud or your own servers.
        </p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-6">
        {products.map((p, i) => (
          <div key={p.name} className={`${stagger(i)} flex flex-col overflow-hidden rounded-[20px] border border-line bg-white`}>
            <div className="flex flex-col gap-[18px] bg-ink p-7 text-white">
              <div className="flex items-center justify-between">
                <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[14px] bg-accent text-white">
                  <Icon d={p.icon} size={26} />
                </div>
                <span className="rounded-full border border-edge-strong px-3 py-[5px] font-mono text-xs text-haze-200">{p.platform}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="m-0 font-display text-[22px] font-bold tracking-[-0.015em]">{p.name}</h3>
                <span className="text-[15px] text-haze-200">{p.tagline}</span>
              </div>
            </div>
            <div className="flex grow flex-col gap-3 px-7 pb-7 pt-[26px]">
              {p.features.map((f) => (
                <div key={f} className="flex items-start gap-2.5 text-[15px] leading-[1.5] text-body-deep">
                  <Check />
                  {f}
                </div>
              ))}
              <a href="#contact" className="mt-auto pt-3.5 text-[15px] font-semibold text-accent">Request a demo →</a>
            </div>
          </div>
        ))}
      </div>
    </Container>
  </section>
)

const Tag = ({ children }: { children: string }) => (
  <span className="rounded-full border border-edge-strong px-2.5 py-1">{children}</span>
)

export const Games = () => (
  <section id="games" className="bg-ink text-white">
    <Container className="flex flex-col gap-14 py-28">
      <SplitHeader
        dark
        eyebrow="DevNova Games"
        title="We make games people can't put down."
        aside="Our in-house studio builds casual and puzzle games for Android and iOS, and develops custom games for brands."
      />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(360px,100%),1fr))] gap-6">
        <div className="rv rv2 flex flex-col overflow-hidden rounded-3xl border border-edge bg-ink-card">
          <div className="flex justify-center bg-[#17214A] p-8">
            <svg width="300" height="220" viewBox="0 0 300 220" className="h-auto max-w-full" role="img" aria-label="Wiggle Out puzzle board with colourful snake lines">
              <rect x="40" y="10" width="220" height="200" rx="18" fill="#0E1633" stroke="#2D3A68" />
              <g stroke="#22305E" strokeWidth="1">
                <path d="M76 10v200M112 10v200M148 10v200M184 10v200M220 10v200M40 50h220M40 90h220M40 130h220M40 170h220" />
              </g>
              <path d="M58 30 H130 V70 H166" fill="none" stroke="#34D399" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="166" cy="70" r="9" fill="#34D399" />
              <path d="M240 150 V110 H202 V190" fill="none" stroke="#F59E0B" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="202" cy="190" r="9" fill="#F59E0B" />
              <path d="M94 190 V110 H58" fill="none" stroke="#F472B6" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="58" cy="110" r="9" fill="#F472B6" />
              <path d="M166 30 H240" fill="none" stroke="#8EA6FF" strokeWidth="14" strokeLinecap="round" />
              <circle cx="240" cy="30" r="9" fill="#8EA6FF" />
              <path d="M272 30 l10 0 m-6 -6 l6 6 l-6 6" fill="none" stroke="#8EA6FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex flex-col gap-3.5 p-[30px]">
            <div className="flex flex-wrap gap-2 font-mono text-xs text-haze-200">
              <Tag>Puzzle</Tag><Tag>Android</Tag><Tag>Free with ad-free upgrade</Tag>
            </div>
            <h3 className="m-0 font-display text-[28px] font-extrabold">Wiggle Out</h3>
            <p className="m-0 text-base leading-[1.6] text-haze-200">
              A brain-teasing puzzle where you slide wriggly snakes off the board in the right order. Easy to learn, hard to master, with hundreds of handcrafted levels.
            </p>
            <a href="#games" className="mt-1.5 self-start rounded-[10px] bg-white px-5 py-3 text-[15px] font-semibold text-ink">Get it on Google Play</a>
          </div>
        </div>

        <div className="rv rv3 flex flex-col overflow-hidden rounded-3xl border border-edge bg-ink-card">
          <div className="flex justify-center bg-[#2A1E4A] p-8">
            <svg width="300" height="220" viewBox="0 0 300 220" className="h-auto max-w-full" role="img" aria-label="Seek and Spot hidden object scene with a magnifying glass">
              <rect x="20" y="10" width="260" height="200" rx="18" fill="#1D1538" stroke="#40306B" />
              <rect x="40" y="130" width="220" height="60" rx="6" fill="#33265C" />
              <rect x="56" y="70" width="46" height="60" rx="4" fill="#4C3A86" />
              <circle cx="79" cy="92" r="10" fill="#F59E0B" />
              <path d="M130 130 l22 -48 l22 48 z" fill="#5B47A0" />
              <rect x="196" y="56" width="50" height="74" rx="6" fill="#4C3A86" />
              <rect x="206" y="68" width="30" height="20" rx="3" fill="#8EA6FF" />
              <circle cx="70" cy="160" r="8" fill="#F472B6" />
              <rect x="110" y="150" width="26" height="20" rx="4" fill="#34D399" />
              <path d="M226 152 l6 12 l13 2 l-9 9 l2 13 l-12 -6 l-12 6 l2 -13 l-9 -9 l13 -2 z" fill="#FDE68A" />
              <circle cx="168" cy="102" r="38" fill="rgba(255,255,255,0.08)" stroke="#FFFFFF" strokeWidth="6" />
              <path d="M195 129 L226 160" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex flex-col gap-3.5 p-[30px]">
            <div className="flex flex-wrap gap-2 font-mono text-xs text-haze-200">
              <Tag>Hidden object</Tag><Tag>Flutter</Tag><Tag>Android &amp; iOS</Tag>
            </div>
            <h3 className="m-0 font-display text-[28px] font-extrabold">Seek &amp; Spot</h3>
            <p className="m-0 text-base leading-[1.6] text-haze-200">
              A relaxing hidden-object adventure. Explore detailed scenes, find every hidden item against the clock and unlock new worlds as you go.
            </p>
            <a href="#games" className="mt-1.5 self-start rounded-[10px] border border-white px-5 py-[11px] text-[15px] font-semibold text-white">Coming soon</a>
          </div>
        </div>
      </div>
    </Container>
  </section>
)

export default Services
