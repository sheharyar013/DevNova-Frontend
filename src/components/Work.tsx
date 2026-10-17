import { stagger, work } from '../data/content'
import { Container, SplitHeader } from './ui'
import WorkShotImage from './WorkShots'

const Work = () => (
  <section id="work" className="bg-white">
    <Container className="flex flex-col gap-14 py-28">
      <SplitHeader
        eyebrow="Our Work"
        title="Recent projects we've delivered."
        aside={<a href="#contact" className="text-base font-semibold text-accent">Discuss a similar project →</a>}
      />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(360px,100%),1fr))] gap-6">
        {work.map((w, i) => (
          <div key={w.title} className={`${stagger(i)} flex flex-col overflow-hidden rounded-[20px] border border-line bg-white`}>
            <div className="dn-shot aspect-video overflow-hidden border-b border-line">
              <WorkShotImage shot={w.shot} />
            </div>
            <div className="flex grow flex-col gap-3 p-[26px]">
              <span className="font-mono text-xs font-medium uppercase tracking-[0.06em] text-accent">{w.category}</span>
              <h3 className="m-0 font-display text-[21px] font-bold tracking-[-0.01em]">{w.title}</h3>
              <p className="m-0 text-[15px] leading-[1.6] text-body">{w.body}</p>
              <div className="mt-auto flex flex-wrap gap-2 pt-2">
                {w.stack.map((k) => (
                  <span key={k} className="rounded-md bg-mist-chip px-2.5 py-[5px] text-[13px] text-body-strong">{k}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  </section>
)

export default Work
