import { Toaster } from "react-hot-toast";
import Authentication from "./pages/auth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import { UserContextProvider } from "./context/userContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserContextProvider>
          <Routes>
            <Route path='/' element={<Authentication />} />
            <Route path='/home' element={<Home />} />
          </Routes>
        </UserContextProvider>
      </BrowserRouter>
      <Toaster position='top-right' reverseOrder={false} />
    </>
  );
}

export default App;
