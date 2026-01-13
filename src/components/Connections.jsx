import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addConnections } from "../utils/connectionsSlice";
import { FaTimes, FaUserAstronaut } from "react-icons/fa";

export default function Connections() {
  const dispatch = useDispatch();
  const userConnections = useSelector((state) => state.connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteConnection = async (id) => {
    try {
      const res = await axios.delete(BASE_URL + "/request/remove/" + id, {
        withCredentials: true,
      });
      console.log(res);
      fetchConnections();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  // console.log(userConnections);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#020617] p-6">
      {/* <div className="min-h-screen w-full bg-gradient-to-br from-black via-[#020617] to-black p-6"> */}
      <h1 className="text-3xl font-bold text-center text-white mb-8">
        Your Connections 💖
      </h1>

      {userConnections?.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-400 mt-20">
          <p className="text-xl">No connections yet</p>
          <p className="text-sm mt-2">
            Start swiping to build your DevTinder network!
          </p>
        </div>
      ) : (
        <div
          className="
            grid grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-6
            max-w-7xl
            mx-auto
          "
        >
          {userConnections?.map((user, i) => (
            <div
              key={i}
              className="
                relative rounded-2xl overflow-hidden
                bg-base-100/80 backdrop-blur-xl
                shadow-xl border border-white/10
                hover:scale-[1.03] transition-all duration-300
                hover:shadow-pink-500/30
              "
            >
              {/* Image */}
              <div className="relative h-56 bg-black/20">
                <img
                  src={
                    user.user.photoUrl ||
                    "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"
                  }
                  alt={user.user.firstName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                {/* Name */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h2 className="text-lg font-semibold">
                    {user.user.firstName} {user.user.lastName}
                    {user.user.age && (
                      <span className="text-sm text-gray-300 ml-1">
                        , {user.user.age}
                      </span>
                    )}
                  </h2>
                  <p className="text-xs text-gray-300 flex items-center gap-1">
                    <FaUserAstronaut /> {user.user.gender}
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="p-4">
                <p className="text-gray-400 text-sm line-clamp-2">
                  {user.user.about || "No bio provided"}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {(user.user.skills || []).slice(0, 3).map((skill, idx) => (
                    <span
                      key={idx}
                      className="
                        badge badge-outline badge-secondary
                        text-xs
                      "
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 mt-4 w-full">
                  <button
                    onClick={() => handleDeleteConnection(user.connectionId)}
                    className="
      /* Layout: Full width on mobile, auto width on tablets+ */
      flex-1 sm:flex-none
      flex items-center justify-center gap-2 
      px-4 py-2 sm:px-6 
      
      /* Styling */
      btn btn-error rounded-xl shadow-md
      border-none transition-all duration-200
      
      /* Typography: Smaller text on mobile to prevent wrapping */
      text-sm sm:text-base md:text-lg font-medium
      
      /* Interaction */
      hover:scale-105 active:scale-95
    "
                  >
                    <FaTimes className="text-sm sm:text-base" />
                    <span className="whitespace-nowrap">Remove Connection</span>
                  </button>
                </div>
              </div>

              {/* Glow Border */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none ring-1 ring-pink-500/20"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
