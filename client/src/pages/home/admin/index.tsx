import { Route, Routes } from "react-router-dom";
import AdminAuth from "../../auth/adminAuth";
import Dashboard from "../../../components/dashboard";

export default function Admin() {
  return (
    <div className="bg-violet-200 min-h-screen">
      <Routes>
        <Route path='/' element={<AdminAuth />} />
        <Route path='/dashboard/*' element={<Dashboard />} />
      </Routes>
    </div>
  );
}
