import { Bell, UserCircle } from "lucide-react";

export default function AdminTopbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8 shadow dark:border-slate-700 dark:bg-slate-900">

      <div>

        <h2 className="text-3xl font-bold dark:text-white">
          Dashboard
        </h2>

      </div>

      <div className="flex items-center gap-6">

        <Bell
          className="cursor-pointer dark:text-white"
          size={22}
        />

        <div className="flex items-center gap-3">

          <UserCircle
            size={40}
            className="text-indigo-600"
          />

          <div>

            <h3 className="font-semibold dark:text-white">
              Administrator
            </h3>

            <p className="text-sm text-gray-500">
              admin@multivendor.com
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}