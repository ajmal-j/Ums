import { Route, Routes } from "react-router-dom";
import AdminHeader from "../adminHeader";
import ListUsers from "../listUsers";
import CreateUser from "../createUser";

export default function Dashboard() {
  return (
    <>
      <AdminHeader />
      <Routes>
        <Route path='/' element={<ListUsers />} />
        <Route path='/createUser' element={<CreateUser />} />
        <Route path='/profile' element={<>profile</>} />
      </Routes>
    </>
  );
}
