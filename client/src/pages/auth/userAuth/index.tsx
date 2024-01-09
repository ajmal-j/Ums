import { useEffect, useState } from "react";
import Login from "../../../components/userComponent/logIn";
import SignUp from "../../../components/userComponent/signUp";
import { UserAuth } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";

export default function Authentication() {
  const [logIn, setLogIn] = useState<boolean>(true);
  const { user } = UserAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/home");
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
