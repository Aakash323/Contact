import { Route, Routes, BrowserRouter } from "react-router-dom";
import AuthPage from "./pages/Authpage";
import ContactPage from "./pages/ContactPage";
import Mainlayout from "./Layout/Mainlayout";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route element={<Mainlayout/>}>
          
          <Route path="/contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
