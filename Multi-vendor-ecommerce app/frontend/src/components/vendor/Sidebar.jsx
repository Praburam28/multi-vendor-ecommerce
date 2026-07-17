import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  LogOut,
} from "lucide-react";

const menu = [
  {
    name: "Dashboard",
    path: "/vendor",
    icon: LayoutDashboard,
  },
  {
    name: "Products",
    path: "/vendor/products",
    icon: Package,
  },
  {
    name: "Orders",
    path: "/vendor/orders",
    icon: ShoppingCart,
  },
  {
    name: "Analytics",
    path: "/vendor/analytics",
    icon: BarChart3,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-indigo-700 text-white shadow-lg">
      <div className="p-6 text-2xl font-bold border-b border-indigo-600">
        Vendor Panel
      </div>

      <nav className="mt-6 flex flex-col gap-2 px-3">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                  isActive
                    ? "bg-white text-indigo-700"
                    : "hover:bg-indigo-600"
                }`
              }
            >
              <Icon size={20} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="absolute bottom-6 left-4">
        <button className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 hover:bg-red-600">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}