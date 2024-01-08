import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AllUserReduxType, setAllUsers } from "../../redux/reducers/allUsers";
import { axiosWithAdminToken } from "../../utils/axios";
import List from "../listItem";
import { AllUserType } from "../../types/types";

export default function ListUsers() {
  const [users, setUsers] = useState<AllUserType>();
  const allUserReducer = useSelector(
    (state: { allUserReducer: AllUserReduxType }) => state?.allUserReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    axiosWithAdminToken
      .get("/allUser")
      .then((response) => {
        const data = response.data;
        dispatch(setAllUsers(data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    setUsers(allUserReducer.users);
  }, [allUserReducer]);
  return (
    <div className='container w-full mx-auto bg-white/40 mt-6 p-5'>
      <div className='flex flex-col gap-3 '>
        {users?.map(({ contact, email, id, name, profile, createdAt }) => (
          <List
            contact={contact}
            createdAt={createdAt}
            email={email}
            name={name}
            profile={profile}
            id={id}
            key={id}
          />
        ))}
      </div>
    </div>
  );
}
