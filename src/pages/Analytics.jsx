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
  CartesianGrid,
} from "recharts";
import api from "../utils/axios";
import { useAppConfig } from "../context/AppConfigContext";

// paleta categorica validada (azul, naranja, aqua, amarillo)
const COLORS = ["#3987e5", "#d95926", "#199e70", "#c98500"];

// estilos compartidos para que las graficas se vean consistentes y limpias
const AXIS_TICK = { fontSize: 11, fill: "#94a3b8" };
const TOOLTIP_PROPS = {
  contentStyle: {
    background: "#0f172a",
    border: "1px solid #334155",
    borderRadius: 12,
    fontSize: 12,
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
  },
  labelStyle: { color: "#94a3b8", fontWeight: 600, marginBottom: 4 },
  itemStyle: { color: "#e2e8f0" },
  cursor: { fill: "rgba(148,163,184,0.08)" },
};

// tarjeta flotante igual que el resto de la app
const CARD_CLASS =
  "bg-white dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-200/70 dark:border-slate-700/50 shadow-lg shadow-slate-900/5 dark:shadow-black/20";
const TITLE_CLASS =
  "text-sm font-semibold text-slate-700 dark:text-slate-200 mb-4";

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
        /* Las tres graficas en una sola fila */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {/* Gráfica 1 — Productos por categoría */}
          <div className={CARD_CLASS}>
            <h2 className={TITLE_CLASS}>{t('analytics.productsByCategory')}</h2>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={productsByCategory} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#64748b" strokeOpacity={0.15} />
                <XAxis dataKey="category" tick={AXIS_TICK} axisLine={false} tickLine={false} />
                <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} allowDecimals={false} width={32} />
                <Tooltip {...TOOLTIP_PROPS} />
                <Bar dataKey="total" radius={[6, 6, 0, 0]} maxBarSize={56}>
                  {productsByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfica 2 — Usuarios por rol (donut) */}
          <div className={CARD_CLASS}>
            <h2 className={TITLE_CLASS}>{t('analytics.roleDistribution')}</h2>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={usersByRole}
                  dataKey="total"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={82}
                  paddingAngle={2}
                  stroke="none"
                  label={({ value }) => value}
                >
                  {usersByRole.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.category === "Admin" ? COLORS[2] : COLORS[1]}
                    />
                  ))}
                </Pie>
                <Tooltip {...TOOLTIP_PROPS} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfica 3 — Usuarios activos vs inactivos */}
          <div className={CARD_CLASS}>
            <h2 className={TITLE_CLASS}>{t('analytics.activeVsInactive')}</h2>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={usersByStatus} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#64748b" strokeOpacity={0.15} />
                <XAxis dataKey="status" tick={AXIS_TICK} axisLine={false} tickLine={false} />
                <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} allowDecimals={false} width={32} />
                <Tooltip {...TOOLTIP_PROPS} />
                <Bar dataKey="total" radius={[6, 6, 0, 0]} maxBarSize={56}>
                  {usersByStatus.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.status === "Activo" ? COLORS[2] : "#e66767"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>
      )}
    </div>
  );
}
