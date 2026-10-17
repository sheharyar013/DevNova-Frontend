import { reasons, stagger } from '../data/content'
import { Container, Eyebrow, H2 } from './ui'

const WhyUs = () => (
  <section className="bg-ink text-white">
    <Container className="flex flex-wrap items-center gap-14 py-28">
      <div className="rv flex min-w-0 flex-[1_1_460px] flex-col gap-5">
        <Eyebrow dark>Why DevNova</Eyebrow>
        <H2>A partner that cares about the outcome, not just the code.</H2>
        <p className="m-0 text-[17px] leading-[1.65] text-haze-200">
          Experienced engineers who have shipped for clients in the US, the Middle East and Pakistan. You get direct
          access to your team, weekly demos and full ownership of everything we build.
        </p>
      </div>
      <div className="grid min-w-0 flex-[1_1_520px] grid-cols-1 gap-4 sm:grid-cols-2">
        {reasons.map((r, i) => (
          <div key={r.title} className={`${stagger(i)} flex flex-col gap-2.5 rounded-2xl border border-edge bg-ink-card p-[26px]`}>
            <h3 className="m-0 font-display text-lg font-bold">{r.title}</h3>
            <p className="m-0 text-[15px] leading-[1.55] text-haze-200">{r.body}</p>
          </div>
        ))}
      </div>
    </Container>
  </section>
)

export default WhyUs
