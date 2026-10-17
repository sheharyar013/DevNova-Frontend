import { heroCards, heroStats, tech } from '../data/content'
import Navbar from './Navbar'
import { Container, Icon } from './ui'

const Hero = () => (
  <section id="top" className="bg-ink text-white">
    <Navbar />
    <Container className="flex flex-wrap items-center gap-16 pb-24 pt-[88px]">
      <div className="flex min-w-0 flex-[1_1_560px] flex-col gap-7">
        <div className="inline-flex items-center gap-2.5 self-start rounded-full border border-edge bg-ink-card px-4 py-2 text-sm text-haze-100">
          <span className="dn-pulse h-2 w-2 rounded-full bg-[#34D399]" />
          Now taking new projects for Q4 2026
        </div>
        <h1 className="m-0 font-display text-[clamp(42px,5.6vw,76px)] font-extrabold leading-[1.04] tracking-[-0.035em]">
          We design, build and grow <span className="text-periwinkle">digital products</span> for ambitious businesses.
        </h1>
        <p className="m-0 max-w-[600px] text-[19px] leading-[1.65] text-haze-200">
          DevNova Technology is a full-service software house. From custom software, web and mobile apps to AI
          solutions, games and digital marketing — one team takes your idea from strategy to launch and beyond.
        </p>
        <div className="flex flex-wrap gap-3.5">
          <a href="#contact" className="rounded-[10px] bg-accent px-7 py-4 text-base font-semibold text-white">
            Start Your Project
          </a>
          <a href="#products" className="rounded-[10px] border border-edge-strong px-7 py-[15px] text-base font-medium text-white">
            Explore Our Products
          </a>
        </div>
        <div className="flex flex-wrap gap-8 border-t border-edge-soft pt-3">
          {heroStats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1 pt-5">
              <span className="font-display text-[30px] font-extrabold">{stat.value}</span>
              <span className="text-sm text-haze-300">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid min-w-0 flex-[1_1_440px] grid-cols-2 gap-4">
        {heroCards.map((card) => (
          <div
            key={card.title}
            className={`${card.float} flex flex-col gap-3.5 rounded-[18px] border border-edge bg-ink-card p-[26px] ${card.offset ? 'mt-9' : ''}`}
          >
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.primary ? 'bg-accent text-white' : 'bg-ink-chip text-periwinkle'}`}>
              <Icon d={card.icon} size={22} />
            </div>
            <div className="font-display text-lg font-bold">{card.title}</div>
            <div className="text-sm leading-[1.55] text-haze-300">{card.body}</div>
          </div>
        ))}
      </div>
    </Container>
  </section>
)

export const TechMarquee = () => (
  <section className="overflow-hidden border-t border-edge-soft bg-ink-deep" aria-label="Technologies we use">
    <div className="dn-track flex w-max">
      {[...tech, ...tech].map((t, i) => (
        <span
          key={i}
          aria-hidden={i >= tech.length}
          className="flex items-center gap-7 whitespace-nowrap px-7 py-[22px] font-mono text-[15px] text-haze-400"
        >
          {t}
          <span className="h-[5px] w-[5px] rounded-full bg-edge-strong" />
        </span>
      ))}
    </div>
  </section>
)

export default Hero
