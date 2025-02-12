import { BrowserRouter, Route, Routes } from "react-router";
import MainWrapper from "./layouts/MainWrapper";
import Register from "./views/auth/Register";
import Login from "./views/auth/Login";
import Logout from "./views/auth/Logout";
import CreateNewPassword from "./views/auth/CreateNewPassword";
import Index from "./views/base/Index";
import CourseDetail from "./views/base/CourseDetail";
import Cart from "./views/base/Cart";
import { useEffect, useState } from "react";
import apiInstance from "./utils/axios";
import CartID from "./views/plugin/CartID";
import { CartContext } from "./views/plugin/useContext";
import Checkout from "./views/base/Checkout";
import Success from "./views/base/Success";
import { LoadingContext } from "./views/plugin/useLoading";
import "./index.css";
import Profile from "./views/student/Profile";
import ChangePassword from "./views/student/ChangePassword";
import ProtectedRoute from "./utils/ProtectedRoutes";
import NotFound from "./views/base/NotFound";
import Courses from "./views/base/Courses";
import Fail from "./views/base/Fail";
import Dashboard from "./views/student/CartCheckout";
import CartCheckout from "./views/student/CartCheckout";
import StudentCourseDetail from "./views/student/CourseDetail";
import ForgetPassword from "./views/auth/ForgotPassword";
function App() {
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await apiInstance.get(`/course/cart/${CartID()}`);
      setCartCount(res.data.length);
      setLoading(false);
    } catch (error) {
      setTimeout(() => setLoading(false), 5000);
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);
  return (
    <LoadingContext.Provider value={[loading, setLoading]}>
      <CartContext.Provider value={[cartCount, setCartCount]}>
        <BrowserRouter>
          <MainWrapper>
            {loading ? (
              // Full-page loading screen
              <div className="loading-overlay">
                <div className="spinner"></div>
                <p>Loading, please wait...</p>
              </div>
            ) : (
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/courses" element={<Courses/>} ></Route>
                <Route path="/course-detail/:slug" element={<CourseDetail />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route
                  path="/create-new-password"
                  element={<CreateNewPassword />}
                />
                <Route path="/forget-password" element={<ForgetPassword/>} />

                {/* Protected Routes */}
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/checkout/:order_oid"
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/payment/success/:tran_id"
                  element={
                    <ProtectedRoute>
                      <Success />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/payment/fail"
                  element={
                    <ProtectedRoute>
                      <Fail />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/payment/fail"
                  element={
                    <ProtectedRoute>
                      <Success />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/payment/cancel"
                  element={
                    <ProtectedRoute>
                      <Success />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/courses"
                  element={
                    <ProtectedRoute>
                      <Courses />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/checkout"
                  element={
                    <ProtectedRoute>
                      <CartCheckout />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/course/detail"
                  element={
                    <ProtectedRoute>
                      <StudentCourseDetail />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/change-password"
                  element={
                    <ProtectedRoute>
                      <ChangePassword />
                    </ProtectedRoute>
                  }
                />

                {/* Not Found Route */}
                <Route
                  path="*"
                  element={
                    <NotFound/>
                  }
                />
              </Routes>
            )}
          </MainWrapper>
        </BrowserRouter>
      </CartContext.Provider>
    </LoadingContext.Provider>
  );
}

export default App;
