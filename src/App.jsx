import React, { useEffect, useState, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainWrapper from "./layouts/MainWrapper";
import ProtectedRoute from "./utils/ProtectedRoutes";
import apiInstance from "./utils/axios";
import CartID from "./views/plugin/CartID";
import { CartContext } from "./views/plugin/useContext";
import { LoadingContext } from "./views/plugin/useLoading";
import "./index.css";
import { AboutUs, ContactUs } from "./views/base/Info";

// Import Lazy Components
import {
  Index, Courses, CourseDetail, Register, Login, Logout,
  CreateNewPassword, ForgetPassword, Cart, Checkout, Success, Fail,
  Profile, ChangePassword, StudentCourseDetail, StudentCourseLectureDetail,
  CartCheckout, NotFound, InstructorDashboard, CourseCreate,
  InstructorViewCourse, InstructorEarnings, InstructorProfile, InstructorPassChange
} from "./utils/LazyImports";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const access = localStorage.getItem("access_token");

  useEffect(() => {
    if (access) {
      fetchCart();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await apiInstance.get(`/course/cart/${CartID()}`);
      setCartCount(res.data.length);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setTimeout(() => setLoading(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoadingContext.Provider value={[loading, setLoading]}>
      <CartContext.Provider value={[cartCount, setCartCount]}>
        <BrowserRouter>
          <MainWrapper>
            <Suspense fallback={<div className="loading-overlay"><p>Loading...</p></div>}>
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
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact-us" element={<ContactUs />} />

                {/* Protected Routes */}
                <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                <Route path="/checkout/:order_oid" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                <Route path="/payment/success/:tran_id" element={<ProtectedRoute><Success /></ProtectedRoute>} />
                <Route path="/payment/fail" element={<ProtectedRoute><Fail /></ProtectedRoute>} />
                <Route path="/payment/cancel" element={<ProtectedRoute><Success /></ProtectedRoute>} />

                {/* Student Routes */}
                <Route path="/student/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
                <Route path="/student/checkout" element={<ProtectedRoute><CartCheckout /></ProtectedRoute>} />
                <Route path="/student/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/student/course/detail" element={<ProtectedRoute><StudentCourseDetail /></ProtectedRoute>} />
                <Route path="/student/course/lecture/:lecture_id" element={<ProtectedRoute><StudentCourseLectureDetail /></ProtectedRoute>} />
                <Route path="/student/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />

                {/* Instructor Routes */}
                <Route path="/instructor/dashboard" element={<ProtectedRoute><InstructorDashboard /></ProtectedRoute>} />
                <Route path="/instructor/course/create" element={<ProtectedRoute><CourseCreate /></ProtectedRoute>} />
                <Route path="/instructor/course/view" element={<ProtectedRoute><InstructorViewCourse /></ProtectedRoute>} />
                <Route path="/instructor/earning" element={<ProtectedRoute><InstructorEarnings /></ProtectedRoute>} />
                <Route path="/instructor/profile" element={<ProtectedRoute><InstructorProfile /></ProtectedRoute>} />
                <Route path="/instructor/change-password" element={<ProtectedRoute><InstructorPassChange /></ProtectedRoute>} />

                {/* Not Found */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </MainWrapper>
        </BrowserRouter>
      </CartContext.Provider>
    </LoadingContext.Provider>
  );
}

export default App;
