import { useState } from 'react'
import { contact, navLinks } from '../data/content'
import { Container, Logo } from './ui'

export const TopBar = () => (
  <div className="bg-ink-deep text-[13px] text-haze-300">
    <Container className="flex flex-wrap justify-between gap-x-6 gap-y-2 py-2.5">
      <span>Full-service software house · {contact.city} · Serving clients worldwide</span>
      <span className="flex flex-wrap gap-5">
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
        <a href={`tel:${contact.phones[0].tel}`}>{contact.phones[0].label}</a>
      </span>
    </Container>
  </div>
)

const Navbar = () => {
  const [open, setOpen] = useState(false)

  return (
    <nav>
      <Container className="flex flex-wrap items-center justify-between gap-4 border-b border-edge-soft py-[22px]">
        <a href="#top" aria-label="DevNova Technology home">
          <Logo />
        </a>

        <div className="hidden flex-wrap items-center gap-7 text-[15px] text-haze-100 lg:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>{link.name}</a>
          ))}
          <a href="#contact" className="rounded-[10px] bg-accent px-[22px] py-3 font-semibold text-white">
            Get a Free Quote
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="rounded-[10px] border border-edge-strong p-2.5 text-white lg:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d={open ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16'} />
          </svg>
        </button>

        {open && (
          <div className="flex w-full flex-col gap-1 pb-2 text-[15px] text-haze-100 lg:hidden">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="py-2.5">
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-[10px] bg-accent px-[22px] py-3 text-center font-semibold text-white"
            >
              Get a Free Quote
            </a>
          </div>
        )}
      </Container>
    </nav>
  )
}

export default Navbar
