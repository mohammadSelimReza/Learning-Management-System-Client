import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SiCoursera } from "react-icons/si";
import useAxios from "../../utils/useAxios";
import UserData from "../plugin/UserData";
import CartID from "../plugin/CartID";
import { CartContext } from "../plugin/useContext";
import { logout } from "../../utils/auth";
import "./BaseHeader.css";
import { useAuthStore } from "../../store/auth";
function BaseHeader() {
  const [cartCount, setCartCount] = useContext(CartContext);
  const [teacher,setTeacher] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn());
  const name = UserData()?.full_name;
  const user_id = UserData()?.user_id;
  const navigate = useNavigate();
  const signout = () => {
    logout();
    navigate("/logout");
  };
  const fetchTeacher = async() =>{
    const res = await useAxios().get(`/user/profile-upate/${user_id}`)
    if(res.data?.user_type === "Teacher"){
      setTeacher(true)
    }
    else{
      setTeacher(false)
    }
  }
  const menuList = (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/">
          <i className="fas fa-home"></i> Home
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/about-us">
          <i className="fas fa-address-card"></i> About Us
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/courses">
          <SiCoursera /> Courses
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/contact-us/">
          <i className="fas fa-phone"></i> Contact Us
        </Link>
      </li>
      {isLoggedIn && !teacher ? (
        <>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-graduation-cap"></i> Student
            </a>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to={`/student/checkout/`}>
                  {" "}
                  <i className="bi bi-grid-fill"></i> My Checkout
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to={`/student/course/detail`}>
                  {" "}
                  <i className="fas fa-shopping-cart"></i>My Courses
                </Link>
              </li>

              <li>
                <Link className="dropdown-item" to={`/student/profile/`}>
                  {" "}
                  <i className="fas fa-gear"></i> Profile & Settings
                </Link>
              </li>
            </ul>
          </li>
        </>
      ) : null}
    </>
  );
  return (
    <div children="web-navbar">
      <nav
        className="navbar navbar-custom navbar-expand-lg bg-body-tertiary"
        data-bs-theme="white"
      >
        <div className="container">
          <div className="brand-title w-side">
            <Link className="navbar-brand" to="/">
              Edusoft
            </Link>
          </div>
          <div className="center-part w-center">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <ul className="center-nav navbar-nav me-auto mb-2 mb-lg-0">
              {menuList}
            </ul>
          </div>
          <div
            className="collapse navbar-collapse w-25 end-part"
            id="navbarSupportedContent"
          >
            <ul className="d-lg-none navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/pages/contact-us/">
                  {" "}
                  <i className="fas fa-phone"></i> Contact Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/pages/about-us/">
                  <i className="fas fa-address-card"></i> About Us
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-chalkboard-user"></i> Instructor
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      className="dropdown-item"
                      to={`/instructor/dashboard/`}
                    >
                      <i className="bi bi-grid-fill"></i> Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={`/instructor/courses/`}>
                      <i className="fas fa-shopping-cart"></i> My Courses
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to={`/instructor/create-course/`}
                    >
                      <i className="fas fa-plus"></i> Create Course
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={`/instructor/reviews/`}>
                      <i className="fas fa-star"></i> Reviews{" "}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to={`/instructor/question-answer/`}
                    >
                      <i className="fas fa-envelope"></i> Q/A{" "}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to={`/instructor/students/`}
                    >
                      <i className="fas fa-users"></i> Students{" "}
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={`/instructor/earning/`}>
                      <i className="fas fa-dollar-sign"></i> Earning{" "}
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item" to={`/instructor/profile/`}>
                      <i className="fas fa-gear"></i> Settings & Profile{" "}
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-graduation-cap"></i> Student
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={`/student/dashboard/`}>
                      {" "}
                      <i className="bi bi-grid-fill"></i> Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={`/student/courses/`}>
                      {" "}
                      <i className="fas fa-shopping-cart"></i>My Courses
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item" to={`/student/wishlist/`}>
                      {" "}
                      <i className="fas fa-heart"></i> Wishlist{" "}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to={`/student/question-answer/`}
                    >
                      {" "}
                      <i className="fas fa-envelope"></i> Q/A{" "}
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={`/student/profile/`}>
                      {" "}
                      <i className="fas fa-gear"></i> Profile & Settings
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            <div className="user-auth">
              {name ? (
                <>
                  <Link className="btn btn-success ms-2" to="/cart/">
                    Cart ({cartCount}) <i className="fas fa-shopping-cart"> </i>
                  </Link>
                  <button onClick={signout} className="btn btn-danger ms-2">
                    Logout <i className="fas fa-user-plus"> </i>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login/"
                    className="btn btn-main ms-2"
                    type="submit"
                  >
                    Login <i className="fas fa-sign-in-alt"></i>
                  </Link>
                  <Link
                    to="/register/"
                    className="btn btn-main ms-2"
                    type="submit"
                  >
                    Register <i className="fas fa-user-plus"> </i>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default BaseHeader;
