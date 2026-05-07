import { useData } from "../context/DataContext";

export default function Dashboard() {
  const { products, users, isLoading } = useData();

  const totalProducts = products.length;
  const totalUsers = users.length;
  const lowStock = products.filter((product) => product.stock < 10).length;
  const activeUsers = users.filter((user) => user.is_active).length;

  const cards = [
    {
      title: "Products",
      value: totalProducts,
      icon: "📦",
      color: "bg-blue-500",
    },
    {
      title: "Users",
      value: totalUsers,
      icon: "👥",
      color: "bg-purple-500",
    },
    {
      title: "Low Stock",
      value: lowStock,
      icon: "⚠️",
      color: "bg-yellow-500",
    },
    {
      title: "Active Users",
      value: activeUsers,
      icon: "✅",
      color: "bg-green-500",
    },
  ];

  if (isLoading) return <p className="p-8 text-gray-400">Loading...</p>;

  return (
    <div className="flex-1 p-4 md:p-8 bg-slate-50 min-h-screen font-sans">
      {/* Header Section */}
      <div className="mb-10">
        <h1 className="text-2xl text-slate-900 font-bold tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          General overview of your platform
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 group w-auto min-w-0"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300 shrink-0">
                {card.icon}
              </div>

              {/* Tag / Badge */}
              <span
                className={`${card.color} text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-lg shadow-sm`}
              >
                {card.title}
              </span>
            </div>

            <div className="space-y-1">
              <p className="text-3xl font-black text-slate-900 tracking-tight">
                {card.value}
              </p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Total {card.title}
              </p>
            </div>

            {/* Decorative element for a pro look */}
            <div className="mt-4 pt-4 border-t border-slate-50 flex items-center text-[11px] font-medium text-emerald-600"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
