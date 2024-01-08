export type reactSetStateType<T> = React.Dispatch<React.SetStateAction<T>>;

export type UserDataType = {
  token?: string;
  name?: string;
  id?: string;
  profile?: string;
  contact?: number;
  email?: string;
};

export type adminDataType = Omit<UserDataType, "contact">;
