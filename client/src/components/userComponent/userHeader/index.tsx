import { useEffect, useState } from "react";
import { LuUser2 } from "react-icons/lu";
import { RiLogoutCircleLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { UserAuth } from "../../../context/userContext";
import { updateLocalStorage } from "../../../utils/helper";
import { axiosWithToken } from "../../../utils/axios";

export default function Header() {
  const [profile, setProfile] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user, setUser } = UserAuth();

  useEffect(() => {
    try {
      axiosWithToken
        .get("/userData")
        .then((response) => {
          const data = response.data.user;
          const { email, name, profile } = data;
          updateLocalStorage({ email, name, profile });
          setUser({ email, profile, name });
        })
        .catch(() => {
          localStorage.removeItem("userCredentials");
          setUser(null);
          navigate("/");
        });
    } catch (error) {
      console.log(error);
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
    <div className='h-[70px] bg-[#bfb6ff] flex justify-between items-center px-14'>
      <Link to={"/home"}>
        <span className='text-xl'>Weather App :</span>
      </Link>
      <div className='flex items-center  relative'>
        <span className='capitalize pe-3'>{user?.name}</span>
        <img
          src={user?.profile}
          alt=''
          className='w-[40px] cursor-pointer rounded-full flex-shrink-0
         h-[40px] border border-black/20 shadow-shadowFullBlack object-cover'
          onClick={() => setProfile(!profile)}
          onMouseOver={() => setProfile(true)}
        />
        {profile && (
          <div className='absolute top-full bottom-[-50px] left-auto right-5 z-30'>
            <div className='flex flex-col gap-5 bg-violet-600 rounded-xl border border-black/10 px-5 py-8'>
              <button
                className='absolute top-3 right-3 bg-violet-800 p-1 rounded-full shadow-shadowFull '
                onClick={() => setProfile(false)}
              >
                <IoMdClose className='text-red-500' />
              </button>
              <button
                className='rounded-full bg-violet-600 px-3 mt-6 py-1 text-white/90 shadow-shadowFull flex items-center gap-2 border border-white/60'
                onClick={navigateToProfile}
              >
                <LuUser2 /> Profile
              </button>
              <button
                className='rounded-full bg-violet-600 px-3 py-1  shadow-shadowFull flex items-center gap-2 text-white/90  border border-white/60'
                onClick={handleLogOut}
              >
                <RiLogoutCircleLine className='text-red-500 font-bold' /> Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
