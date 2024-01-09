import Header from "../../../components/userHeader";
import { Route, Routes } from "react-router-dom";
import Profile from "../../../components/profile";
import WeatherApp from "../../../components/weatherApp";

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
