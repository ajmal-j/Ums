import { useEffect, useState } from "react";
import Login from "../../../components/userComponent/logIn";
import SignUp from "../../../components/userComponent/signUp";
import { useNavigate } from "react-router-dom";
import { getLocalStorage } from "../../../utils/helper";

export default function Authentication() {
  const [logIn, setLogIn] = useState<boolean>(true);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const user = getLocalStorage();
      if (user) {
        navigate("/home");
      }
    } catch (error: any) {
      console.log(error.message);
      navigate('/')
    }
  }, []);

  return (
    <div className='w-full h-screen bg-[url(/bg.svg)] bg-center bg-cover bg-no-repeat'>
      <div className='flex justify-around p-5 pt-10'>
        <button
          className={`px-3 py-2 ${
            logIn
              ? "bg-violet-700 text-white text-[17px] shadow-md shadow-black/30 "
              : ""
          } rounded-full`}
          onClick={() => setLogIn(true)}
        >
          Log In
        </button>
        <button
          className={`px-3 py-2 ${
            !logIn
              ? "bg-violet-700 text-white text-[17px] shadow-md shadow-black/30 "
              : ""
          } rounded-full`}
          onClick={() => setLogIn(false)}
        >
          Sign Up
        </button>
      </div>
      {logIn ? <Login /> : <SignUp setLogIn={setLogIn} />}
    </div>
  );
}
