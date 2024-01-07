import Header from "../../components/header";
import { Route, Routes } from "react-router-dom";
import Profile from "../../components/profile";

export default function Home() {
  return (
    <div className='bg-violet-200 w-full min-h-screen'>
      <Header />
      <Routes>
        <Route
          path='/'
          element={
            <div>
              <iframe
                title='Embedded Site'
                width='100%'
                height='845'
                src='https://myweather-app67.netlify.app/'
                allowFullScreen
              />
            </div>
          }
        />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </div>
  );
}
