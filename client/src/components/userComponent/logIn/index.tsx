import { useState } from "react";
import { SignInTypeSchema } from "../../../utils/validationSchema";
import { authApi } from "../../../utils/axios";
import toast from "react-hot-toast";
import { handleError } from "../../../utils/errorHandler";
import { useNavigate } from "react-router-dom";
import { setToLocalStorage } from "../../../utils/helper";
import LogInForm from "../logInForm";

export type LogInType = {
  email: string;
  password: string;
};

export default function Login() {
  const [state, setState] = useState<LogInType>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const onKeyDown = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name, nextSibling } = e.target;
    if (nextSibling) {
      const nextSiblingElement = nextSibling as HTMLElement;
      nextSiblingElement.innerHTML = "&nbsp;";
    }
    setState(
      (prev: LogInType): LogInType => ({
        ...prev,
        [name]: value,
      })
    );
  };

  const handleLogIn = (e: React.FormEvent) => {
    e.preventDefault();
    const data: LogInType = {
      ...state,
    };

    try {
      SignInTypeSchema.parse(state);
      authApi
        .post("/logIn", data)
        .then((response) => {
          const { data, status } = response;
          if (status === 200 || status === 201) {
            setState({
              email: "",
              password: "",
            });
            const { userData } = data;
            setToLocalStorage(userData);
            toast.success("Logged In");
            navigate("/home");
          } else {
            toast.error("An unexpected error occurred.");
          }
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message);
        });
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <LogInForm
      title='User Log In'
      handleLogIn={handleLogIn}
      onKeyDown={onKeyDown}
      state={state}
    />
  );
}
