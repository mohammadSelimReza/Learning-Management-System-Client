import { lazy } from "react";

// Public Pages
export const Index = lazy(() => import("../views/base/Index"));
export const Courses = lazy(() => import("../views/base/Courses"));
export const CourseDetail = lazy(() => import("../views/base/CourseDetail"));
export const Register = lazy(() => import("../views/auth/Register"));
export const Login = lazy(() => import("../views/auth/Login"));
export const Logout = lazy(() => import("../views/auth/Logout"));
export const CreateNewPassword = lazy(() => import("../views/auth/CreateNewPassword"));
export const ForgetPassword = lazy(() => import("../views/auth/ForgotPassword"));
export const Cart = lazy(() => import("../views/base/Cart"));
export const Checkout = lazy(() => import("../views/base/Checkout"));
export const Success = lazy(() => import("../views/base/Success"));
export const Fail = lazy(() => import("../views/base/Fail"));
export const Profile = lazy(() => import("../views/student/Profile"));
export const ChangePassword = lazy(() => import("../views/student/ChangePassword"));
export const StudentCourseDetail = lazy(() => import("../views/student/StudentCourseDetail"));
export const StudentCourseLectureDetail = lazy(() => import("../views/student/StudentCourseLectureDetail"));
export const CartCheckout = lazy(() => import("../views/student/CartCheckout"));
export const NotFound = lazy(() => import("../views/base/NotFound"));

// Instructor Pages
export const InstructorDashboard = lazy(() => import("../views/instructor/Dashboard"));
export const CourseCreate = lazy(() => import("../views/instructor/CourseCreate"));
export const InstructorViewCourse = lazy(() => import("../views/instructor/Courses"));
export const InstructorEarnings = lazy(() => import("../views/instructor/Earning"));
export const InstructorProfile = lazy(() => import("../views/instructor/Profile"));
export const InstructorPassChange = lazy(() => import("../views/instructor/ChangePassword"));
