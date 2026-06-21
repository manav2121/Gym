import { useState }
from "react";

import axios from "axios";

import {
  useNavigate,
} from "react-router-dom";

function Login() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate =
    useNavigate();

  const handleLogin =
  async (e) => {

    e.preventDefault();

    try {

      const res =
        await axios.post(
          "http://localhost:5000/api/auth/login",
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

      alert(
        "Invalid Credentials"
      );
    }
  };

  return (

    <div className="min-h-screen bg-[#f4f4f5] flex items-center justify-center px-6">

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
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                className="w-full bg-zinc-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-zinc-300 text-zinc-900"
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
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                className="w-full bg-zinc-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-zinc-300 text-zinc-900"
              />

            </div>

            <button
              type="submit"
              className="w-full bg-zinc-900 hover:bg-black text-white py-4 rounded-2xl text-lg font-semibold transition-all duration-300"
            >

              Login

            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Login;