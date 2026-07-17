import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShoppingBag,
} from "lucide-react";
import { toast } from "react-hot-toast";

import api from "../api/api";

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "customer",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/auth/register", form);

      toast.success("Registration Successful");

      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error("Registration Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-4">

      <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-800 p-8 shadow-2xl">

        <div className="text-center">

          <ShoppingBag
            size={60}
            className="mx-auto text-indigo-600"
          />

          <h1 className="mt-4 text-3xl font-bold">
            Create Account
          </h1>

          <p className="mt-2 text-gray-500">
            Join MultiVendor Marketplace
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          <div className="relative">

            <User
              className="absolute left-4 top-3 text-gray-400"
              size={20}
            />

            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              required
              value={form.full_name}
              onChange={handleChange}
              className="w-full rounded-xl border py-3 pl-12 pr-4 outline-none focus:border-indigo-600"
            />

          </div>

          <div className="relative">

            <Mail
              className="absolute left-4 top-3 text-gray-400"
              size={20}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-xl border py-3 pl-12 pr-4 outline-none focus:border-indigo-600"
            />

          </div>

          <div className="relative">

            <Lock
              className="absolute left-4 top-3 text-gray-400"
              size={20}
            />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-xl border py-3 pl-12 pr-12 outline-none focus:border-indigo-600"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-3"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Register As
            </label>

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full rounded-xl border p-3 outline-none focus:border-indigo-600"
            >
              <option value="customer">
                Customer
              </option>

              <option value="vendor">
                Vendor
              </option>
            </select>

          </div>

          <button
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 transition"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

        <div className="mt-6 text-center">

          <p className="text-gray-500">

            Already have an account?{" "}

            <Link
              to="/login"
              className="font-semibold text-indigo-600"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}