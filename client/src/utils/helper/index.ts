type SetLocalStorage = (userData: object) => void;

export const setToLocalStorage: SetLocalStorage = (userData: object) => {
  const data = JSON.stringify(userData);
  localStorage.setItem("userCredentials", data);
};
