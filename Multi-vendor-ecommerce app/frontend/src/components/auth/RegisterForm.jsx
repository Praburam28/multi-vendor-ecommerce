import { useState } from "react";
import { registerUser } from "../../services/authService";
import toast from "react-hot-toast";

export default function RegisterForm() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "Customer",
  });

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(form);

      toast.success("Registration Successful");
    } catch {
      toast.error("Registration Failed");
    }
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-4"
    >
      <input
        name="full_name"
        className="w-full rounded-xl border p-3"
        placeholder="Full Name"
        onChange={change}
      />

      <input
        name="email"
        className="w-full rounded-xl border p-3"
        placeholder="Email"
        onChange={change}
      />

      <input
        type="password"
        name="password"
        className="w-full rounded-xl border p-3"
        placeholder="Password"
        onChange={change}
      />

      <select
        name="role"
        onChange={change}
        className="w-full rounded-xl border p-3"
      >
        <option>Customer</option>
        <option>Vendor</option>
      </select>

      <button className="w-full rounded-xl bg-green-600 py-3 text-white">
        Register
      </button>
    </form>
  );
}