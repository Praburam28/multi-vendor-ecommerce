import { useState } from "react";
import { loginUser } from "../../services/authService";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function LoginForm() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await loginUser(email, password);

      login(data.access_token);

      toast.success("Login Successful");

      navigate("/");
    } catch {
      toast.error("Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-5"
    >
      <input
        className="w-full rounded-xl border p-3"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        className="w-full rounded-xl border p-3"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button
        disabled={loading}
        className="w-full rounded-xl bg-indigo-600 py-3 text-white"
      >
        {loading ? "Signing In..." : "Login"}
      </button>
    </form>
  );
}