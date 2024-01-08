import moment from "moment";

type List = {
  name: string;
  email: string;
  contact: number | string;
  createdAt: any;
  profile: string;
  id:string;
};

export default function List({
  contact,
  createdAt,
  email,
  name,
  id,
  profile,
}: List) {
  return (
    <div key={id} className='bg-white items-center w-full justify-around rounded-xl px-3 py-2 flex gap-4 max-w-[1000px] mx-auto hover:bg-opacity-60'>
      <div className='bg-gray-300 w-[103px] h-[80px] rounded-full'>
        <img
          src={profile}
          className='rounded-full w-full h-full object-cover'
          alt='Profile Picture'
        />
      </div>

      <div className='flex gap-4 flex-col md:flex-row justify-around w-full'>
        <div className='flex flex-col gap-2 justify-between'>
          <div className='flex flex-col'>
            <label className='font-bold text-sm text-black/50'>name :</label>
            <span>{name}</span>
          </div>
          <div className='flex flex-col'>
            <label className='font-bold text-sm text-black/50'>email :</label>
            <span>{email}</span>
          </div>
        </div>
        <div className='flex flex-col justify-between'>
          <div className='flex flex-col'>
            <label className='font-bold text-sm text-black/50'>contact :</label>
            <span>{contact}</span>
          </div>
          <div className='flex flex-col'>
            <label className='font-bold text-sm text-black/50'>joined :</label>
            <span>{moment(createdAt).fromNow()}</span>
          </div>
        </div>
      </div>
      <div className='flex flex-col px-3 justify-around gap-3'>
        <button className='px-2 py-1 bg-violet-600 text-white rounded-full  shadow-shadowFull border border-white/80 hover:bg-opacity-70 hover:text-black/50 transition-all duration-200'>
          edit
        </button>
        <button className='px-2 py-1 bg-red-600 text-white rounded-full  shadow-shadowFull border border-white/80 hover:bg-opacity-70 hover:text-black/50 transition-all duration-200'>
          block
        </button>
      </div>
    </div>
  );
}
