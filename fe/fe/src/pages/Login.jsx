import { useState } from "react";
import API_URL from "../config/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {

      const res = await axios.post(
        `${API_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      navigate("/");

    } catch (error) {

      alert("Invalid Credentials");
      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-[#f4f4f5] flex items-center justify-center px-6 relative">

      {loading && (

        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">

          <div className="w-14 h-14 border-4 border-zinc-300 border-t-zinc-900 rounded-full animate-spin"></div>

          <h2 className="mt-6 text-2xl font-semibold text-zinc-900">
            Signing you in...
          </h2>

          <p className="mt-2 text-zinc-500 text-center max-w-sm">
            
            This may take a few moments if the server is waking up.
          </p>

        </div>

      )}

      <div className="w-full max-w-md">

        <div className="bg-white border border-zinc-200 rounded-[40px] p-10 shadow-sm">

          <div className="mb-10 text-center">

            <h1 className="text-5xl font-bold tracking-tight text-zinc-900">
              Welcome Back
            </h1>

            <p className="text-zinc-500 mt-3 text-lg">
              Login to continue
            </p>

          </div>

          <form
            onSubmit={handleLogin}
            className="space-y-6"
          >

            <div>

              <label className="block text-sm font-medium text-zinc-600 mb-3">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                disabled={loading}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full bg-zinc-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-zinc-300 text-zinc-900 disabled:opacity-60"
              />

            </div>

            <div>

              <label className="block text-sm font-medium text-zinc-600 mb-3">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                disabled={loading}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full bg-zinc-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-zinc-300 text-zinc-900 disabled:opacity-60"
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-zinc-900 hover:bg-black disabled:bg-zinc-700 disabled:cursor-not-allowed text-white py-4 rounded-2xl text-lg font-semibold transition-all duration-300"
            >

              {loading
                ? "Signing in..."
                : "Login"}

            </button>

          </form>

        </div>

      </div>

    </div>

  );

}

export default Login;
