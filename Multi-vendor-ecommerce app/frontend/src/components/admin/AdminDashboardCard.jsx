import { ArrowUpRight } from "lucide-react";

export default function AdminDashboardCard({
  title,
  value,
  icon: Icon,
  color,
}) {
  return (
    <div className="rounded-2xl bg-white dark:bg-slate-800 shadow-lg p-6 transition hover:shadow-xl">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-gray-500 dark:text-gray-400">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold dark:text-white">
            {value}
          </h2>

        </div>

        <div className={`rounded-full p-4 ${color}`}>
          <Icon className="text-white" size={28} />
        </div>

      </div>

      <div className="mt-5 flex items-center text-green-600">

        <ArrowUpRight size={18} />

        <span className="ml-2 text-sm">
          +12% this month
        </span>

      </div>

    </div>
  );
}