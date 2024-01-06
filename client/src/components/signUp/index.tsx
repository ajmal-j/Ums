import { useState } from "react";
import { LogInType } from "../logIn";

type SignUpType = {
  confirmPassword: string;
  name: string;
} & LogInType;

export default function SignUp() {
  const [show, setShow] = useState<boolean>(false);
  const [showConfirmPass, setShowOnConfirmPass] = useState<boolean>(false);

  const [state, setState] = useState<SignUpType>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const onKeyDown = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setState(
      (prev: SignUpType): SignUpType => ({
        ...prev,
        [name]: value,
      })
    );
  };
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(state);
  };
  return (
    <section>
      <div>
        <div className='flex items-center justify-center px-4 py-3 sm:px-6 sm:py-8 lg:px-8 lg:py-5'>
          <div className='xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md bg-white/40 backdrop-blur-lg py-14 px-5 border border-black/20 rounded-2xl'>
            <h2 className='text-3xl font-bold leading-tight text-black sm:text-4xl'>
              Sign up
            </h2>
            <form className='mt-8' onClick={handleSignUp}>
              <div className='space-y-5'>
                <div>
                  <label
                    htmlFor='name'
                    className='text-base font-medium text-gray-900'
                  >
                    Full Name
                  </label>
                  <div className='mt-2'>
                    <input
                      className='flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
                      type='text'
                      name='name'
                      onChange={onKeyDown}
                      placeholder='Full Name'
                      id='name'
                    ></input>
                  </div>
                </div>
                <div>
                  <div className='grid w-full mb-3 items-center'>
                    <label className='text-base font-medium text-gray-900 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                      Picture
                    </label>
                    <input
                      id='picture'
                      type='file'
                      className='flex mt-2 h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm text-gray-500 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium'
                    ></input>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor='email'
                    className='text-base font-medium text-gray-900'
                  >
                    Email address
                  </label>
                  <div className='mt-2'>
                    <input
                      className='flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
                      type='email'
                      name='email'
                      onChange={onKeyDown}
                      placeholder='Email'
                      id='email'
                    ></input>
                  </div>
                </div>
                <div>
                  <div className='flex items-center justify-between'>
                    <label
                      htmlFor='password'
                      className='text-base font-medium text-gray-900'
                    >
                      Password
                    </label>
                  </div>
                  <div className='mt-2'>
                    <input
                      className='flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
                      type={show ? "text" : "password"}
                      name='password'
                      placeholder='Password'
                      onChange={onKeyDown}
                      id='password'
                    ></input>
                    <span className='flex'>
                      <span
                        onClick={() => setShow(show ? false : true)}
                        className='ms-auto'
                      >
                        {show ? "hide" : "show"}
                      </span>
                    </span>
                  </div>
                </div>
                <div style={{ marginTop: "-5px" }}>
                  <div className='flex items-center justify-between'>
                    <label
                      htmlFor='ConfirmPassword'
                      className='text-base font-medium text-gray-900'
                    >
                      Confirm Password
                    </label>
                  </div>
                  <div className='mt-2'>
                    <input
                      className='flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
                      type={showConfirmPass ? "text" : "password"}
                      name='confirmPassword'
                      placeholder='Password'
                      onChange={onKeyDown}
                      id='ConfirmPassword'
                    ></input>
                    <span className='flex'>
                      <span
                        onClick={() =>
                          setShowOnConfirmPass(showConfirmPass ? false : true)
                        }
                        className='ms-auto'
                      >
                        {showConfirmPass ? "hide" : "show"}
                      </span>
                    </span>
                  </div>
                </div>
                <div>
                  <button
                    type='button'
                    onClick={handleSignUp}
                    className='inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80'
                  >
                    Create Account <span className='ml-2' />
                  </button>
                </div>
              </div>
            </form>
            <div className='mt-3 space-y-3'>
              <button
                type='button'
                disabled
                className='relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none'
              >
                <span className='mr-2 inline-block'>
                  <svg
                    className='h-6 w-6 text-rose-500'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z'></path>
                  </svg>
                </span>
                Sign up with Google
              </button>
              <button
                type='button'
                disabled
                className='relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none'
              >
                <span className='mr-2 inline-block'>
                  <svg
                    className='h-6 w-6 text-[#2563EB]'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z'></path>
                  </svg>
                </span>
                Sign up with Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
