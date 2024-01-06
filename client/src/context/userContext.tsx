import { ReactNode, createContext, useContext, useState } from "react";
import { reactSetStateType } from "../types/types";

type UserContextType = {
  user: object | null;
  setUser: reactSetStateType<object | null>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<object | null>(() => {
    const data = localStorage.getItem("userCredentials");
    if (!data) return null;
    const userInfo: object = JSON.parse(data);
    return userInfo;
  });
  return (
    <UserContext.Provider value={{ setUser, user }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Context is missing");
  }
  return context;
};
