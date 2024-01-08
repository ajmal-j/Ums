import moment from "moment";
import { reactSetStateType } from "../../types/types";

type List = {
  name: string;
  email: string;
  contact: number | string;
  createdAt: any;
  profile: string;
  id: string | undefined;
  handleDeleteUser: (id: string | undefined) => void;
  setEdit: (id: string) => void;
};

export default function List({
  contact,
  createdAt,
  email,
  name,
  id,
  profile,
  handleDeleteUser,
  setEdit,
}: List) {
  return (
    <div
      key={id}
      className=' bg-white items-center w-full justify-around rounded-xl px-3 py-2 flex gap-4 max-w-[1000px] mx-auto hover:bg-opacity-60'
    >
      <div className='bg-gray-300 ms-0 lg:ms-7 w-[70px] flex-shrink-0 flex-grow-0 h-[70px] rounded-full'>
        <img
          src={profile}
          className='rounded-full w-full h-full object-cover'
          alt='Profile Picture'
        />
      </div>

      <div className='flex  gap-4 flex-col md:flex-row justify-between w-full'>
        <div className='flex flex-col ms-0 lg:ms-20 gap-2 justify-between'>
          <div className='flex flex-col '>
            <label className='font-bold text-sm text-black/50'>name :</label>
            <span className='capitalize ps-1'>{name}</span>
          </div>
          <div className='flex flex-col'>
            <label className='font-bold text-sm text-black/50'>email :</label>
            <span className='ps-1'>{email}</span>
          </div>
        </div>
        <div className='flex items-start max-w-[300px] flex-1  flex-col justify-between'>
          <div className='flex flex-col'>
            <label className='font-bold text-sm text-black/50'>contact :</label>
            <span className='ps-1'>{contact}</span>
          </div>
          <div className='flex flex-col'>
            <label className='font-bold text-sm text-black/50'>joined :</label>
            <span className='ps-1'>{moment(createdAt).fromNow()}</span>
          </div>
        </div>
      </div>
      <div className='flex flex-col px-3 justify-around gap-2'>
        <button
          onClick={() => {
            if (id) setEdit(id);
          }}
          className='px-2 py-1 bg-violet-600 text-white rounded-full  shadow-shadowFull border border-white/80 hover:bg-opacity-70 hover:text-black/50 transition-all duration-200'
        >
          edit
        </button>
        <button
          onClick={() => handleDeleteUser(id)}
          className='px-2 py-1 bg-red-600 text-white rounded-full  shadow-shadowFull border border-white/80 hover:bg-opacity-70 hover:text-black/50 transition-all duration-200'
        >
          delete
        </button>
      </div>
    </div>
  );
}
