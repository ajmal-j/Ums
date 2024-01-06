import { useState } from "react";
import Login from "../../components/logIn";
import SignUp from "../../components/signUp";

export default function Authentication() {
  const [logIn, setLogIn] = useState<boolean>(true);

  return (
    <div className='w-full h-screen bg-black bg-[url(/bg.svg)] bg-center bg-cover bg-no-repeat'>
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
      {logIn ? <Login /> : <SignUp />}
    </div>
  );
}
