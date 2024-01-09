import Header from "../../../components/userComponent/userHeader";
import { Route, Routes } from "react-router-dom";
import Profile from "../../../components/userComponent/profile";
import WeatherApp from "../../../components/userComponent/weatherApp";

export default function Home() {
  return (
    <div className=''>
      <Header />
      <Routes>
        <Route path='/' element={<WeatherApp />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </div>
  );
}
