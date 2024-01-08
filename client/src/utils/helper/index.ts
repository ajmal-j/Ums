import toast from "react-hot-toast";

type SetLocalStorage = (userData: object) => void;

export const setToLocalStorage: SetLocalStorage = (userData: object) => {
  const data = JSON.stringify(userData);
  localStorage.setItem("userCredentials", data);
};

export const setAdminToLocalStorage: SetLocalStorage = (adminData: object) => {
  const data = JSON.stringify(adminData);
  localStorage.setItem("adminCredentials", data);
};

type userCredentialsType = () => {
  token: string;
  name: string;
  id: string;
  profile: string;
  email: string;
};

type UserUpdateType = {
  name?: string;
  email?: string;
  contact?: string;
  profile?: string;
};

export const getLocalStorage: userCredentialsType = (): {
  token: string;
  name: string;
  id: string;
  profile: string;
  email: string;
} => {
  const userData = localStorage.getItem("userCredentials");
  if (!userData) throw new Error("UserData not found");
  const data = JSON.parse(userData);
  return data;
};

export type adminCredentialsType = userCredentialsType;

export const getAdminLocalStorage: adminCredentialsType = (): {
  token: string;
  name: string;
  id: string;
  profile: string;
  email: string;
} => {
  const adminData = localStorage.getItem("adminCredentials");
  if (!adminData) throw new Error("AdminData not found");
  const data = JSON.parse(adminData);
  return data;
};

export const updateLocalStorage = ({
  email,
  contact,
  name,
  profile,
}: UserUpdateType) => {
  const current = getLocalStorage();
  let data = {};
  if (email && name && contact) {
    data = {
      ...current,
      email,
      name,
      contact,
    };
  } else if (profile) {
    data = {
      ...current,
      profile,
    };
  }
  setToLocalStorage(data);
};

export const saveImage = async (image: Blob | null) => {
  if (!image) return toast.error("Select an image.");
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "dodxauls");
  data.append("cloud_name", "dho2z1pix");
  try {
    if (image === null) {
      return toast.error("Please Upload image");
    }
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dho2z1pix/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const cloudData = await res.json();
    toast.success("Image Upload Successfully");
    let url = await cloudData.url;
    return url;
  } catch (error) {
    console.log(error);
  }
};
