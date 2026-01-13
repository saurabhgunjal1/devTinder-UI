import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

export default function Profile() {
  const userData = useSelector((state) => state.user);
  return (
    <div className="relative flex flex-1 items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#020617] overflow-hidden">
      {userData && <EditProfile userData={userData} />}
    </div>
  );
}
