import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBuilding, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

import { loginSuccess } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { loginApi } from "../../apis/auth.api";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    try {
      setLoading(true);

      const res = await loginApi({ email: email, password: password });
      console.log(res);

      const { success, message, data } = res;

      if (!success) {
        toast.error(message || "Login failed");
        return;
      }

      dispatch(
        loginSuccess({
          token: data.token,
          user: data.user,
        })
      );

      toast.success("Login successful");
      navigate("/", { replace: true });
    } catch (err: any) {
      toast.error("something went wrong try again!");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-blue-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="h-14 w-14 bg-blue-600 rounded-xl flex items-center justify-center">
            <FaBuilding className="text-white text-2xl" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Corporate Bank
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Client & Credit Management System
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold transition disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
