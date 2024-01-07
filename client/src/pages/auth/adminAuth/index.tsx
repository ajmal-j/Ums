import { Route, Routes } from "react-router-dom";
import AdminLogIn from "../../../components/adminLogIn";
import Dashboard from "../../../components/dashboard";

export default function AdminAuth() {
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <div className='w-full h-screen bg-[url(/bg.svg)] bg-center bg-cover bg-no-repeat'>
              <AdminLogIn />
            </div>
          }
        />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </>
  );
}
