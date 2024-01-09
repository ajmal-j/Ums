import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AllUserReduxType,
  setAllUsers,
  setUserProfile,
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
import { saveImage } from "../../utils/helper";
import { CiUser } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function ListUsers() {
  const [users, setUsers] = useState<AllUserType>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [imageLoader, setImageLoader] = useState<boolean>(false);
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
  }, [allUserReducer.users]);

  const handleDeleteUser = async (id: string | undefined): Promise<void> => {
    try {
      const result = window.confirm("Confirm Delete.");
      if (result) {
        await axiosWithAdminToken.delete("/deleteUser", { data: { id } });
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

  const updateImage = async (id: string) => {
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
      axiosWithAdminToken
        .patch("/updateImage", { data: { url, id } })
        .then(() => {
          dispatch(setUserProfile({ url, id }));
          setUser((prev) => {
            if (prev) {
              return {
                ...prev,
                profile: url,
              };
            }
          });
          clearImageInput();
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setImageLoader(false);
    }
  };

  const searchInputRef = useRef<null | HTMLInputElement>(null);
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const searchQuery = searchInputRef.current?.value;
    if (searchQuery === "") return;
    axiosWithAdminToken
      .post("/searchUser", { data: searchQuery })
      .then(({ data }) => {
        if (data) {
          setUsers(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='container relative w-full mx-auto bg-violet-300 mt-6 p-5 rounded-xl'>
      <div className='flex gap-4 items-baseline justify-between '>
        <span
          className='text-2xl ps-2 pb-4 font-thin'
          onClick={() => {
            setUsers(allUserReducer.users);
          }}
        >
          Users
        </span>
        <span className='flex gap-5 items-center'>
          <span>Total : {users?.length}</span>
          <Link to={"createUser"}>
            <button className='flex items-center gap-2 bg-violet-500 px-3 py-1 rounded-xl shadow-shadowFull border border-white/60'>
              create <CiUser />
            </button>
          </Link>
        </span>
      </div>
      <form
        onSubmit={handleSearch}
        className='flex mb-8 gap-3 max-w-[1000px] mx-auto'
      >
        <input
          ref={searchInputRef}
          type='text'
          placeholder='search users by email , name or contact.'
          className='w-full px-6 py-2 rounded-full placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 border border-gray-300 shadow-shadowFull'
        />
        <div className='flex shadow-shadowFull rounded-full'>
          <button
            type='button'
            className='w-[65px] text-center bg-white text-red-500 rounded-l-full border border-r-black/10 border-white/80 hover:bg-opacity-70 hover:font-bold hover:text-red-500 transition-colors duration-200 '
            onClick={() => {
              if (searchInputRef?.current) {
                searchInputRef.current.value = "";
              }
              setUsers(allUserReducer.users);
            }}
          >
            clear
          </button>
          <button
            type='submit'
            className='w-[65px] bg-white border-l-0 text-violet-800 rounded-r-full border border-white/80 hover:bg-opacity-70 hover:text-violet-800 hover:font-bold transition-colors duration-200 '
          >
            search
          </button>
        </div>
      </form>
      <div className='flex flex-col gap-3 '>
        {users?.map(({ contact, email, _id, name, profile, createdAt }) => (
          <List
            contact={contact}
            createdAt={createdAt}
            email={email}
            name={name}
            setView={setView}
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
          <div
            className='bg-white my-auto p-7 rounded-2xl shadow-shadowFull border animate-fadeInUp'
            id='mainDiv'
          >
            <div className='flex justify-end'>
              <button
                onClick={() => {
                  const element = document.getElementById("mainDiv");
                  if (element?.classList) {
                    element.classList.add("animate-fadeDown");
                  }
                  setView(false);
                  setTimeout(() => {
                    setEdit(false);
                  }, 200);
                }}
                className='bg-violet-300 text-black/60 shadow-shadowFull px-3 py-2 border rounded-full hover:bg-violet-600 duration-200 hover:text-white hover:shadow-shadowFullBlack transition-colors'
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
                    image
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
                    image ? "text-white" : "bg-violet-300 text-black/60"
                  }`}
                  onClick={() => {
                    if (user?._id) {
                      updateImage(user._id);
                    }
                  }}
                >
                  {imageLoader ? (
                    <FiLoader className='animate-spin' />
                  ) : (
                    <BsSave />
                  )}
                </button>
              </div>
            </div>
            <EditInput
              title='name'
              data={user?.name}
              setInput={setInput}
              editInput={editInputValue?.name}
              edit={view}
            />
            <EditInput
              title='email'
              data={user?.email}
              setInput={setInput}
              editInput={editInputValue?.email}
              edit={view}
            />
            <EditInput
              title='contact'
              data={user?.contact}
              setInput={setInput}
              editInput={editInputValue?.contact}
              edit={view}
            />
            {view ? (
              <button
                className='w-full bg-violet-500 py-2 mt-4 text-white hover:text-black hover:bg-violet-300 transition-all duration-200 rounded-full'
                onClick={handleSaveEdit}
              >
                save
              </button>
            ) : (
              <button
                className='w-full bg-violet-400 py-2 mt-4 text-red-600 hover:text-black hover:bg-violet-300 transition-all duration-200 rounded-full'
                onClick={() => {
                  setView(true);
                  setEdit(true);
                }}
              >
                edit
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
