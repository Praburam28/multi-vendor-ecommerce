import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/admin/AdminLayout";
import UserTable from "../../components/admin/UserTable";

import { getUsers } from "../../services/adminService";

export default function Users() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {

      const data = await getUsers();

      setUsers(data);

    } catch (err) {
      console.error(err);
    }
  }

  return (
    <AdminLayout>

      <div className="mb-8 flex items-center justify-between">

        <h1 className="text-4xl font-bold dark:text-white">

          Users

        </h1>

      </div>

      <UserTable users={users} />

    </AdminLayout>
  );
}