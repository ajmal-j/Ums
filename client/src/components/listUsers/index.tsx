import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AllUserReduxType,
  setAllUsers,
  updateDeletedUser,
  updateUserDetails,
} from "../../redux/reducers/allUsers";
import { axiosWithAdminToken } from "../../utils/axios";
import List from "../listItem";
import { AllUserType, UserDataType } from "../../types/types";
import { IoMdClose } from "react-icons/io";
import { FiLoader } from "react-icons/fi";
import { BsSave } from "react-icons/bs";
import EditInput from "../editInput";
import { EditInputValidation } from "../../utils/validationSchema";
import toast from "react-hot-toast";
import { handleError } from "../../utils/errorHandler";

export default function ListUsers() {
  const [users, setUsers] = useState<AllUserType>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [user, setUser] = useState<UserDataType>();
  const [image, setImage] = useState<Blob | null>(null);
  const [editInputValue, setInput] = useState<
    Omit<UserDataType, "id" | "profile">
  >({
    _id: "",
    name: "",
    email: "",
    contact: 0,
  });
  const allUserReducer = useSelector(
    (state: { allUserReducer: AllUserReduxType }) => state?.allUserReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    axiosWithAdminToken
      .get("/allUser")
      .then((response) => {
        const data = response.data;
        dispatch(setAllUsers(data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setUsers(allUserReducer.users);
  }, [allUserReducer]);

  const handleDeleteUser = async (id: string | undefined): Promise<void> => {
    console.log(id);
    try {
      const result = window.confirm("Confirm Delete.");
      if (result) {
        await axiosWithAdminToken.delete("/deleteUser", { data: id });
        dispatch(updateDeletedUser(id));
        toast.success("Deleted successfully.");
      }
    } catch (error) {
      handleError(error);
    }
  };
  const handleEdit = (id: string) => {
    const user = users.find((user) => user._id === id);
    if (user) {
      setUser(user);
      const { email, name, contact, _id } = user;
      setInput({ name, email, contact, _id });
      setEdit(true);
    }
  };

  function clearImageInput() {
    if (imageInputRef.current) {
      imageInputRef.current.files = null;
      imageInputRef.current.value = "";
      setImage(null);
    }
  }
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const handleSaveEdit = async () => {
    try {
      const { contact, email, name, _id } = editInputValue;
      EditInputValidation.parse({ name, email, contact: contact.toString() });
      const response = await axiosWithAdminToken.patch("/editUser", {
        data: editInputValue,
      });
      if (response.status === 200 || response.status === 201) {
        setUser({
          contact: 0,
          email: "",
          id: "",
          name: "",
          profile: "",
        });
        dispatch(updateUserDetails({ contact, email, name, _id }));
        setEdit(false);
        setInput({ name: "", email: "", contact: 0, _id: "" });
        toast.success("Updated");
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className='container relative w-full mx-auto bg-violet-300 mt-6 p-5 rounded-xl'>
      <div className='flex gap-4 items-baseline justify-between '>
        <span className='text-2xl ps-2 pb-4 font-thin'>Users</span>
        <span>Total : {users?.length}</span>
      </div>
      <div className='flex flex-col gap-3 '>
        {users?.map(({ contact, email, _id, name, profile, createdAt }) => (
          <List
            contact={contact}
            createdAt={createdAt}
            email={email}
            name={name}
            profile={profile}
            id={_id}
            key={_id}
            handleDeleteUser={() => handleDeleteUser(_id)}
            setEdit={() => {
              if (_id) handleEdit(_id);
            }}
          />
        ))}
        {!users.length && (
          <div className='font-thin text-2xl text-center'>no users</div>
        )}
      </div>
      <div></div>
      {edit && (
        <div className='absolute text-black z-10 top-0 bottom-auto left-0 right-0 flex justify-center items-center h-full  bg-white/50'>
          <div className='bg-white my-auto p-7 rounded-2xl shadow-shadowFull border'>
            <div className='flex justify-end'>
              <button
                onClick={() => {
                  setEdit(false);
                }}
                className='bg-violet-300 text-black/60 shadow-shadowFull px-3 py-2 border rounded-full '
              >
                close
              </button>
            </div>

            <div className='flex flex-col mx-auto items-center my-5'>
              <div>
                <img
                  src={user?.profile}
                  alt=''
                  className='w-[150px] h-[150px] object-cover rounded-full'
                />
                <span className='block text-center pt-2 capitalize'>
                  {user?.name}
                </span>
              </div>
              <div className='flex gap-2 pt-4 items-center'>
                <button
                  className={`w-7 h-7 flex items-center justify-center border rounded-full  ${
                    false
                      ? "text-white bg-red-500"
                      : "bg-violet-300 text-black/60"
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
                  className='flex h-10 w-full max-w-[200px] rounded-full border border-input bg-violet-300 px-3 py-2 text-sm text-gray-500 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium'
                ></input>
                <button
                  className={`px-5 py-2 border rounded-full bg-violet-700  ${
                    false ? "text-white" : "bg-violet-300 text-black/60"
                  }`}
                  // onClick={updateImage}
                >
                  {false ? <FiLoader className='animate-spin' /> : <BsSave />}
                </button>
              </div>
            </div>
            <EditInput
              title='name'
              setInput={setInput}
              editInput={editInputValue?.name}
              edit={true}
            />
            <EditInput
              title='email'
              setInput={setInput}
              editInput={editInputValue?.email}
              edit={true}
            />
            <EditInput
              title='contact'
              setInput={setInput}
              editInput={editInputValue?.contact}
              edit={true}
            />
            <button
              className='w-full bg-violet-500 py-2 mt-4 text-white hover:text-black hover:bg-violet-300 transition-all duration-200 rounded-full'
              onClick={handleSaveEdit}
            >
              save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
