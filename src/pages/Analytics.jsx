import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import api from "../utils/axios";
import { useAppConfig } from "../context/AppConfigContext";

// colores para el pie chart
const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

export default function Analytics() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useAppConfig();

  // aquí irá el fetchData que haremos después
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/api:HQaAbRYz/products");
      setProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error al cargar productos:", error.message); // Usar console.error para errores
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/api:HQaAbRYz/user");
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error al cargar users:", error.message); // Usar console.error para errores
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchUsers();
  }, []);

  // datos calculados para las gráficas

  const grouped = products.reduce((accumulator, product) => {
    const category = product.category

    if (accumulator[category]) {
        // si la categoría ya existe, suma 1
        accumulator[category] += 1
    } else {
        // si no existe, la crea con 1
        accumulator[category] = 1
    }

    return accumulator
  }, {})

  const productsByCategory = Object.entries(grouped).map(([category, total]) => ({
    category: category,
    total: total
  }));

  const usersGrouped = users.reduce((accumulator, user) => {
    const role = user.role

    if (accumulator[role]) {
        // si la categoría ya existe, suma 1
        accumulator[role] += 1
    } else {
        // si no existe, la crea con 1
        accumulator[role] = 1
    }

    return accumulator
  }, {})

  const usersByRole = Object.entries(usersGrouped).map(([role, total]) => ({
    category: role,
    total: total
  }));

  const usersGroupedByStatus = users.reduce((accumulator, user) => {
    const status = user.is_active ? "Activo" : "Inactivo";

    if (accumulator[status]) {
        accumulator[status] += 1;
    } else {
        accumulator[status] = 1;
    }

    return accumulator;
  }, {});

  const usersByStatus = Object.entries(usersGroupedByStatus).map(([status, total]) => ({
    status: status,
    total: total
  }));

  return (
    <div className="flex-1 p-8 bg-gray-50 dark:bg-slate-900 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">{t('analytics.title')}</h1>
        <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
          {t('analytics.subtitle')}
        </p>
      </div>

      {isLoading ? (
        <p className="text-gray-400">{t('analytics.loading')}</p>
      ) : (
        <div className="space-y-8">
          {/* Fila 1 — dos gráficas lado a lado */}
          <div className="grid grid-cols-2 gap-8">

            {/* Gráfica 1 — Productos por categoría */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-200 mb-6">
                {t('analytics.productsByCategory')}
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={productsByCategory}>
                  <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total" radius={[4, 4, 0, 0]}>
                    {productsByCategory.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Gráfica 2 — Usuarios por rol */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-200 mb-6">
                {t('analytics.roleDistribution')}
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={usersByRole}
                    dataKey="total"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {usersByRole.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.category === "Admin" ? "#10b981" : "#f59e0b"}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

          </div>

          {/* Fila 2 — gráfica de status usuarios, mitad del ancho */}
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-200 mb-6">
                {t('analytics.activeVsInactive')}
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={usersByStatus}>
                  <XAxis dataKey="status" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total" radius={[4, 4, 0, 0]}>
                    {usersByStatus.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.status === "Activo" ? "#10b981" : "#ef4444"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
