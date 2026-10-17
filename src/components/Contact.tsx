import { useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { contact, enquiryServices, enquirySteps, icons, projectStages, referralSources, timelines } from '../data/content'
import { Container, Eyebrow, Icon } from './ui'

const MAX_FILE_BYTES = 10 * 1024 * 1024

const api = async (path: string, body: BodyInit, json = false) => {
  const res = await fetch(`${import.meta.env.BASE_URL}api/${path}`, {
    method: 'POST',
    body,
    headers: json ? { 'Content-Type': 'application/json' } : undefined,
  })
  const data = await res.json().catch(() => ({ ok: false }))
  if (!res.ok || !data.ok) {
    throw new Error(data.error || 'Something went wrong. Please try again or email us directly.')
  }
}

const emptyForm = {
  name: '',
  email: '',
  company: '',
  phone: '',
  services: [] as string[],
  stage: '',
  timeline: timelines[0],
  source: '',
  details: '',
  nda: false,
  consent: false,
  website: '', // honeypot
}

const field = 'h-[52px] w-full rounded-[10px] border border-line-input bg-white px-3.5 text-base text-ink'
const labelCls = 'flex flex-col gap-2 text-sm font-medium text-body-deep'

const Chip = ({ on, onClick, children }: { on: boolean; onClick: () => void; children: ReactNode }) => (
  <button
    type="button"
    aria-pressed={on}
    onClick={onClick}
    className={`min-h-[44px] cursor-pointer rounded-full border px-4 py-2.5 text-sm font-medium ${
      on ? 'border-accent bg-accent text-white' : 'border-line-input bg-white text-body-deep'
    }`}
  >
    {children}
  </button>
)

const StepTitle = ({ n, children }: { n: number; children: ReactNode }) => (
  <div className="flex items-center gap-3">
    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-mist-accent text-[13px] font-bold text-accent">{n}</span>
    <span className="font-display text-lg font-bold">{children}</span>
  </div>
)

const Legend = ({ children }: { children: ReactNode }) => (
  <legend className="mb-3 text-sm font-medium text-body-deep">{children}</legend>
)

const ErrorNote = ({ message }: { message: string }) =>
  message ? (
    <div role="alert" className="rounded-[10px] border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-sm text-[#B91C1C]">
      {message}
    </div>
  ) : null

const EnquiryCard = () => {
  const [form, setForm] = useState(emptyForm)
  const [file, setFile] = useState<File | null>(null)
  const [phase, setPhase] = useState<'form' | 'verify' | 'sent'>('form')
  const [code, setCode] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => setForm((f) => ({ ...f, [key]: value }))

  const toggleService = (name: string) =>
    set('services', form.services.includes(name) ? form.services.filter((s) => s !== name) : [...form.services, name])

  const run = async (task: () => Promise<void>) => {
    setBusy(true)
    setError('')
    try {
      await task()
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setBusy(false)
    }
  }

  const requestCode = () => api('send-code.php', JSON.stringify({ email: form.email, name: form.name }), true)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!form.services.length) {
      setError('Please select at least one service you need.')
      return
    }
    if (file && file.size > MAX_FILE_BYTES) {
      setError('The attachment must be 10 MB or smaller.')
      return
    }
    run(async () => {
      await requestCode()
      setCode('')
      setNotice('')
      setPhase('verify')
    })
  }

  const handleResend = () =>
    run(async () => {
      await requestCode()
      setNotice('A new code is on its way.')
    })

  const handleVerify = (e: FormEvent) => {
    e.preventDefault()
    run(async () => {
      const data = new FormData()
      Object.entries(form).forEach(([key, value]) => {
        if (key === 'services') data.append(key, JSON.stringify(value))
        else if (typeof value === 'boolean') data.append(key, value ? '1' : '0')
        else data.append(key, value as string)
      })
      data.append('code', code)
      if (file) data.append('attachment', file)
      await api('enquiry.php', data)
      setPhase('sent')
    })
  }

  const reset = () => {
    setForm(emptyForm)
    setFile(null)
    setCode('')
    setError('')
    setPhase('form')
  }

  return (
    <div className="rv rv2 min-w-0 flex-[1_1_580px] overflow-hidden rounded-3xl border border-line bg-white shadow-[0_40px_80px_-48px_rgba(10,16,34,0.35)]">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-ink px-6 py-7 text-white sm:px-9">
        <div className="flex flex-col gap-1.5">
          <h3 className="m-0 font-display text-[23px] font-extrabold tracking-[-0.02em]">Start your project</h3>
          <span className="text-sm text-haze-200">Takes about 2 minutes · Fields marked * are required</span>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-edge bg-ink-card px-3.5 py-2 text-[13px] text-haze-100">
          <span className="dn-pulse h-2 w-2 rounded-full bg-[#34D399]" />
          Reply within 24 hours
        </span>
      </div>

      {phase === 'form' && (
        <form onSubmit={handleSubmit} className="dn-form flex flex-col gap-[34px] p-6 sm:p-9">
          <div className="flex flex-col gap-[18px]">
            <StepTitle n={1}>About you</StepTitle>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[18px]">
              <label className={labelCls}>
                Full name *
                <input type="text" required maxLength={100} value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="e.g. Ahmed Khan" className={field} />
              </label>
              <label className={labelCls}>
                Work email *
                <input type="email" required maxLength={254} value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@company.com" className={field} />
              </label>
              <label className={labelCls}>
                Company / organisation
                <input type="text" maxLength={150} value={form.company} onChange={(e) => set('company', e.target.value)} placeholder="Company name" className={field} />
              </label>
              <label className={labelCls}>
                Phone / WhatsApp
                <input type="tel" maxLength={40} value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+92 3XX XXXXXXX" className={field} />
              </label>
            </div>
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={form.website}
              onChange={(e) => set('website', e.target.value)}
              className="absolute left-[-9999px] h-px w-px opacity-0"
            />
          </div>

          <div className="flex flex-col gap-[22px] border-t border-line-soft pt-[30px]">
            <StepTitle n={2}>Your project</StepTitle>
            <fieldset>
              <Legend>What do you need? Select all that apply *</Legend>
              <div className="flex flex-wrap gap-2.5">
                {enquiryServices.map((s) => (
                  <Chip key={s} on={form.services.includes(s)} onClick={() => toggleService(s)}>{s}</Chip>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <Legend>Project stage</Legend>
              <div className="flex flex-wrap gap-2.5">
                {projectStages.map((s) => (
                  <Chip key={s} on={form.stage === s} onClick={() => set('stage', form.stage === s ? '' : s)}>{s}</Chip>
                ))}
              </div>
            </fieldset>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[18px]">
              <label className={labelCls}>
                Desired timeline
                <select value={form.timeline} onChange={(e) => set('timeline', e.target.value)} className={`${field} px-3`}>
                  {timelines.map((t) => <option key={t}>{t}</option>)}
                </select>
              </label>
              <label className={labelCls}>
                How did you hear about us?
                <select value={form.source} onChange={(e) => set('source', e.target.value)} className={`${field} px-3`}>
                  <option value="">Select an option</option>
                  {referralSources.map((s) => <option key={s}>{s}</option>)}
                </select>
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-[18px] border-t border-line-soft pt-[30px]">
            <StepTitle n={3}>Project details</StepTitle>
            <label className={labelCls}>
              Describe your project *
              <textarea
                rows={6}
                required
                maxLength={5000}
                value={form.details}
                onChange={(e) => set('details', e.target.value)}
                placeholder="What are you building, who is it for, and what problem does it solve? Mention any key features, integrations or reference apps you like."
                className="w-full resize-y rounded-[10px] border border-line-input bg-white p-3.5 text-base leading-[1.55] text-ink"
              />
            </label>
            <label className="flex cursor-pointer flex-wrap items-center gap-3.5 rounded-xl border-[1.5px] border-dashed border-[#C8D0DE] bg-[#F8FAFC] px-5 py-[18px]">
              <span className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-line bg-white text-accent">
                <Icon d={icons.upload} size={22} />
              </span>
              <span className="flex flex-[1_1_200px] flex-col gap-[3px]">
                <span className="text-[15px] font-semibold text-ink">Attach a brief, wireframes or documents</span>
                <span className="text-[13px] text-body-soft">PDF, DOC, PNG or JPG · up to 10 MB</span>
              </span>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="max-w-full text-sm text-body"
              />
            </label>
          </div>

          <div className="flex flex-col gap-3">
            <label className="flex cursor-pointer items-start gap-3 text-sm leading-[1.5] text-body-strong">
              <input type="checkbox" checked={form.nda} onChange={(e) => set('nda', e.target.checked)} className="mt-px h-[18px] w-[18px] shrink-0 accent-accent" />
              Please send me a Non-Disclosure Agreement (NDA) before we discuss my project.
            </label>
            <label className="flex cursor-pointer items-start gap-3 text-sm leading-[1.5] text-body-strong">
              <input type="checkbox" required checked={form.consent} onChange={(e) => set('consent', e.target.checked)} className="mt-px h-[18px] w-[18px] shrink-0 accent-accent" />
              <span>
                I agree to DevNova Technology contacting me about this enquiry, as described in the{' '}
                <a href="#contact" className="text-accent underline">Privacy Policy</a>. *
              </span>
            </label>
          </div>

          <ErrorNote message={error} />

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <span className="flex items-center gap-2 text-[13px] text-body-soft">
              <Icon d={icons.lock} size={16} strokeWidth={2} />
              Your information is confidential and never shared.
            </span>
            <button
              type="submit"
              disabled={busy}
              className="inline-flex min-h-[52px] cursor-pointer items-center gap-2.5 rounded-[10px] border-0 bg-accent px-7 py-4 text-base font-semibold text-white disabled:cursor-wait disabled:opacity-70"
            >
              {busy ? 'Sending code…' : 'Submit Project Enquiry'}
              <Icon d={icons.arrow} size={18} strokeWidth={2} />
            </button>
          </div>
        </form>
      )}

      {phase === 'verify' && (
        <form onSubmit={handleVerify} className="dn-form flex flex-col items-center gap-[18px] px-6 py-14 text-center sm:px-9">
          <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-mist-accent text-accent">
            <Icon d={icons.mail} size={32} />
          </div>
          <h3 className="m-0 font-display text-[26px] font-extrabold tracking-[-0.02em]">Confirm your email</h3>
          <p className="m-0 max-w-[440px] text-base leading-[1.6] text-body">
            We sent a 6-digit code to <strong className="text-ink">{form.email}</strong>. Enter it below to send your enquiry.
          </p>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            required
            pattern="\d{6}"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
            placeholder="••••••"
            aria-label="Verification code"
            className="h-[60px] w-full max-w-[260px] rounded-[10px] border border-line-input bg-white text-center font-mono text-[28px] tracking-[0.4em] text-ink"
          />
          <div className="w-full max-w-[440px]">
            <ErrorNote message={error} />
          </div>
          {notice && !error && <p className="m-0 text-sm text-[#15803D]">{notice}</p>}
          <button
            type="submit"
            disabled={busy || code.length !== 6}
            className="inline-flex min-h-[52px] cursor-pointer items-center gap-2.5 rounded-[10px] border-0 bg-accent px-7 py-4 text-base font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy ? 'Sending…' : 'Verify & Send Enquiry'}
            <Icon d={icons.arrow} size={18} strokeWidth={2} />
          </button>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
            <button type="button" disabled={busy} onClick={handleResend} className="cursor-pointer font-semibold text-accent disabled:opacity-60">
              Resend code
            </button>
            <button type="button" disabled={busy} onClick={() => { setError(''); setPhase('form') }} className="cursor-pointer text-body">
              Change email or edit details
            </button>
          </div>
          <p className="m-0 text-[13px] text-body-soft">Can't find it? Check your spam folder. The code expires in 10 minutes.</p>
        </form>
      )}

      {phase === 'sent' && (
        <div className="flex flex-col items-center gap-[18px] px-6 py-16 text-center sm:px-9">
          <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#DCFCE7] text-[#15803D]">
            <Icon d={icons.check} size={34} strokeWidth={2.4} />
          </div>
          <h3 className="m-0 font-display text-[26px] font-extrabold tracking-[-0.02em]">Thank you, we've received your enquiry</h3>
          <p className="m-0 max-w-[440px] text-base leading-[1.6] text-body">
            A project consultant will email you within one business day to schedule a free discovery call.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-2 min-h-[48px] cursor-pointer rounded-[10px] border border-line-input bg-white px-[22px] py-[13px] text-[15px] font-semibold text-ink"
          >
            Submit another enquiry
          </button>
        </div>
      )}
    </div>
  )
}

const Contact = () => (
  <section id="contact" className="bg-mist">
    <Container className="flex flex-wrap gap-14 py-28">
      <div className="rv flex min-w-0 flex-[1_1_420px] flex-col gap-6">
        <Eyebrow>Get in Touch</Eyebrow>
        <h2 className="m-0 font-display text-[clamp(36px,4.6vw,58px)] font-extrabold leading-[1.04] tracking-[-0.035em]">
          Let's build something great together.
        </h2>
        <p className="m-0 text-[17px] leading-[1.65] text-body">
          Share a few details about your project. We reply within one business day with questions, a suggested
          approach and a ballpark estimate.
        </p>
        <div className="flex flex-col gap-5 border-y border-line py-[26px]">
          <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-body-soft">What happens next</span>
          {enquirySteps.map((step, i) => (
            <div key={step.title} className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-bold text-white">{i + 1}</span>
              <div className="flex flex-col gap-1">
                <strong className="font-display text-base">{step.title}</strong>
                <span className="text-[15px] leading-[1.5] text-body">{step.body}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3.5 pt-2 text-base">
          <a href={`mailto:${contact.email}`} className="flex items-center gap-3">
            <Icon d={icons.mail} size={20} className="shrink-0 text-accent" />
            {contact.email}
          </a>
          <div className="flex items-center gap-3">
            <Icon d={icons.call} size={20} className="shrink-0 text-accent" />
            <span className="flex flex-wrap gap-x-4">
              {contact.phones.map((p) => (
                <a key={p.tel} href={`tel:${p.tel}`}>{p.label}</a>
              ))}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Icon d={icons.pin} size={20} className="shrink-0 text-accent" />
            {contact.address}
          </div>
        </div>
      </div>

      <EnquiryCard />
    </Container>
  </section>
)

export default Contact
