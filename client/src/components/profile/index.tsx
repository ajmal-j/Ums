import { useCallback, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { PiSpinner } from "react-icons/pi";
import { UserDataType } from "../../types/types";
import { useSelector, useDispatch } from "react-redux";
import EditInput from "../editInput";
import {
  UserReduxType,
  setError,
  setLoading,
  setUser,
  updateUser,
} from "../../redux/user";
import { axiosWithToken } from "../../utils/axios";
import { UserAuth } from "../../context/userContext";

export default function Profile() {
  const [edit, setEdit] = useState<boolean>(false);
  const [editInputValue, setInput] = useState<UserDataType>({
    name: "",
    email: "",
    contact: 0,
  });
  const { updateUserDataInContext } = UserAuth();

  // @ts-ignore
  const userReducer = useSelector((state) => state?.userReducer);
  const dispatch = useDispatch();

  //   const navigate = useNavigate();

  const handleSave = async () => {
    try {
      // @ts-ignore
      const response: any = await dispatch(updateUser(editInputValue));
      if (response.meta.requestStatus === "fulfilled") {
        updateUserDataInContext();
        setEdit(false);
        setInput({
          email: "",
          name: "",
          contact: 0,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setUserData = useCallback((data: UserReduxType) => {
    dispatch(setUser(data));
  }, []);

  useEffect(() => {
    dispatch(setLoading(true));
    axiosWithToken
      .get("/userData")
      .then((response) => {
        const data = response.data.user;
        setUserData(data);
      })
      .catch((error) => {
        console.log(error);
        dispatch(setError(error.response?.data?.message));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, []);

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
              src={userReducer?.profile}
              alt=''
              className='w-[150px] h-[150px] object-cover rounded-full'
            />
            <span className='block text-center pt-2 capitalize'>
              {userReducer?.name}
            </span>
          </div>
          <div className='flex gap-2 pt-4'>
            <button className='px-5 py-2 rounded-full bg-black text-white'>
              edit
            </button>
            <button className='px-5 py-2 rounded-full bg-black/60 text-white'>
              save
            </button>
          </div>
        </div>
        <div className='flex-1 max-w-[600px] w-full bg-white p-4 rounded-xl'>
          <div className='flex flex-col justify-start rounded-2xl gap-5'>
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
                  cancel
                </button>
                <button
                  onClick={handleSave}
                  className='px-5 py-2 border rounded-full bg-violet-700 text-white'
                >
                  save
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
                  className='px-6 py-2 border rounded-full bg-black text-white'
                >
                  edit
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
