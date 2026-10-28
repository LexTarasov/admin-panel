import { useState } from 'react'
import { useAppConfig } from '../context/AppConfigContext'

// credenciales de demo para explorar el panel
const CREDENTIALS = [
  {
    roleKey: 'demo.admin',
    badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    email: 'tiffany.he@berkshirehathaway.com',
    password: '12345678A',
  },
  {
    roleKey: 'demo.user',
    badge: 'bg-slate-500/10 text-slate-300 border-slate-500/20',
    email: 'ran.lewis@apple.com',
    password: '87654321B',
  },
]

export default function DemoCredentials() {
  const { t } = useAppConfig()
  const [copiedKey, setCopiedKey] = useState(null)

  async function copy(key, text) {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedKey(key)
      setTimeout(() => setCopiedKey((current) => (current === key ? null : current)), 1500)
    } catch {
      // el navegador bloqueo el portapapeles, no hacemos nada
    }
  }

  function CredRow({ fieldKey, label, value }) {
    const isCopied = copiedKey === fieldKey
    return (
      <div className="flex items-center justify-between gap-3 py-2">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{label}</p>
          <p className="text-sm text-slate-200 font-mono truncate">{value}</p>
        </div>
        <button
          type="button"
          onClick={() => copy(fieldKey, value)}
          title={isCopied ? t('demo.copied') : t('demo.copy')}
          aria-label={isCopied ? t('demo.copied') : `${t('demo.copy')} ${label}`}
          className={`shrink-0 p-2 rounded-lg border transition-colors ${
            isCopied
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
              : 'border-slate-700 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/40 hover:bg-indigo-500/10'
          }`}
        >
          {isCopied ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </button>
      </div>
    )
  }

  return (
    <div className="w-full max-w-sm bg-slate-900/80 backdrop-blur-xl p-7 rounded-3xl border border-slate-800 shadow-2xl shadow-black/40">
      <div className="flex items-center gap-3 mb-1.5">
        <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-slate-100 tracking-tight">{t('demo.title')}</h3>
      </div>
      <p className="text-sm text-slate-400 mb-6">{t('demo.subtitle')}</p>

      <div className="space-y-3">
        {CREDENTIALS.map((cred) => (
          <div key={cred.roleKey} className="rounded-2xl border border-slate-800 bg-slate-800/40 p-4">
            <span className={`inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-lg border mb-1 ${cred.badge}`}>
              {t(cred.roleKey)}
            </span>
            <div className="divide-y divide-slate-800">
              <CredRow fieldKey={`${cred.roleKey}-email`} label={t('auth.email')} value={cred.email} />
              <CredRow fieldKey={`${cred.roleKey}-pass`} label={t('auth.password')} value={cred.password} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
