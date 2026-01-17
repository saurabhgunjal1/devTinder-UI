import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

export default function Feed() {
  const feedData = useSelector((state) => state.feed);

  const dispatch = useDispatch();
  const fetchFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  if (feedData?.length <= 0) {
    return (
      <div
        className=" w-full flex flex-col items-center justify-center 
      bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#020617] 
      text-center text-gray-400"
      >
        <p className="text-2xl font-semibold">No new Users Found</p>
        <p className="text-sm mt-2 text-gray-500">
          Check back later, new developers are joining every day 🚀
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-1 items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#020617] to-[rgb(2,6,23)] overflow-hidden">
      {/* Glow blobs */}
      <div className="absolute w-96 h-96 bg-pink-500/20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>
      {/* <div className="flex items-center justify-center"> */}
      {feedData && <UserCard user={feedData[0]} fetchFeed={fetchFeed} />}
      {/* </div> */}
    </div>
  );
}
