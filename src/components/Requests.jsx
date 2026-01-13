import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestsSlice";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function Requests() {
  const dispatch = useDispatch();
  const userRequests = useSelector((state) => state.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleRequest = async (status, id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      fetchRequests();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#020617] p-6">
      {/* <div className="min-h-screen w-full bg-gradient-to-br from-black via-[#020617] to-black p-6"> */}
      <h1 className="text-3xl font-bold text-center text-white mb-10">
        Connection Requests 🤝
      </h1>

      {userRequests?.length === 0 ? (
        <div className="text-center text-gray-400 mt-20">
          <p className="text-xl">No new requests</p>
          <p className="text-sm mt-2">
            When someone shows intrest in you, it appears here.
          </p>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto space-y-5">
          {userRequests?.map((user) => (
            <div
              key={user._id}
              className="
                flex flex-col sm:flex-row items-center
                bg-base-100/80 backdrop-blur-xl
                rounded-2xl shadow-xl
                border border-white/10
                p-4 gap-4
                hover:scale-[1.01] transition-all
                hover:shadow-pink-500/30
              "
            >
              {/* Photo */}
              <div className="avatar">
                <div className="w-20 rounded-xl ring ring-pink-500/40 ring-offset-base-100 ring-offset-2">
                  <img
                    src={
                      user?.fromUserId.photoUrl ||
                      "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"
                    }
                    alt={user?.fromUserId.firstName || "img"}
                  />
                </div>
              </div>
              {/* Info */}
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-lg font-semibold text-white">
                  {user?.fromUserId?.firstName} {user?.fromUserId?.lastName}
                  {user.age && (
                    <span className="text-sm text-gray-300 ml-1">
                      , {user?.fromUserId?.age}
                    </span>
                  )}
                </h2>
                <p className="text-sm text-gray-400 line-clamp-3">
                  {user?.fromUserId?.about || "No bio provided"}
                </p>
              </div>
              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleRequest("rejected", user._id)}
                  className="
                    btn btn-outline btn-error
                    hover:bg-error hover:text-white
                    transition-all
                  "
                >
                  <FaTimes /> Reject
                </button>

                <button
                  onClick={() => handleRequest("accepted", user._id)}
                  className="
                    btn btn-outline btn-success
                    hover:bg-success hover:text-white
                    transition-all
                  "
                >
                  <FaCheck /> Accept
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
