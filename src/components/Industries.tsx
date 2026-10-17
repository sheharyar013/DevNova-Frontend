import { industries, stagger } from '../data/content'
import { Container, Icon, SplitHeader } from './ui'

const Industries = () => (
  <section className="bg-mist">
    <Container className="flex flex-col gap-14 py-28">
      <SplitHeader
        eyebrow="Industries We Serve"
        title="Solutions shaped by real industry experience."
        aside="We understand the workflows, regulations and customers of each sector we serve, so your software solves the right problems from day one."
      />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-5">
        {industries.map((ind, i) => (
          <div key={ind.name} className={`${stagger(i)} flex`}>
            <div className="dn-ind flex grow flex-col gap-3.5 rounded-2xl border border-line bg-white p-7">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink text-white">
                  <Icon d={ind.icon} />
                </div>
                <span className="font-mono text-[13px] text-haze-300">{ind.num}</span>
              </div>
              <h3 className="m-0 font-display text-xl font-bold tracking-[-0.01em]">{ind.name}</h3>
              <p className="m-0 grow text-[15px] leading-[1.6] text-body">{ind.body}</p>
              <div className="border-t border-line-soft pt-3.5 text-[13px] font-medium text-accent">{ind.solutions}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="rv flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-ink px-8 py-[26px] text-white">
        <span className="font-display text-[19px] font-bold">Don't see your industry? We build custom solutions for any sector.</span>
        <a href="#contact" className="rounded-[10px] bg-accent px-[22px] py-[13px] text-[15px] font-semibold text-white">Talk to an expert</a>
      </div>
    </Container>
  </section>
)

export default Industries
