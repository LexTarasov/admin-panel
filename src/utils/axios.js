import axios from 'axios'

const api = axios.create({
  baseURL: 'https://x8ki-letl-twmt.n7.xano.io',
})
//esto se ejecutara antes de cada request 
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken')
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    
    return config // importante siempre retornar config
})
export default api