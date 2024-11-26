import { BrowserRouter, Route, Routes } from "react-router";
import MainWrapper from "./layouts/MainWrapper";
import Register from "./views/auth/Register";
import Login from "./views/auth/Login";
import Logout from "./views/auth/Logout";
import ForgotPassword from "./views/auth/ForgotPassword";
import CreateNewPassword from "./views/auth/CreateNewPassword";

function App() {
  return (
    <BrowserRouter>
      <MainWrapper>
        <Routes>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="/forget-password" element={<ForgotPassword />}></Route>
          <Route
            path="/create-new-password"
            element={<CreateNewPassword />}
          ></Route>
        </Routes>
      </MainWrapper>
    </BrowserRouter>
  );
}

export default App;
