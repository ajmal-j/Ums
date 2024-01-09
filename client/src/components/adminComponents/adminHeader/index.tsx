import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { axiosWithAdminToken } from "../../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { AdminReduxType, setAdmin } from "../../../redux/reducers/admin";

export default function AdminHeader() {
  const [profile, setProfile] = useState<boolean>(false);
  const navigate = useNavigate();
  const adminReducer = useSelector(
    (state: { adminReducer: AdminReduxType }) => state.adminReducer
  );
  const dispatch = useDispatch();

  const handleLogOut = () => {
    try {
      localStorage.removeItem("adminCredentials");
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    axiosWithAdminToken
      .get("/adminData")
      .then((response: any) => {
        const data = response.data;
        if (data) {
          dispatch(setAdmin(data));
        }
      })
      .catch((error: Error) => {
        if (error?.message === "AdminData not found") {
          navigate("/admin");
        } else {
          console.log(error);
        }
      });
  }, []);
  return (
    <div className='h-[70px] bg-violet-200 flex justify-between items-center px-14'>
      <Link to={"/admin/dashboard"}>
        <span className='text-xl'>User Management System :</span>
      </Link>
      <div className='flex items-center  relative'>
        <span className='capitalize pe-3'>{adminReducer?.name}</span>
        <img
          src={adminReducer?.profile}
          alt=''
          className='w-[40px] cursor-pointer rounded-full flex-shrink-0
         h-[40px] border border-black/20 shadow-shadowFullBlack object-cover'
          onClick={() => setProfile(!profile)}
        />
        {profile && (
          <div className='absolute top-full bottom-[-50px] left-auto right-5 z-20'>
            <div className='flex flex-col gap-5 bg-violet-600 rounded-xl border border-black/10 px-5 py-8'>
              <button
                className='absolute top-3 right-3 bg-violet-800 p-1 rounded-full shadow-shadowFull '
                onClick={() => setProfile(false)}
              >
                <IoMdClose className='text-red-500' />
              </button>
              {/* <button
                className='rounded-full bg-violet-600 px-3 mt-6 py-1 text-white/90 shadow-shadowFull flex items-center gap-2 border border-white/60'
                // onClick={navigateToProfile}
              >
                <LuUser2 /> Profile
              </button> */}
              <button
                className='rounded-full mt-6 bg-violet-600 px-3 py-1  shadow-shadowFull flex items-center gap-2 text-white/90  border border-white/60'
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
