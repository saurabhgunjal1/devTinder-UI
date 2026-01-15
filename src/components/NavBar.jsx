import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { FaBell } from "react-icons/fa";

export default function NavBar() {
  const user = useSelector((state) => state.user);
  const requestsData = useSelector((state) => state.requests);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar sticky top-0 z-50 backdrop-blur-xl bg-base-300/80 border-b border-white/10 px-4 shadow-md">
      {/* Brand */}
      <div className="flex-1">
        <Link
          to={"/"}
          className="btn btn-ghost text-xl font-extrabold tracking-wide hover:bg-transparent"
        >
          <span className="text-pink-500">
            Dev<span className="text-indigo-400">Tinder</span>
          </span>
        </Link>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-5 px-2">
        {/* Requests Icon */}
        {user && (
          <Link to="/requests">
            <button className="btn btn-ghost btn-circle">
              <div className="indicator ">
                {/* Show count only if there are requests */}
                {requestsData?.length > 0 && (
                  <span className="indicator-item badge badge-error badge-sm">
                    {requestsData.length}
                  </span>
                )}
                <FaBell className="text-2xl text-pink-400" />
              </div>
            </button>
          </Link>
        )}

        {/* Avatar dropdown */}
        <div className="dropdown dropdown-end">
          {user && (
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar hover:scale-105 transition-transform duration-300"
            >
              <div className="w-8 rounded-full ring ring-pink-500/40 ring-offset-base-100 ring-offset-2">
                <img alt="User avatar" src={user?.photoUrl} />
              </div>
            </label>
          )}

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 w-52 rounded-2xl bg-base-100/90 backdrop-blur-xl p-2 shadow-xl border border-white/10"
          >
            <li>
              <Link to={"/profile"} className="justify-between">
                Profile
              </Link>
            </li>
            <li>
              <Link to={"/connections"}>Connections</Link>
            </li>
            <li>
              <Link to={"/premium"}>Premium</Link>
            </li>

            <div className="divider my-1"></div>

            <li>
              <Link
                onClick={handleLogout}
                className="text-error hover:bg-error/10"
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
