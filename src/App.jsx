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

  if (isLoading) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center gap-4 bg-slate-950">
        <div className="w-9 h-9 border-4 border-slate-700 border-t-indigo-500 rounded-full animate-spin" />
        <p className="text-slate-500 text-sm font-medium tracking-wide">Loading...</p>
      </div>
    );
  }

  if (!globalUser) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-slate-950 p-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/40 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="relative w-full max-w-md">
          <Authentication handleCloseModal={() => {}} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full overflow-hidden bg-slate-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto scrollbar-hide">
        <ProtectedRoute canActivate={!!globalUser} redirectPath="/">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/users"
              element={
                <ProtectedRoute canActivate={globalUser?.role === "Admin"} redirectPath="/">
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route path="/products" element={<Products />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </ProtectedRoute>
      </main>
    </div>
  );
}

export default App;
