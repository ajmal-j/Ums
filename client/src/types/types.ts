export type reactSetStateType<T> = React.Dispatch<React.SetStateAction<T>>;

export type UserDataType = {
  token?: string;
  createdAt?:any;
  name: string;
  id: string;
  _id?:string;
  profile: string;
  contact: number;
  email: string;
};

export type AllUserType = Array<Omit<UserDataType, "token">>;

export type adminDataType = Omit<UserDataType, "contact">;
