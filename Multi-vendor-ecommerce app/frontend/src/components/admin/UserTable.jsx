import { Trash2 } from "lucide-react";

export default function UserTable({
  users,
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-white dark:bg-slate-800 shadow">

      <table className="min-w-full">

        <thead className="bg-indigo-600 text-white">

          <tr>

            <th className="px-5 py-3 text-left">
              Name
            </th>

            <th className="px-5 py-3 text-left">
              Email
            </th>

            <th className="px-5 py-3 text-left">
              Role
            </th>

            <th className="px-5 py-3 text-center">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {users.map((user) => (

            <tr
              key={user.id}
              className="border-b dark:border-slate-700"
            >

              <td className="px-5 py-4 dark:text-white">
                {user.full_name}
              </td>

              <td className="px-5 py-4 dark:text-white">
                {user.email}
              </td>

              <td className="px-5 py-4">
                <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm">
                  {user.role}
                </span>
              </td>

              <td className="text-center">

                <button
                  className="rounded bg-red-500 p-2 text-white hover:bg-red-600"
                >
                  <Trash2 size={18} />
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}