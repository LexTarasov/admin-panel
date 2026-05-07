import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/Authcontext'

export default function Sidebar() {
    const { globalUser, logout } = useAuth()

    return (
        <div className="w-56 min-h-screen bg-gray-900 text-white flex flex-col transition-all">
            
            {/* Logo */}
            <div className="p-6 border-b border-gray-700">
                <h2 className="text-sm font-bold text-white">AdminPanel</h2>
            </div>

            {/* Links de navegación */}
            <nav className="flex-1 flex-col p-4 space-y-1">
                <NavLink to="/" className={({isActive})=> isActive ? "block px-3 py-2 rounded-md bg-gray-700 text-sm font-medium" : "block px-3 py-2 rounded-md hover:bg-gray-800 text-sm"}>Dashboard</NavLink>
                <NavLink to="/products" className={({isActive})=> isActive ? "block px-3 py-2 rounded-md bg-gray-700 text-sm font-medium" : "block px-3 py-2 rounded-md hover:bg-gray-800 text-sm"}>Products</NavLink>
                <NavLink to="/users" className={({isActive})=> isActive ? "block px-3 py-2 rounded-md bg-gray-700 text-sm font-medium" : "block px-3 py-2 rounded-md hover:bg-gray-800 text-sm"}>Users</NavLink>
                <NavLink to="/analytics" className={({isActive})=> isActive ? "block px-3 py-2 rounded-md bg-gray-700 text-sm font-medium" : "block px-3 py-2 rounded-md hover:bg-gray-800 text-sm"}>Analytics</NavLink>
            </nav>

            {/* Info del usuario abajo */}
            <div className="p-4 border-t border-gray-700">
                <div className="mb-3">
                    <p className="text-sm font-medium text-white">{globalUser?.name}</p>
                    <p className="text-xs text-gray-400">{globalUser?.email}</p>
                    <p className="text-xs text-gray-200">{globalUser?.role}</p>
                </div>
                <button onClick={logout} className="w-full text-sm bg-gray-700 hover:bg-gray-600 text-white py-2 px-3 rounded-lg transition-colors">
                    Cerrar sesión
                </button>
            </div>

        </div>
    )
}