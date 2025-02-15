import React, { useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainWrapper from "./layouts/MainWrapper";
import ProtectedRoute from "./utils/ProtectedRoutes";
import apiInstance from "./utils/axios";
import CartID from "./views/plugin/CartID";
import { CartContext } from "./views/plugin/useContext";
import { LoadingContext } from "./views/plugin/useLoading";
import "./index.css";

// Lazy Imports
const Index = lazy(() => import("./views/base/Index"));
const Courses = lazy(() => import("./views/base/Courses"));
const CourseDetail = lazy(() => import("./views/base/CourseDetail"));
const Register = lazy(() => import("./views/auth/Register"));
const Login = lazy(() => import("./views/auth/Login"));
const Logout = lazy(() => import("./views/auth/Logout"));
const CreateNewPassword = lazy(() => import("./views/auth/CreateNewPassword"));
const ForgetPassword = lazy(() => import("./views/auth/ForgotPassword"));
const Cart = lazy(() => import("./views/base/Cart"));
const Checkout = lazy(() => import("./views/base/Checkout"));
const Success = lazy(() => import("./views/base/Success"));
const Fail = lazy(() => import("./views/base/Fail"));
const Profile = lazy(() => import("./views/student/Profile"));
const ChangePassword = lazy(() => import("./views/student/ChangePassword"));
const StudentCourseDetail = lazy(() => import("./views/student/StudentCourseDetail"));
const StudentCourseLectureDetail = lazy(()=> import("./views/student/StudentCourseLectureDetail"))
const CartCheckout = lazy(() => import("./views/student/CartCheckout"));
const NotFound = lazy(() => import("./views/base/NotFound"));

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await apiInstance.get(`/course/cart/${CartID()}`);
      setCartCount(res.data.length);
    } catch (error) {
      console.error("Error fetching cart:", error);
      // Fallback delay before removing loader if error occurs.
      setTimeout(() => setLoading(false), 5000);
      return;
    }
    setLoading(false);
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
              <div className="loading-overlay">
                <div className="spinner"></div>
                <p>Loading, please wait...</p>
              </div>
            ) : (
              <Suspense fallback={<div className="spinner">Loading...</div>}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/course-detail/:slug" element={<CourseDetail />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/create-new-password" element={<CreateNewPassword />} />
                  <Route path="/forget-password" element={<ForgetPassword />} />

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
                    path="/student/course/:slug/detail"
                    element={
                      <ProtectedRoute>
                        <StudentCourseLectureDetail />
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

                  {/* Not Found */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            )}
          </MainWrapper>
        </BrowserRouter>
      </CartContext.Provider>
    </LoadingContext.Provider>
  );
}

export default App;
