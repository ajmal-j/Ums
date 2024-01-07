import { useEffect, useState } from "react";
import { LuUser2 } from "react-icons/lu";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { UserAuth } from "../../context/userContext";
import { getLocalStorage } from "../../utils/helper";

export default function Header() {
  const [profile, setProfile] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user, setUser, updateUserDataInContext } = UserAuth();
  useEffect(() => {
    try {
      getLocalStorage();
      updateUserDataInContext();
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  }, []);
  const handleLogOut = () => {
    try {
      localStorage.removeItem("userCredentials");
      setUser(null);
      toast.success("Logout successful.");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const navigateToProfile = () => {
    setProfile(false);
    navigate("profile");
  };
  return (
    <div className='h-[100px] bg-white/70 flex justify-between items-center px-14'>
      <Link to={"/home"}>
        <span className='text-xl'>User Management System :</span>
      </Link>
      <div className='flex items-center  relative'>
        <span className='capitalize pe-3'>{user?.name}</span>
        <img
          src={user?.profile}
          alt=''
          className='w-[40px] cursor-pointer rounded-full flex-shrink-0
         h-[40px] border border-black/20 shadow-shadowFullBlack object-cover'
          onClick={() => setProfile(!profile)}
        />
        {profile && (
          <div className='absolute top-full bottom-[-50px] left-auto right-5'>
            <div className='flex flex-col gap-3 bg-violet-400 rounded-2xl border border-black/10 px-5 py-8'>
              <button
                className='rounded-full bg-violet-600 px-3 py-1 text-white/90 shadow-shadowFull flex items-center gap-2 border border-white/60'
                onClick={navigateToProfile}
              >
                <LuUser2 /> Profile
              </button>
              <button
                className='rounded-full bg-violet-600 px-3 py-1  shadow-shadowFull flex items-center gap-2 text-red-600  font-bold border border-white/60'
                onClick={handleLogOut}
              >
                <RiLogoutCircleLine /> Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
