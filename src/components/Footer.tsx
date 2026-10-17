import { footerColumns } from '../data/content'
import { Container, Logo } from './ui'

const Footer = () => (
  <footer className="bg-ink-deep text-haze-200">
    <Container className="flex flex-col gap-12 pb-9 pt-[72px]">
      <div className="flex flex-wrap justify-between gap-12">
        <div className="flex max-w-[320px] flex-col gap-4">
          <Logo subColor="text-haze-400" />
          <p className="m-0 text-[15px] leading-[1.65]">
            A full-service software house building software, apps, AI solutions and games, and growing brands online.
          </p>
        </div>
        <div className="flex flex-wrap gap-14 text-[15px]">
          {footerColumns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <div className="font-mono text-xs uppercase tracking-[0.1em] text-haze-400">{col.title}</div>
              {col.links.map((link) => (
                <a key={link.name} href={link.href}>{link.name}</a>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap justify-between gap-3 border-t border-edge-soft pt-6 text-sm text-haze-400">
        <span>© {new Date().getFullYear()} DevNova Technology. All rights reserved.</span>
        <span>Privacy Policy · Terms of Service</span>
      </div>
    </Container>
  </footer>
)

export default Footer
