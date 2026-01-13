import axios from "axios";
import { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { FaEye, FaEyeSlash } from "react-icons/fa";
export default function Login() {
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );

      // console.log(res.data); // ✅ axios response
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (error) {
      setErrorMsg(error.response.data || "Something went wrong!");
    } finally {
      setLoading(false); // ✅ ALWAYS stops spinner
    }
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (error) {
      setErrorMsg(error.response?.data || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`
    relative flex flex-1 items-center justify-center
    bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#020617]
    overflow-hidden
    ${!isLogin ? "py-10" : ""}
  `}
    >
      {/* Glow blobs */}
      <div className="absolute w-96 h-96 bg-pink-500/20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

      {/* Card */}
      <div className="relative z-10 w-[90%] max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl animate-fadeIn">
        {/* Logo */}
        <h1 className="text-4xl font-extrabold text-center mb-2">
          <span className="text-pink-500">Dev</span>
          <span className="text-indigo-400">Tinder</span>
        </h1>

        <p className="text-center text-gray-400 mb-8">
          {isLogin
            ? "Match with developers, not bugs 🧑‍💻❤️"
            : "Create your DevTinder account 🚀"}
        </p>

        {/* Form */}
        <form
          onSubmit={isLogin ? handleLogin : handleSignup}
          className="space-y-5"
        >
          {!isLogin && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text text-gray-300">First Name</span>
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Elon"
                  className="input input-bordered w-full bg-black/40"
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text text-gray-300">Last Name</span>
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Musk"
                  className="input input-bordered w-full bg-black/40"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="label">
              <span className="label-text text-gray-300">Email</span>
            </label>
            <input
              type="email"
              value={emailId}
              onChange={(e) => {
                setEmailId(e.target.value);
                if (errorMsg) setErrorMsg("");
              }}
              placeholder="dev@email.com"
              className="input input-bordered w-full bg-black/40"
              required
            />
          </div>

          <div className="relative">
            <label className="label">
              <span className="label-text text-gray-300">Password</span>
            </label>

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errorMsg) setErrorMsg("");
              }}
              placeholder="••••••••"
              className="input input-bordered w-full bg-black/40 pr-12"
              required
            />

            {/* Show / Hide Icon */}
            <span
              className="absolute right-4 top-[55%] cursor-pointer text-gray-400"
              onMouseDown={() => setShowPassword(true)}
              onMouseUp={() => setShowPassword(false)}
              onMouseLeave={() => setShowPassword(false)}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
          </div>

          <button
            className="btn w-full bg-gradient-to-r from-pink-500 to-indigo-500 border-none"
            type="submit"
          >
            {loading ? (
              <span className="loading loading-spinner" />
            ) : isLogin ? (
              "Login"
            ) : (
              "Sign Up"
            )}
          </button>

          {errorMsg && <span className="text-red-500">{errorMsg}</span>}
        </form>

        <div className="divider text-gray-500">OR</div>
        {/* 
        <div className="flex gap-4">
          <button className="btn flex-1 bg-black/50">
            <FaGithub /> GitHub
          </button>
          <button className="btn flex-1 bg-black/50">
            <FaGoogle className="text-red-400" /> Google
          </button>
        </div> */}

        <p className="text-center text-sm text-gray-400 mt-6">
          {isLogin ? "New here?" : "Already have an account?"}{" "}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setErrorMsg("");
            }}
            className="text-pink-400 cursor-pointer hover:underline"
          >
            {isLogin ? "Create account" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}
