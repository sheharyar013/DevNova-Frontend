import { engagements, stagger, steps } from '../data/content'
import { Check, Container, Icon, SplitHeader } from './ui'

const Process = () => (
  <section id="process" className="bg-white">
    <Container className="flex flex-col gap-14 py-28">
      <SplitHeader
        eyebrow="How We Work"
        title="A proven delivery process, from idea to launch."
        aside="Five clear stages, each with defined deliverables and your sign-off, so you always know what's done, what's next and what it costs."
      />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
        {steps.map((p, i) => (
          <div key={p.num} className={`${stagger(i)} flex flex-col gap-[18px] pb-9 pr-6`}>
            <div className="flex items-center">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-white text-accent">
                <Icon d={p.icon} />
              </div>
              {i < steps.length - 1 && (
                <div className="ml-3 h-0.5 grow bg-[repeating-linear-gradient(90deg,#C3CEF6_0_6px,transparent_6px_12px)]" />
              )}
            </div>
            <div className="font-mono text-xs font-medium tracking-[0.1em] text-accent">STEP {p.num}</div>
            <h3 className="m-0 font-display text-[21px] font-bold tracking-[-0.01em]">{p.title}</h3>
            <p className="m-0 text-[15px] leading-[1.6] text-body">{p.body}</p>
            <div className="flex flex-col gap-2.5 rounded-xl bg-mist p-4">
              <span className="text-xs font-semibold uppercase tracking-[0.06em] text-body-soft">Deliverables</span>
              {p.out.map((o) => (
                <div key={o} className="flex items-start gap-2 text-sm leading-[1.45] text-body-deep">
                  <Check size={16} strokeWidth={2.4} />
                  {o}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="rv flex flex-col gap-6 border-t border-line pt-6">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="m-0 font-display text-[26px] font-extrabold tracking-[-0.02em]">Flexible engagement models</h3>
          <span className="text-[15px] text-body">Choose the way of working that fits your budget and goals.</span>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-5">
          {engagements.map((e) => (
            <div
              key={e.title}
              className={`dn-ind flex flex-col gap-3 rounded-2xl ${e.popular ? 'border-2 border-accent p-[27px]' : 'border border-line p-7'}`}
            >
              <div className="flex items-center justify-between gap-2">
                <h4 className="m-0 font-display text-[19px] font-bold">{e.title}</h4>
                {e.popular && (
                  <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-white">Most popular</span>
                )}
              </div>
              <p className="m-0 text-[15px] leading-[1.6] text-body">{e.body}</p>
              <span className="text-sm font-medium text-accent">Best for: {e.bestFor}</span>
            </div>
          ))}
        </div>
      </div>
    </Container>
  </section>
)

export default Process
