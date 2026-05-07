import Authentication from "./pages/Authentication";
import "./App.css";
import { useAuth } from "./context/Authcontext";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Products from "./pages/Products";
import Analytics from "./pages/Analytics";

function App() {
  const { globalUser, isLoading } = useAuth();
  const isAuthenticated = globalUser;

  return (
  <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
    {/* 1. ESTADO NO AUTENTICADO: Centrado y limpio */}
    {!isAuthenticated && (
      <div className="min-h-screen flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md">
          <Authentication />
        </div>
      </div>
    )}

    {/* 2. ESTADO CARGANDO: Un loader elegante */}
    {isLoading && (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium animate-pulse">Loading dashboard...</p>
      </div>
    )}

    {/* 3. DASHBOARD PRINCIPAL (Autenticado) */}
    {isAuthenticated && !isLoading && (
      <div className="flex h-screen overflow-hidden">
        
        {/* Sidebar queda fijo a la izquierda */}
        <Sidebar />

        {/* Contenedor de contenido principal con scroll independiente */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-slate-50">
          <div className="container mx-auto p-4 md:p-8 lg:p-10 max-w-7xl">
            
            <ProtectedRoute canActivate={isAuthenticated} redirectPath="/">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                
                <Route
                  path="/users"
                  element={
                    <ProtectedRoute
                      canActivate={globalUser?.role === "Admin"}
                      redirectPath="/"
                    >
                      <Users />
                    </ProtectedRoute>
                  }
                />
                
                <Route path="/products" element={<Products />} />
                <Route path="/analytics" element={<Analytics />} />
              </Routes>
            </ProtectedRoute>

          </div>
        </main>
      </div>
    )}
  </div>
);
}

export default App;
