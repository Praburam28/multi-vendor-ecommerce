import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Store,
  Package,
  ShoppingCart,
  BarChart3,
} from "lucide-react";

const menu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin",
  },
  {
    title: "Users",
    icon: Users,
    path: "/admin/users",
  },
  {
    title: "Vendors",
    icon: Store,
    path: "/admin/vendors",
  },
  {
    title: "Products",
    icon: Package,
    path: "/admin/products",
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    path: "/admin/orders",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    path: "/admin/analytics",
  },
];

export default function AdminSidebar() {
  return (
    <aside className="w-72 bg-indigo-700 text-white">

      <div className="border-b border-indigo-600 p-6">

        <h1 className="text-3xl font-bold">
          Admin Panel
        </h1>

      </div>

      <nav className="mt-6 flex flex-col gap-2 px-4">

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-xl px-4 py-3 transition ${
                  isActive
                    ? "bg-white text-indigo-700"
                    : "hover:bg-indigo-600"
                }`
              }
            >
              <Icon size={22} />

              {item.title}
            </NavLink>
          );
        })}

      </nav>

    </aside>
  );
}