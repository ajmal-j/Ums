import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { BsSave } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { FiLoader } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { PiSpinner } from "react-icons/pi";
import { RiUploadCloud2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  UserReduxType,
  setError,
  setLoading,
  setProfile,
  setUser,
  updateUser,
} from "../../../redux/reducers/user";
import { UserDataType } from "../../../types/types";
import { axiosWithToken } from "../../../utils/axios";
import { handleError } from "../../../utils/errorHandler";
import { saveImage } from "../../../utils/helper";
import { EditInputValidation } from "../../../utils/validationSchema";
import EditInput from "../editInput";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [edit, setEdit] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [imageLoader, setImageLoader] = useState<boolean>(false);
  const [image, setImage] = useState<Blob | null>(null);
  const [editInputValue, setInput] = useState<
    Omit<UserDataType, "_id" | "id" | "profile">
  >({
    name: "",
    email: "",
    contact: 0,
  });

  const userReducer = useSelector(
    (state: { userReducer: UserReduxType }) => state?.userReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateImage = async () => {
    setImageLoader(true);
    if (!image) {
      toast.error("Please select an image", {
        id: "selectImage",
      });
      setImageLoader(false);
      return;
    }
    try {
      const url = await saveImage(image);
      const uploaded = await axiosWithToken.patch("/updateImage", { url });
      if (uploaded) {
        dispatch(setProfile(url));
        clearImageInput();
        toast.success("Image Upload Successfully");
      }
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      }
      console.log(error);
    } finally {
      setImageLoader(false);
    }
  };

  const handleSave = async () => {
    setLoader(true);
    try {
      const { contact, email, name } = editInputValue;
      EditInputValidation.parse({ name, email, contact: contact.toString() });
      // @ts-ignore
      const response: any = await dispatch(updateUser(editInputValue));
      if (response.meta.requestStatus === "fulfilled") {
        setEdit(false);
        setInput({
          email: "",
          name: "",
          contact: 0,
        });
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoader(false);
    }
  };

  const setUserData = useCallback(
    (data: UserReduxType) => {
      dispatch(setUser(data));
      dispatch(setError(""));
    },
    [userReducer]
  );

  useEffect(() => {
    dispatch(setLoading(true));
    axiosWithToken
      .get("/userData")
      .then((response) => {
        const data = response?.data?.user;
        setUserData(data);
        dispatch(setError(""));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        console.log(error);
        navigate("/auth");
        dispatch(setError(error?.response?.data?.message));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, []);

  function clearImageInput() {
    if (imageInputRef.current) {
      imageInputRef.current.files = null;
      imageInputRef.current.value = "";
      setImage(null);
    }
  }
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  return userReducer.loading ? (
    <>
      <PiSpinner className='absolute top-[50%] left-[50%] text-2xl animate-spin' />
    </>
  ) : (
    <div className='container mx-auto mt-7 max-w-[1100px]'>
      <div className='flex flex-col justify-between lg:flex-row items-center bg-violet-400 rounded-2xl mx-4 py-5 px-5 border-white/80 shadow-shadowFull border'>
        <div className='flex flex-col mx-auto items-center my-5'>
          <div>
            <img
              src={image ? URL.createObjectURL(image) : userReducer?.profile}
              alt=''
              className='w-[150px] h-[150px] object-cover rounded-full'
            />
            <span className='block text-center pt-2 capitalize'>
              {userReducer?.name}
            </span>
          </div>
          <div className='flex gap-2 pt-4 items-center'>
            <button
              className={`w-7 h-7 flex items-center justify-center border rounded-full  ${
                image ? "text-white bg-red-500" : "bg-violet-300 text-black/60"
              }`}
              onClick={() => {
                clearImageInput();
              }}
            >
              <IoMdClose />
            </button>
            <input
              id='picture'
              type='file'
              ref={imageInputRef}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const data = e.target?.files;
                if (data?.length) {
                  setImage(data[0]);
                }
              }}
              className='flex h-10 w-full max-w-[200px] rounded-full border border-input bg-transparent px-3 py-2 text-sm text-gray-500 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium'
            ></input>
            <button
              className={`px-5 py-2 border rounded-full bg-violet-700  ${
                image ? "text-white" : "bg-violet-300 text-black/60"
              }`}
              onClick={updateImage}
            >
              {imageLoader ? <FiLoader className='animate-spin' /> : <BsSave />}
            </button>
          </div>
        </div>
        <div className='flex-1 max-w-[600px] w-full bg-white p-4 rounded-xl'>
          <div className='flex flex-col justify-start rounded-2xl'>
            <EditInput
              editInput={editInputValue.name}
              setInput={setInput}
              edit={edit}
              data={userReducer?.name}
              title='name'
            />
            <EditInput
              editInput={editInputValue.email}
              setInput={setInput}
              edit={edit}
              data={userReducer?.email}
              title='email'
            />
            <EditInput
              editInput={editInputValue.contact}
              setInput={setInput}
              edit={edit}
              data={userReducer?.contact}
              title='contact'
            />
          </div>
          <span className='text-sm text-red-600 errorSpan'>
            {userReducer.error || <>&nbsp;</>}
          </span>
          <div className='flex justify-end gap-1 px-3 mt-4'>
            {edit ? (
              <>
                <button
                  onClick={() => setEdit(false)}
                  className='px-4 py-2 border rounded-full bg-red-500 text-white'
                >
                  <IoMdClose />
                </button>
                <button
                  onClick={handleSave}
                  className='w-[60px] flex justify-center items-center py-2 border rounded-full bg-violet-700 text-white'
                >
                  {loader ? (
                    <FiLoader className='animate-spin' />
                  ) : (
                    <RiUploadCloud2Line />
                  )}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    const { email, name, contact } = userReducer;
                    setInput({ email, name, contact });
                    setEdit(true);
                  }}
                  className='w-[60px] flex justify-center items-center py-2 border rounded-full bg-violet-700 text-white'
                >
                  <CiEdit />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
