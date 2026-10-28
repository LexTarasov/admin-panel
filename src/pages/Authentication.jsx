import { useState } from "react"
import { useAuth } from '../context/Authcontext'
import { useAppConfig } from '../context/AppConfigContext'

export default function Authentication(props) {
  const { login, signup } = useAuth()
  const { t } = useAppConfig()

  const {handleCloseModal, isRegistration, setIsRegistration} = props

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [error, setError] = useState(null)

  async function handleAuthenticate() {
    if (!email || !email.includes('@') || !password || password.length < 6 || isAuthenticating){
      return
    }
    try {
      setIsAuthenticating(true)
      setError(null)

      if (isRegistration) {
        // register a user
        await signup(email, password, name)
      } else {
        // login a user
        await login(email, password)
      }
      handleCloseModal()
    } catch (err) {
      console.log(err.message)
      setError(err.message)
    } finally {
      setIsAuthenticating(false)
    }
  }

  // enviar el formulario al presionar Enter
  function handleKeyDown(e) {
    if (e.key === 'Enter') handleAuthenticate()
  }

  // estilo compartido de los inputs (siempre en modo oscuro)
  const inputClass = "w-full pl-11 pr-4 py-3 rounded-xl bg-slate-800/40 border border-slate-700 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15 outline-none transition-all placeholder:text-slate-500 text-sm text-slate-100"

  return (
  <div className="w-full max-w-sm bg-slate-900/80 backdrop-blur-xl p-7 sm:p-8 rounded-3xl shadow-2xl shadow-black/40 border border-slate-800">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-slate-100 tracking-tight">
        {isRegistration ? t('auth.createAccount') : t('auth.welcome')}
      </h2>
      <p className="mt-1.5 text-sm text-slate-400">
        {isRegistration ? t('auth.signUpSubtitle') : t('auth.signInSubtitle')}
      </p>
    </div>

    <div className="h-px bg-slate-800 my-6" />

    {error && (
      <div className="mb-5 p-3.5 bg-rose-950/40 border border-rose-900/60 text-rose-400 rounded-xl text-xs font-semibold flex items-center gap-2.5">
        <span className="text-base">⚠️</span> {error}
      </div>
    )}

    <div className="space-y-5">
      {isRegistration && (
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-200">
            {t('auth.fullName')}<span className="text-indigo-400"> *</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('auth.yourName')}
              className={inputClass}
            />
          </div>
        </div>
      )}

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-200">
          {t('auth.email')}<span className="text-indigo-400"> *</span>
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="you@example.com"
            type="email"
            className={inputClass}
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-semibold text-slate-200">
            {t('auth.password')}<span className="text-indigo-400"> *</span>
          </label>
          {!isRegistration && (
            <button type="button" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">
              Forgot password?
            </button>
          )}
        </div>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </span>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="••••••••••"
            type={showPassword ? "text" : "password"}
            className={inputClass + " pr-11"}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-500 hover:text-slate-300 transition-colors"
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <button
        onClick={handleAuthenticate}
        disabled={isAuthenticating}
        className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all transform active:scale-[0.98] mt-1 flex items-center justify-center gap-2"
      >
        {isAuthenticating ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>{t('auth.processing')}</span>
          </>
        ) : (isRegistration ? t('auth.continue') : 'Login')}
      </button>
    </div>

    <div className="mt-7 text-center">
      <p className="text-sm text-slate-500">
        {isRegistration ? t('auth.alreadyHaveAccount') : t('auth.noAccount')}{' '}
        <button
          onClick={() => setIsRegistration(!isRegistration)}
          className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors"
        >
          {isRegistration ? t('auth.signInHere') : t('auth.createNow')}
        </button>
      </p>
    </div>
  </div>
)
}
