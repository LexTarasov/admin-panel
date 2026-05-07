import { useState } from "react"
import { useAuth } from '../context/Authcontext'

export default function Authentication(props) {
  const { login, signup } = useAuth()

  const {handleCloseModal} = props


    const [isRegistration, setIsRegistration] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const[isAuthenticating, setIsAuthenticating] = useState(false)
    const [error, setError] = useState(null)

async function handleAuthenticate() {
        if (!email || !email.includes('@') || !password || password.length < 6|| isAuthenticating){
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

  return (
  <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-3xl shadow-2xl shadow-slate-200/60 border border-slate-100">
    <div className="text-center mb-10">
      {/* Icono o Logo opcional para dar identidad */}
      <div className="w-12 h-12 bg-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-indigo-200">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      <h2 className="text-3xl font-black text-slate-900 tracking-tight">
        {isRegistration ? 'Crear cuenta' : '¡Bienvenido!'}
      </h2>
      <p className="mt-2 text-sm text-slate-500 font-medium">
        {isRegistration ? 'Regístrate para comenzar' : 'Inicia sesión en tu panel administrativo'}
      </p>
    </div>

    {error && (
      <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-xs font-bold flex items-center gap-3 animate-shake">
        <span className="text-lg">⚠️</span> {error}
      </div>
    )}

    <div className="space-y-5">
      {isRegistration && (
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Nombre Completo</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
            className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-400 text-sm bg-slate-50/50"
          />
        </div>
      )}

      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Correo Electrónico</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ejemplo@correo.com"
          type="email"
          className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-400 text-sm bg-slate-50/50"
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Contraseña</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          type="password"
          className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-400 text-sm bg-slate-50/50"
        />
      </div>

      <button
        onClick={handleAuthenticate}
        disabled={isAuthenticating}
        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-100 transition-all transform active:scale-[0.97] mt-4 flex items-center justify-center gap-2"
      >
        {isAuthenticating ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Procesando...</span>
          </>
        ) : 'Continuar'}
      </button>
    </div>

    <div className="relative my-10">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-slate-100"></div>
      </div>
      <div className="relative flex justify-center text-xs font-bold uppercase tracking-widest">
        <span className="px-4 bg-white text-slate-400">o también</span>
      </div>
    </div>

    <div className="text-center">
      <p className="text-slate-500 text-sm font-medium">
        {isRegistration ? '¿Ya tienes una cuenta?' : '¿No tienes una cuenta?'}
      </p>
      <button
        onClick={() => setIsRegistration(!isRegistration)}
        className="mt-2 text-indigo-600 font-bold hover:text-indigo-800 transition-colors text-sm underline underline-offset-4 decoration-2 decoration-indigo-100 hover:decoration-indigo-600"
      >
        {isRegistration ? 'Inicia sesión aquí' : 'Crea una cuenta ahora'}
      </button>
    </div>
  </div>
)
}