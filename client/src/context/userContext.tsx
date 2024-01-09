import { ReactNode, createContext, useContext, useState } from "react";
import { UserDataType, reactSetStateType } from "../types/types";
import { getLocalStorage } from "../utils/helper";

type UserContextType = {
  user: null | Omit<UserDataType, "contact" | "id">;
  setUser: reactSetStateType<Omit<UserDataType, "contact" | "id"> | null>;
  updateUserDataInContext: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Omit<UserDataType, "contact" | "id"> | null>(
    () => {
      const data = localStorage.getItem("userCredentials");
      if (!data) return null;
      const userInfo: Omit<UserDataType, "contact" | "id"> = JSON.parse(data);
      return userInfo;
    }
  );
  const updateUserDataInContext = () => {
    const data = getLocalStorage();
    if (data) {
      setUser(data);
    }
  };
  return (
    <UserContext.Provider value={{ setUser, user, updateUserDataInContext }}>
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
