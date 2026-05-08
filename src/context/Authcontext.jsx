import { useState, useEffect, useContext, createContext } from 'react'
import api from '../utils/axios'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider(props) {
    const { children } = props
    const [globalUser, setGlobalUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true) // true desde el inicio, explicación abajo

    async function signup(email, password, name) {
        try {
            const response = await api.post('/api:p6ipo4ad/auth/signup', { email, password, name })
            const { authToken } = response.data
            localStorage.setItem('authToken', authToken)
            await fetchCurrentUser(authToken)
        } catch (err) {
            const message = err.response?.data?.message ?? err.message
            throw new Error(message, { cause: err })
        }
    }

    async function login(email, password) {
        try {
            const response = await api.post('/api:p6ipo4ad/auth/login', { email, password })
            const { authToken } = response.data
            localStorage.setItem('authToken', authToken)
            await fetchCurrentUser(authToken)
        } catch (err) {
            const message = err.response?.data?.message ?? err.message
            throw new Error(message, { cause: err })
        }
    }

    function logout() {
        localStorage.removeItem('authToken')
        setGlobalUser(null)
    }

    // función separada para reusar en login, signup y useEffect
    async function fetchCurrentUser(token) {
        try {
            const response = await api.get('/api:p6ipo4ad/auth/me', {
                headers: { Authorization: `Bearer ${token}` }
            })
            setGlobalUser(response.data)
            console.log(response.data)
        } catch (err) {
            // si el token es inválido o expiró, limpiamos todo
            console.log(err.message)
            localStorage.removeItem('authToken')
            setGlobalUser(null)
        }
    }

    // este efecto corre una sola vez al cargar la app
    // su único trabajo es ver si ya había una sesión activa
    useEffect(() => {
        const token = localStorage.getItem('authToken')

        if (!token) {
            setIsLoading(false) // no hay token, no hay nada que verificar
            return
        }

        // si hay token, verificamos que siga siendo válido
        fetchCurrentUser(token).finally(() => setIsLoading(false))
    }, [])

    const value = { globalUser, isLoading, signup, login, logout }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}