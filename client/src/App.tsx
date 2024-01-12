import { Toaster } from "react-hot-toast";
import Authentication from "./pages/auth/userAuth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/user";
import Admin from "./pages/home/admin";

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Authentication />} />
            <Route path='/admin/*' element={<Admin />} />
            <Route path='/home/*' element={<Home />} />
          </Routes>
      </BrowserRouter>
      <Toaster position='top-right' reverseOrder={false} />
    </>
  );
}

export default App;
