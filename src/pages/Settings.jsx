import { useAuth } from '../context/Authcontext'
import { useAppConfig } from '../context/AppConfigContext'

export default function Settings() {
  const { globalUser } = useAuth()
  const { theme, language, setTheme, setLanguage, t } = useAppConfig()

  const initials = globalUser?.name
    ?.split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div className="p-4 md:p-8 bg-slate-50 dark:bg-slate-900 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          {t('settings.title')}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {t('settings.subtitle')}
        </p>
      </div>

      <div className="max-w-2xl space-y-6">

        {/* Profile */}
        <section>
          <h2 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3 px-1">
            {t('settings.profile')}
          </h2>
          <div className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200/70 dark:border-slate-700/50 shadow-lg shadow-slate-900/5 dark:shadow-black/20 p-6 flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center text-white text-lg font-bold shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-base font-bold text-slate-900 dark:text-slate-100 truncate">
                {globalUser?.name}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                {globalUser?.email}
              </p>
              <span className="inline-block mt-1.5 text-[11px] font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900 px-2.5 py-0.5 rounded-lg">
                {globalUser?.role}
              </span>
            </div>
          </div>
        </section>

        {/* Appearance */}
        <section>
          <h2 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3 px-1">
            {t('settings.appearance')}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setTheme('light')}
              className={`flex flex-col items-center gap-2.5 p-5 rounded-2xl border-2 shadow-sm transition-all duration-150 ${
                theme === 'light'
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/30'
                  : 'border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <svg className={`w-6 h-6 ${theme === 'light' ? 'text-amber-500' : 'text-slate-400 dark:text-slate-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span className={`text-sm font-semibold ${theme === 'light' ? 'text-indigo-600' : 'text-slate-600 dark:text-slate-300'}`}>
                {t('settings.light')}
              </span>
            </button>

            <button
              onClick={() => setTheme('dark')}
              className={`flex flex-col items-center gap-2.5 p-5 rounded-2xl border-2 shadow-sm transition-all duration-150 ${
                theme === 'dark'
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/30'
                  : 'border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <svg className={`w-6 h-6 ${theme === 'dark' ? 'text-indigo-500 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-300'}`}>
                {t('settings.dark')}
              </span>
            </button>
          </div>
        </section>

        {/* Language */}
        <section>
          <h2 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3 px-1">
            {t('settings.language')}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setLanguage('en')}
              className={`flex flex-col items-center gap-2.5 p-5 rounded-2xl border-2 shadow-sm transition-all duration-150 ${
                language === 'en'
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/30'
                  : 'border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <span className="text-2xl">🇺🇸</span>
              <span className={`text-sm font-semibold ${language === 'en' ? 'text-indigo-600' : 'text-slate-600 dark:text-slate-300'}`}>
                {t('settings.english')}
              </span>
            </button>

            <button
              onClick={() => setLanguage('es')}
              className={`flex flex-col items-center gap-2.5 p-5 rounded-2xl border-2 shadow-sm transition-all duration-150 ${
                language === 'es'
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/30'
                  : 'border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <span className="text-2xl">🇪🇸</span>
              <span className={`text-sm font-semibold ${language === 'es' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-300'}`}>
                {t('settings.spanish')}
              </span>
            </button>
          </div>
        </section>

      </div>
    </div>
  )
}
