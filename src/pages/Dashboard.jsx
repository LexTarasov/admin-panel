import { useData } from "../context/DataContext";
import { useAppConfig } from "../context/AppConfigContext";

// iconos de linea limpios para cada metrica
const icons = {
  products: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  users: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a3 3 0 10-2.5-1.34" />
    </svg>
  ),
  lowStock: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    </svg>
  ),
  activeUsers: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export default function Dashboard() {
  const { products, users, isLoading } = useData();
  const { t } = useAppConfig();

  const totalProducts = products.length;
  const totalUsers = users.length;
  const lowStock = products.filter((product) => product.stock < 10).length;
  const activeUsers = users.filter((user) => user.is_active).length;

  const cards = [
    { title: t('dashboard.products'), value: totalProducts, icon: icons.products, iconBg: "bg-indigo-500/10", iconText: "text-indigo-500 dark:text-indigo-400" },
    { title: t('dashboard.users'), value: totalUsers, icon: icons.users, iconBg: "bg-violet-500/10", iconText: "text-violet-500 dark:text-violet-400" },
    { title: t('dashboard.lowStock'), value: lowStock, icon: icons.lowStock, iconBg: "bg-amber-500/10", iconText: "text-amber-500 dark:text-amber-400" },
    { title: t('dashboard.activeUsers'), value: activeUsers, icon: icons.activeUsers, iconBg: "bg-emerald-500/10", iconText: "text-emerald-500 dark:text-emerald-400" },
  ];

  if (isLoading) return <p className="p-8 text-gray-400">{t('dashboard.loading')}</p>;

  return (
    <div className="flex-1 p-4 md:p-8 bg-slate-50 dark:bg-slate-900 min-h-screen font-sans">
      {/* Header Section */}
      <div className="mb-10">
        <h1 className="text-2xl text-slate-900 dark:text-slate-100 font-bold tracking-tight">
          {t('dashboard.title')}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {t('dashboard.subtitle')}
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200/70 dark:border-slate-700/50 shadow-lg shadow-slate-900/5 dark:shadow-black/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            {/* Icon Container */}
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${card.iconBg} ${card.iconText}`}>
              {card.icon}
            </div>

            <p className="mt-5 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              {card.title}
            </p>
            <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
