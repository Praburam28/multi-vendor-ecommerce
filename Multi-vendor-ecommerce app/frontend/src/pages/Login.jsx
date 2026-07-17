import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ShoppingBag } from "lucide-react";
import { toast } from "react-hot-toast";

import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);

      const res = await api.post(
        "/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      login(res.data.access_token);

      toast.success("Login Successful");

      navigate("/");
    } catch (err) {
      toast.error("Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center px-4">

      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-800 p-8 shadow-2xl">

        <div className="text-center">

          <ShoppingBag
            className="mx-auto text-indigo-600"
            size={60}
          />

          <h1 className="mt-4 text-3xl font-bold">
            Welcome Back
          </h1>

          <p className="mt-2 text-gray-500">
            Sign in to your MultiVendor account
          </p>

        </div>

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-5"
        >

          <div className="relative">

            <Mail
              className="absolute left-4 top-3 text-gray-400"
              size={20}
            />

            <input
              type="email"
              placeholder="Email"
              required
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              className="w-full rounded-xl border py-3 pl-12 pr-4 focus:border-indigo-600 outline-none"
            />

          </div>

          <div className="relative">

            <Lock
              className="absolute left-4 top-3 text-gray-400"
              size={20}
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full rounded-xl border py-3 pl-12 pr-12 focus:border-indigo-600 outline-none"
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

          <button
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 transition"
          >
            {loading ? "Signing In..." : "Login"}
          </button>

        </form>

        <div className="mt-6 text-center">

          <p className="text-gray-500">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="font-semibold text-indigo-600"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}