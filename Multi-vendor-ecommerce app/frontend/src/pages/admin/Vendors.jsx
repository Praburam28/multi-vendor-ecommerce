import AdminLayout from "../../layouts/admin/AdminLayout";

export default function Vendors() {
  return (
    <AdminLayout>
      <div className="p-6">

        <h1 className="mb-6 text-4xl font-bold dark:text-white">
          Vendor Management
        </h1>

        <div className="rounded-xl bg-white p-8 shadow dark:bg-slate-800">

          <h2 className="text-2xl font-semibold dark:text-white">
            Vendor List
          </h2>

          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Vendor management module is ready.
          </p>

        </div>

      </div>
    </AdminLayout>
  );
}