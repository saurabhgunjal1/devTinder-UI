import axios from "axios";
import { FaHeart, FaTimes, FaUserAstronaut } from "react-icons/fa";
import { BASE_URL } from "../utils/constants";

export default function UserCard({ user, fetchFeed }) {
  // console.log(user);
  const handleRequest = async (status, id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      fetchFeed();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="relative bg-base-100 shadow-2xl rounded-3xl overflow-hidden 
      w-full max-w-sm  transition-all duration-500 
      hover:scale-[1.02] hover:shadow-pink-500/40"
    >
      {/* Image Section */}
      <figure className="relative h-[320px] bg-black/20">
        {" "}
        {/* Added background to fill gaps if any */}
        <img
          src={user?.photoUrl}
          alt={user?.firstName}
          /* Changed object-cover to object-contain */
          /* Added max-h-full to ensure it stays within the figure bounds */
          className="w-full h-full object-fit object-center"
        />
        {/* Dark gradient - slightly adjusted for better visibility with object-contain */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        {/* Name overlay */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h2 className="text-2xl font-bold flex items-center gap-2 drop-shadow-md">
            {user?.firstName} {user?.lastName}
            {user?.age && (
              <span className="text-sm text-gray-300">, {user?.age}</span>
            )}
          </h2>
          <p className="text-sm text-gray-300 flex items-center gap-1 drop-shadow-md">
            <FaUserAstronaut /> {user?.gender}
          </p>
        </div>
      </figure>

      {/* Body */}
      <div className="flex flex-col justify-between  p-4">
        {/* About */}
        <p className="text-gray-400 text-sm line-clamp-2">{user?.about}</p>

        {/* Skills */}
        {/* <div className="flex flex-wrap gap-2 mt-1">
          {(user?.skills || []).slice(0, 4).map((skill, i) => (
            <span
              key={i}
              className="badge badge-outline badge-secondary px-3 py-2 text-xs"
            >
              {skill}
            </span>
          ))}
        </div> */}

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => handleRequest("ignored", user._id)}
            className="flex-1 btn btn-error text-white text-lg 
              rounded-xl hover:scale-105 transition-all shadow-lg"
          >
            <FaTimes size={22} />
            Reject
          </button>

          <button
            onClick={() => handleRequest("intrested", user._id)}
            className="flex-1 btn btn-success text-white text-lg 
              rounded-xl hover:scale-105 transition-all shadow-lg"
          >
            <FaHeart size={22} />
            Intrested
          </button>
        </div>
      </div>

      {/* Glow border */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none 
        ring-1 ring-pink-500/30 animate-pulse"
      ></div>
    </div>
  );
}
