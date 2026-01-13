import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate("/profile");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Header/Branding */}
          <div className="order-1 lg:order-1 text-center lg:text-left">
            <div className="inline-flex lg:flex items-center justify-center lg:justify-start gap-4 mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-red-500 to-pink-500 rounded-full shadow-lg">
                <svg
                  className="w-10 h-10 lg:w-12 lg:h-12 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.5 1.5H3.75A2.25 2.25 0 001.5 3.75v12.5A2.25 2.25 0 003.75 18.5h12.5a2.25 2.25 0 002.25-2.25V9.5m-15-4v10m4-10v10m4-10v10" />
                </svg>
              </div>
              <div className="lg:hidden">
                <h1 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                  DevTinder
                </h1>
                <p className="text-slate-400 text-sm mt-1">
                  Find your perfect dev match
                </p>
              </div>
            </div>

            <div className="hidden lg:block">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-4 leading-tight">
                DevTinder
              </h1>
              <p className="text-slate-400 text-lg mb-8">
                Find your perfect dev match
              </p>

              <div className="space-y-6 text-left">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      className="w-6 h-6 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Quick Connection
                    </h3>
                    <p className="text-slate-400 text-sm">
                      Find like-minded developers instantly
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      className="w-6 h-6 text-pink-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a4 4 0 100-8 4 4 0 000 8z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Smart Matching
                    </h3>
                    <p className="text-slate-400 text-sm">
                      AI-powered recommendations based on skills
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      className="w-6 h-6 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5-4a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Build Together
                    </h3>
                    <p className="text-slate-400 text-sm">
                      Collaborate on projects and grow together
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="order-2 lg:order-2">
            {/* Form Card */}
            <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 space-y-6 border border-slate-700">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Input */}
                <div className="form-control">
                  <label className="label pb-2">
                    <span className="label-text font-semibold text-slate-200">
                      Email Address
                    </span>
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="input input-bordered input-lg bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="form-control">
                  <label className="label pb-2">
                    <span className="label-text font-semibold text-slate-200">
                      Password
                    </span>
                    <a
                      href="#"
                      className="label-text-alt link link-hover text-red-500 hover:text-red-400 font-medium"
                    >
                      Forgot?
                    </a>
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="input input-bordered input-lg bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Remember Me */}
                <div className="form-control">
                  <label className="cursor-pointer label p-0">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm checkbox-primary border-slate-500"
                      defaultChecked
                    />
                    <span className="label-text ml-3 text-slate-300">
                      Keep me signed in
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-lg w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 border-none text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isLoading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Signing in...
                    </>
                  ) : (
                    "Sign In with Spark ⚡"
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="divider my-4">OR</div>

              {/* Social Login */}
              <div className="space-y-3">
                <button className="btn btn-outline w-full border-slate-600 text-slate-200 hover:bg-slate-700 hover:border-slate-500">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google
                </button>
                <button className="btn btn-outline w-full border-slate-600 text-slate-200 hover:bg-slate-700 hover:border-slate-500">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </button>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <p className="text-slate-400">
                Don't have an account?{" "}
                <a
                  href="#"
                  className="font-bold text-transparent bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text hover:opacity-80 transition-opacity"
                >
                  Create one now
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-xs text-slate-500 mt-12">
          By signing in, you agree to our{" "}
          <a href="#" className="hover:underline text-red-500">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="hover:underline text-red-500">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
