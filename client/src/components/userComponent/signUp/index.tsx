import { useEffect, useState } from "react";
import { LogInType } from "../logIn";
import { SignUpTypeSchema } from "../../../utils/validationSchema";
import { authApi } from "../../../utils/axios";
import toast from "react-hot-toast";
import { reactSetStateType } from "../../../types/types";
import { handleError } from "../../../utils/errorHandler";
import { saveImage } from "../../../utils/helper";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

type SignUpType = {
  confirmPassword: string;
  contact: string;
  name: string;
} & LogInType;

type SignUp = {
  setLogIn: reactSetStateType<boolean>;
};

const SignUp = ({ setLogIn }: SignUp) => {
  const [show, setShow] = useState<boolean>(false);
  const [image, setImage] = useState<any>("");
  const [url, setUrl] = useState<string>("");
  const [showConfirmPass, setShowOnConfirmPass] = useState<boolean>(false);

  const [state, setState] = useState<SignUpType>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    contact: "",
  });
  const onKeyDown = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name, nextSibling } = e.target;
    if (nextSibling) {
      const nextSiblingElement = nextSibling as HTMLElement;
      nextSiblingElement.innerHTML = "&nbsp;";
    }
    setState(
      (prev: SignUpType): SignUpType => ({
        ...prev,
        [name]: value,
      })
    );
  };

  // submit from,
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const { confirmPassword, ...data }: SignUpType = state;
    try {
      if (data.password !== confirmPassword) {
        throw new Error("Password not matches.");
      }
      // from validation
      SignUpTypeSchema.parse(state);

      let imageUrl;
      if (!url && image) {
        imageUrl = await saveImage(image);
        setUrl(imageUrl);
      }
      authApi
        .post("/signUp", { ...data, profile: imageUrl || url })
        .then((response) => {
          const { status } = response;
          if (status === 200 || status === 201) {
            setState({
              confirmPassword: "",
              email: "",
              name: "",
              password: "",
              contact: "",
            });
            toast.success("Signed up.");
            setLogIn(true);
          } else {
            console.error(`Unexpected status code: ${status}`);
            toast.error("An unexpected error occurred.");
          }
        })
        .catch(({ response }) => {
          toast.error(response.data.message);
        });
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    setUrl("");
  }, [image]);
  return (
    <section>
      <div>
        <div className='flex items-center justify-center px-4 py-3 sm:px-6 sm:py-8 lg:px-8 lg:py-5'>
          <div className='mx-auto max-w-[450px] w-full bg-white/40 backdrop-blur-lg py-14 px-5 border border-black/20 rounded-2xl'>
            <h2 className='text-3xl font-bold leading-tight text-black sm:text-4xl'>
              Sign up
            </h2>
            <form className='mt-8' onSubmit={handleSignUp}>
              <div className='space-y-0'>
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
                      value={state.name}
                      onChange={onKeyDown}
                      placeholder='Full Name'
                      id='name'
                    ></input>
                    <span className='text-red-600 text-sm block mb-2'>
                      &nbsp;
                    </span>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor='contact'
                    className='text-base font-medium text-gray-900'
                  >
                    Contact
                  </label>
                  <div className='mt-2'>
                    <input
                      className='flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
                      type='number'
                      name='contact'
                      value={state.contact}
                      onChange={onKeyDown}
                      placeholder='Contact number'
                      id='contact'
                    ></input>
                    <span className='text-red-600 text-sm block mb-2'>
                      &nbsp;
                    </span>
                  </div>
                </div>
                <div>
                  <div className='grid w-full items-center'>
                    <label className='text-base font-medium text-gray-900 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                      Picture
                    </label>
                    <input
                      id='picture'
                      type='file'
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        // @ts-ignore
                        const data = e.target?.files[0];
                        if (data) {
                          setImage(data);
                        }
                      }}
                      className='flex mt-2 h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm text-gray-500 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium'
                    ></input>
                    <span className='text-red-600 text-sm'>&nbsp;</span>
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
                      value={state.email}
                      onChange={onKeyDown}
                      placeholder='Email'
                      id='email'
                    ></input>
                    <span className='text-red-600 text-sm block mb-2'>
                      &nbsp;
                    </span>
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
                      type={show ? "text" : "password"}
                      name='password'
                      placeholder='Password'
                      value={state.password}
                      onChange={onKeyDown}
                      id='password'
                    ></input>
                    <span className='text-red-600 text-sm'>&nbsp;</span>
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
                    <span
                      onClick={() =>
                        setShowOnConfirmPass(showConfirmPass ? false : true)
                      }
                      className='ms-auto cursor-pointer text-lg'
                    >
                      {showConfirmPass ? <FaRegEye /> : <FaRegEyeSlash />}
                    </span>
                  </div>
                  <div className='mt-2'>
                    <input
                      className='flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
                      type={showConfirmPass ? "text" : "password"}
                      name='confirmPassword'
                      placeholder='Password'
                      value={state.confirmPassword}
                      onChange={onKeyDown}
                      id='confirmPassword'
                      onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e?.key === "Enter") {
                          handleSignUp(e);
                        }
                      }}
                    ></input>
                    <span className='text-red-600 text-sm'>&nbsp;</span>
                  </div>
                </div>
                <div>
                  <button
                    type='button'
                    onClick={handleSignUp}
                    className='inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 mt-5'
                  >
                    Create Account <span className='ml-2' />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
