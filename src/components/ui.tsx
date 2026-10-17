import type { ReactNode } from 'react'
import { icons } from '../data/content'

type IconProps = { d: string; size?: number; strokeWidth?: number; className?: string }

export const Icon = ({ d, size = 24, strokeWidth = 1.8, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <path d={d} />
  </svg>
)

export const Check = ({ size = 18, strokeWidth = 2.2 }: { size?: number; strokeWidth?: number }) => (
  <Icon d={icons.check} size={size} strokeWidth={strokeWidth} className="mt-0.5 shrink-0 text-[#16A34A]" />
)

export const Logo = ({ subColor = 'text-haze-300' }: { subColor?: string }) => (
  <span className="flex items-center gap-2.5 text-white">
    <svg width="58" height="36" viewBox="0 0 160 100" aria-hidden="true">
      <path fillRule="evenodd" d="M10 10 H44 A40 40 0 0 1 44 90 H10 Z M28 28 H44 A22 22 0 0 1 44 72 H28 Z" fill="#FFFFFF" />
      <path d="M44 37 L46.6 47.4 L57 50 L46.6 52.6 L44 63 L41.4 52.6 L31 50 L41.4 47.4 Z" fill="#2E5BFF" />
      <path d="M96 90 V10 H110 L136 58 V10 H150 V90 H136 L110 42 V90 Z" fill="#FFFFFF" />
    </svg>
    <span className="flex flex-col gap-[3px]">
      <span className="font-display text-[21px] font-extrabold leading-none tracking-[-0.03em]">DevNova</span>
      <span className={`font-mono text-[10px] font-medium tracking-[0.34em] ${subColor}`}>TECHNOLOGY</span>
    </span>
  </span>
)

export const Eyebrow = ({ children, dark = false }: { children: ReactNode; dark?: boolean }) => (
  <div className={`font-mono text-[13px] font-medium uppercase tracking-[0.1em] ${dark ? 'text-periwinkle' : 'text-accent'}`}>
    {children}
  </div>
)

export const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className="m-0 font-display text-[clamp(34px,4.2vw,52px)] font-extrabold leading-[1.08] tracking-[-0.03em]">
    {children}
  </h2>
)

/** Eyebrow + heading on the left, supporting copy or a link on the right. */
export const SplitHeader = ({ eyebrow, title, aside, dark = false }: { eyebrow: string; title: string; aside: ReactNode; dark?: boolean }) => (
  <div className="rv flex flex-wrap items-end justify-between gap-6">
    <div className="flex max-w-[700px] flex-col gap-4">
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      <H2>{title}</H2>
    </div>
    {typeof aside === 'string' ? (
      <p className={`m-0 max-w-[420px] text-[17px] leading-[1.65] ${dark ? 'text-haze-200' : 'text-body'}`}>{aside}</p>
    ) : (
      aside
    )}
  </div>
)

/** 1280px of content plus 24px gutters (the mockup sizes the content box, Tailwind the border box). */
export const Container = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`mx-auto max-w-[1328px] px-6 ${className}`}>{children}</div>
)
