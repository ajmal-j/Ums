import { useState } from "react";
import { LogInType } from "../logIn";
import LogInForm from "../logInForm";
import { SignInTypeSchema } from "../../utils/validationSchema";
import { handleError } from "../../utils/errorHandler";
import { adminAuthApi } from "../../utils/axios";
import toast from "react-hot-toast";
import { setAdminToLocalStorage } from "../../utils/helper";
import { useNavigate } from "react-router-dom";

export default function AdminLogIn() {
  const [state, setState] = useState<LogInType>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleLogIn = (e: React.FormEvent) => {
    e.preventDefault();
    const data: LogInType = {
      ...state,
    };
    try {
      SignInTypeSchema.parse(data);
      adminAuthApi
        .post("/logIn", { data })
        .then((response) => {
          const { data, status } = response;
          if (status === 200 || status === 201) {
            setState({
              email: "",
              password: "",
            });
            const { adminData } = data;
            setAdminToLocalStorage(adminData);
            toast.success("Logged In");
            navigate("dashboard");
          } else {
            toast.error("An unexpected error occurred.");
          }
        })
        .catch(({ response }) => {
          toast.error(response.data.message);
        });
    } catch (error) {
      handleError(error);
    }
  };

  const onkeydown = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, nextSibling } = e.target;
    if (nextSibling) {
      const nextSiblingElement = nextSibling as HTMLElement;
      nextSiblingElement.innerHTML = "&nbsp;";
    }
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <LogInForm
      title='Admin Log In'
      handleLogIn={handleLogIn}
      onKeyDown={onkeydown}
      state={state}
    />
  );
}
