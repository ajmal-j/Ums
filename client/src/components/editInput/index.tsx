import { UserDataType, reactSetStateType } from "../../types/types";

type EditInputType = {
  title: string;
  data: string | number | undefined;
  edit: boolean;
  setInput: reactSetStateType<UserDataType>;
  editInput: string | undefined | number;
};

export default function EditInput({
  data,
  title,
  edit,
  editInput,
  setInput,
}: EditInputType) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return edit ? (
    <div className='flex flex-col'>
      <span className='text-sm text-black/50 pb-2'>{title}</span>
      <input
        className='flex w-full h-[40px] rounded-full border border-gray-300 bg-transparent px-3 py-2 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 '
        type='text'
        name={title}
        onChange={handleChange}
        value={editInput}
      ></input>
    </div>
  ) : (
    <div className='flex flex-col'>
      <span className='text-sm text-black/50 pb-2'>{title}</span>
      <span className='h-[40px] py-2 px-3 border border-transparent'>
        {data}
      </span>
    </div>
  );
}
