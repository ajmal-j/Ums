import { useEffect } from "react";
import AdminLogIn from "../../../components/adminComponents/adminLogIn";
import { getAdminLocalStorage } from "../../../utils/helper";
import { useNavigate } from "react-router-dom";

export default function AdminAuth() {
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const data = getAdminLocalStorage();
      if (data && data.token) {
        navigate("/admin/dashboard");
      }
    } catch (error) {}
  }, []);
  return (
    <div className='w-full h-screen bg-[url(/bg.svg)] bg-center bg-cover bg-no-repeat'>
      <AdminLogIn />
    </div>
  );
}
