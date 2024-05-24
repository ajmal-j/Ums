import { useState } from "react";
import { LogInType } from "../logIn";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

type LogInFormType = {
  handleLogIn: (e: React.FormEvent) => void;
  state: LogInType;
  onKeyDown: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
};

export default function LogInForm({
  handleLogIn,
  state,
  onKeyDown,
  title,
}: LogInFormType) {
  const [show, setShow] = useState<boolean>(false);
  return (
    <main>
      <div className='w-full'>
        <div className='flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24'>
          <div className='mx-auto max-w-[450px] w-full bg-white/40 backdrop-blur-lg py-24 px-5 border border-black/20 rounded-2xl '>
            <h2 className='text-3xl font-bold leading-tight text-black sm:text-4xl customFont'>
              {title}
            </h2>
            <form onSubmit={handleLogIn} className='mt-8'>
              <div className='space-y-5'>
                <div>
                  <label
                    htmlFor=''
                    className='text-base font-medium text-gray-900'
                  >
                    Email address
                  </label>
                  <div className='mt-2'>
                    <input
                      className='flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
                      type='email'
                      id='email'
                      value={state.email}
                      name='email'
                      placeholder='Email'
                      onChange={onKeyDown}
                    ></input>
                    <span className='text-red-600 text-sm block mb-2'>
                      &nbsp;
                    </span>
                  </div>
                </div>
                <div>
                  <div className='flex items-center justify-between'>
                    <label
                      htmlFor=''
                      className='text-base font-medium text-gray-900'
                    >
                      Password
                    </label>
                    <span
                      onClick={() => setShow(show ? false : true)}
                      className='ms-auto cursor-pointer text-lg'
                    >
                      {show ? <FaRegEye /> : <FaRegEyeSlash />}
                    </span>
                  </div>
                  <div className='mt-2'>
                    <input
                      className='flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
                      name='password'
                      id='password'
                      value={state.password}
                      type={show ? "text" : "password"}
                      placeholder='Password'
                      onChange={onKeyDown}
                      onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e?.key === "Enter") {
                          handleLogIn(e);
                        }
                      }}
                    ></input>
                    <span className='text-red-600 text-sm block mb-2'>
                      &nbsp;
                    </span>
                  </div>
                </div>
                <div>
                  <button
                    type='button'
                    onClick={handleLogIn}
                    className='inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80'
                  >
                    Get started <span className='ml-2' />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
