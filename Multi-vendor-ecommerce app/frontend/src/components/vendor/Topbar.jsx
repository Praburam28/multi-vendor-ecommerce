import { Bell, UserCircle } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Vendor Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-5">
        <Bell className="cursor-pointer text-gray-600 hover:text-indigo-600" />

        <div className="flex items-center gap-2">
          <UserCircle size={36} className="text-indigo-600" />

          <div>
            <p className="font-semibold">Vendor</p>
            <p className="text-sm text-gray-500">
              vendor@example.com
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}