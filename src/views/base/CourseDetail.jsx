import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import apiInstance from "../../utils/axios";
import moment from "moment/moment";
import useAxios from "../../utils/useAxios";
import CartID from "../plugin/CartID";
import UserData from "../plugin/UserData";
import Swal from "sweetalert2";
import Toast from "../plugin/Toast";
import GetCurrentAddress from "../plugin/useLocation";
import { CartContext } from "../plugin/useContext";
import { useAuthStore } from "../../store/auth";
import { OrbitProgress } from "react-loading-indicators";
import "./CourseDetail.css";
function CourseDetail() {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useContext(CartContext);
  const param = useParams();
  const country = GetCurrentAddress()?.country;
  const user_id = UserData()?.user_id;
  const cartId = CartID();
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(true);
  const [activeTab, setActiveTab] = useState("course-pills-1");
  const navigate = useNavigate();
  const fetchCart = async () => {
    try {
      setLoading(true);
      const resCourses = await apiInstance.get(`/course/course/`);
      const res = await useAxios().get(`/course/cart/${CartID()}/`);
      setCourses(resCourses.data.slice(0, 4));
      setCart(res.data);
      setCartCount(res.data.length);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setLoading(false);
    }
  };
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await apiInstance.get(`/course/course/${param?.slug}`);
      setCourse(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching course:", error);
      setLoading(false);
    }
  };

  // ➕ Add to Cart
  const addToCart = async (courseId, userId, countryName, cartId) => {
    setProcessing(true);
    const isLoggedIn = useAuthStore.getState().isLoggedIn();
    if (!isLoggedIn) {
      Toast().fire({
        title: "You need to login first!!!",
        icon: "warning",
      });
      return navigate("/login");
    }
    const formData = {
      course_id: courseId,
      user_id: userId,
      cart_id: cartId,
      country: countryName,
    };

    try {
      await useAxios().post("/course/cart/add/", formData);

      Toast().fire({
        title: "Added To Cart",
        icon: "success",
      });
      if (fetchCart) fetchCart();
      setProcessing(false);
      navigate("/cart");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: `${error}`,
      });
      setProcessing(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCart();
  }, []);

  // ✅ Re-fetch when `cartCount` changes (ensures UI updates)
  useEffect(() => {
    fetchCart();
  }, [cartCount]);
  return (
    <>
      <BaseHeader />
      {loading ? (
        <>
          <div className="text-center">
            <OrbitProgress
              variant="spokes"
              color="#32cd32"
              size="medium"
              text=""
              textColor=""
            />
          </div>
        </>
      ) : (
        <>
          <>
            <section className="pb-0 py-lg-5">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8">
                    <div className="bg-light py-0 py-sm-5">
                      <div className="container">
                        <div className="row py-5">
                          <div className="col-lg-8">
                            {/* Badge */}
                            <h6 className="mb-3 font-base color-primary text-white py-2 px-4 rounded-2 d-inline-block">
                              {course?.category?.title}
                            </h6>
                            {/* Title */}
                            <h1 className="mb-3">{course?.title}</h1>
                            <p className="mb-3">
                              <p
                                className="mb-3"
                                dangerouslySetInnerHTML={{
                                  __html: `${course?.info?.slice(0, 50)}......`,
                                }}
                              ></p>
                            </p>
                            {/* Content */}
                            <ul className="list-inline mb-0">
                              <li className="list-inline-item h6 me-3 mb-1 mb-sm-0">
                                <i className="fas fa-star text-warning me-2" />
                                {course?.average_rating || 0} /5.0
                              </li>
                              <li className="list-inline-item h6 me-3 mb-1 mb-sm-0">
                                <i className="fas fa-user-graduate text-orange me-2" />
                                {course?.students?.length || 0} Enrolled
                              </li>
                              <li className="list-inline-item h6 me-3 mb-1 mb-sm-0">
                                <i className="fas fa-signal text-success me-2" />
                                {course?.level}
                              </li>
                              <li className="list-inline-item h6 me-3 mb-1 mb-sm-0">
                                <i className="bi bi-patch-exclamation-fill text-danger me-2" />
                                Date Published{" "}
                                {moment(course?.data).format("DD MMM,YYYY")}
                              </li>
                              <li className="list-inline-item h6 mb-0">
                                <i className="fas fa-globe text-info me-2" />
                                {course?.language}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Main content START */}
                    <div>
                      <div className="card shadow rounded-2 p-0">
                        {/* Tabs START */}
                        <div className="card-header border-bottom px-4 py-3">
                          {/* Tab Navigation */}
                          <ul
                            className="nav nav-pills mb-3"
                            id="course-pills-tab"
                            role="tablist"
                          >
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link active primary-text"
                                id="course-pills-tab-1"
                                data-bs-toggle="tab"
                                data-bs-target="#course-pills-1"
                                type="button"
                                role="tab"
                                aria-controls="course-pills-1"
                                aria-selected="true"
                              >
                                Description
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link primary-text"
                                id="course-pills-tab-2"
                                data-bs-toggle="tab"
                                data-bs-target="#course-pills-2"
                                type="button"
                                role="tab"
                                aria-controls="course-pills-2"
                                aria-selected="false"
                              >
                                Curriculum
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link primary-text"
                                id="course-pills-tab-3"
                                data-bs-toggle="tab"
                                data-bs-target="#course-pills-3"
                                type="button"
                                role="tab"
                                aria-controls="course-pills-3"
                                aria-selected="false"
                              >
                                Instructor
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link primary-text"
                                id="course-pills-tab-4"
                                data-bs-toggle="tab"
                                data-bs-target="#course-pills-4"
                                type="button"
                                role="tab"
                                aria-controls="course-pills-4"
                                aria-selected="false"
                              >
                                Reviews
                              </button>
                            </li>
                          </ul>
                        </div>
                        {/* Tabs END */}
                        {/* Tab contents START */}
                        <div className="card-body p-4">
                          <div
                            className="tab-content pt-2"
                            id="course-pills-tabContent"
                          >
                            {/* Content START */}
                            <div
                              className="tab-pane fade show active"
                              id="course-pills-1"
                              role="tabpanel"
                              aria-labelledby="course-pills-tab-1"
                            >
                              <h5 className="mb-3">Course Description</h5>
                              <p> {course?.info} </p>
                              {/* Course detail END */}
                            </div>
                            {/* Content END */}
                            {/* Content START */}
                            <div
                              className="tab-pane fade"
                              id="course-pills-2"
                              role="tabpanel"
                              aria-labelledby="course-pills-tab-2"
                            >
                              {/* Course accordion START */}
                              <div
                                className="accordion accordion-icon accordion-bg-light"
                                id="accordionExample2"
                              >
                                {/* Item */}
                                {course?.curriculum?.map((item) => (
                                  <div key={item?.varient_id}>
                                    <div className="accordion-item mb-3">
                                      <h6
                                        className="accordion-header font-base"
                                        id="heading-1"
                                      >
                                        <button
                                          className="accordion-button fw-bold rounded d-sm-flex d-inline-block collapsed"
                                          type="button"
                                          data-bs-toggle="collapse"
                                          data-bs-target={`#collapse-${item?.varient_id}`}
                                          aria-expanded="true"
                                          aria-controls={`collapse-${item?.varient_id}`}
                                        >
                                          {item?.title}
                                          <span className="small ms-0 ms-sm-2">
                                            ({item?.variant_items?.length}{" "}
                                            Lectures)
                                          </span>
                                        </button>
                                      </h6>
                                      <div
                                        id={`collapse-${item?.varient_id}`}
                                        className="accordion-collapse collapse show"
                                        aria-labelledby="heading-1"
                                        data-bs-parent="#accordionExample2"
                                      >
                                        <div className="accordion-body mt-3">
                                          {item?.variant_items?.map(
                                            (variant_item) => (
                                              <div>
                                                {/* Course lecture */}
                                                <div className="d-flex justify-content-between align-items-center">
                                                  <div className="position-relative d-flex align-items-center">
                                                    <a
                                                      href="#"
                                                      className="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static"
                                                    >
                                                      <i className="fas fa-play me-0" />
                                                    </a>
                                                    <span className="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">
                                                      {variant_item?.title}
                                                    </span>
                                                  </div>
                                                  <p className="mb-0">2m 10s</p>
                                                </div>
                                                <hr /> {/* Divider */}
                                              </div>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              {/* Course accordion END */}
                            </div>
                            {/* Content END */}
                            {/* Content START */}
                            <div
                              className="tab-pane fade"
                              id="course-pills-3"
                              role="tabpanel"
                              aria-labelledby="course-pills-tab-3"
                            >
                              {/* Card START */}
                              <div className="card mb-0 mb-md-4">
                                <div className="row g-0 align-items-center">
                                  <div className="col-md-5">
                                    {/* Image */}
                                    <img
                                      src={course?.teacher?.image}
                                      className="img-fluid rounded-3"
                                      alt="instructor-image"
                                    />
                                  </div>
                                  <div className="col-md-7">
                                    {/* Card body */}
                                    <div className="card-body">
                                      {/* Title */}
                                      <h3 className="card-title mb-0">
                                        {course?.teacher?.full_name}
                                      </h3>
                                      <p className="mb-2">
                                        {course?.teacher?.bio}
                                      </p>
                                      {/* Social button */}
                                      <ul className="list-inline mb-3">
                                        <li className="list-inline-item me-3">
                                          <a
                                            href="#"
                                            className="fs-5 text-twitter primary-text"
                                          >
                                            <i className="fab fa-twitter-square" />
                                          </a>
                                        </li>
                                        <li className="list-inline-item me-3">
                                          <a
                                            href="#"
                                            className="fs-5 text-facebook primary-text"
                                          >
                                            <i className="fab fa-facebook-square" />
                                          </a>
                                        </li>
                                        <li className="list-inline-item me-3">
                                          <a
                                            href="#"
                                            className="fs-5 text-linkedin primary-text"
                                          >
                                            <i className="fab fa-linkedin" />
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* Card END */}
                              {/* Instructor info */}
                              <h5 className="mb-3">About Instructor</h5>
                              <p className="mb-3">{course?.teacher?.about}</p>
                            </div>
                            <div
                              className="tab-pane fade"
                              id="course-pills-4"
                              role="tabpanel"
                              aria-labelledby="course-pills-tab-4"
                            >
                              {/* Review START */}
                              <div className="row mb-1">
                                <h5 className="mb-4">Our Student Reviews</h5>
                              </div>

                              <div className="row">
                                {course?.reviews?.map((review) => (
                                  <div>
                                    <div className="d-md-flex my-4">
                                      <div className="avatar avatar-xl me-4 flex-shrink-0">
                                        <img
                                          className="avatar-img rounded-circle"
                                          src={
                                            review?.profile?.image ||
                                            `https://res.cloudinary.com/dofqxmuya/image/upload/v1731789905/LMS/o0ofryggjkfo9ob8qusz.jpg`
                                          }
                                          style={{
                                            width: "50px",
                                            height: "50px",
                                            borderRadius: "50%",
                                            objectFit: "cover",
                                          }}
                                          alt="avatar"
                                        />
                                      </div>
                                      {/* Text */}
                                      <div>
                                        <div className="d-sm-flex mt-1 mt-md-0 align-items-center">
                                          <h5 className="me-3 mb-0">
                                            {review?.profile?.full_name}{" "}
                                          </h5>
                                          {/* Review star */}
                                          <ul className="list-inline mb-0">
                                            <i className="fas fa-star text-warning" />
                                            <i className="fas fa-star text-warning" />
                                            <i className="fas fa-star text-warning" />
                                            <i className="fas fa-star text-warning" />
                                            <i className="far fa-star text-warning" />
                                          </ul>
                                        </div>
                                        {/* Info */}
                                        <p className="small mb-2">5 days ago</p>
                                        <p className="mb-2">{review?.review}</p>
                                        {/* Like and dislike button */}
                                      </div>
                                    </div>
                                    {/* Comment children level 1 */}
                                    <hr />
                                  </div>
                                ))}
                                {/* Review item END */}
                                {/* Divider */}
                                <hr />
                              </div>
                              {/* Student review END */}
                            </div>
                            {/* Content END */}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Main content END */}
                  </div>
                  {/* Right sidebar START */}
                  <div className="col-lg-4 pt-5 pt-lg-0">
                    <div className="row mb-5 mb-lg-0">
                      <div className="col-md-6 col-lg-12">
                        {/* Video START */}
                        <div className="card shadow p-2 mb-4 z-index-9">
                          <div className="overflow-hidden rounded-3">
                            <img
                              src={course?.image}
                              className="card-img"
                              alt="course image"
                            />
                            <div
                              className="m-auto rounded-2 mt-2 d-flex justify-content-center align-items-center"
                              style={{ backgroundColor: "#ededed" }}
                            >
                              <a
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                href="https://www.youtube.com/embed/tXHviS-4ygo"
                                className="btn btn-lg text-danger btn-round btn-white-shadow mb-0"
                                data-glightbox=""
                                data-gallery="course-video"
                              >
                                <i className="fas fa-play" />
                              </a>
                              <span
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                className="fw-bold"
                              >
                                Course Introduction Video
                              </span>

                              <div
                                className="modal fade"
                                id="exampleModal"
                                tabIndex={-1}
                                aria-labelledby="exampleModalLabel"
                                aria-hidden="true"
                              >
                                <div className="modal-dialog">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h1
                                        className="modal-title fs-5"
                                        id="exampleModalLabel"
                                      >
                                        Introduction Videos
                                      </h1>
                                      <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                      />
                                    </div>
                                    <div className="modal-body">...</div>
                                    <div className="modal-footer">
                                      <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                      >
                                        Close
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-primary"
                                      >
                                        Save changes
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Card body */}
                          <div className="card-body px-3">
                            {/* Info */}
                            <div className="d-flex justify-content-between align-items-center">
                              {/* Price and time */}
                              <div>
                                <div className="d-flex align-items-center">
                                  <h3 className="fw-bold mb-0 me-2">
                                    ${course?.price}{" "}
                                  </h3>
                                </div>
                              </div>
                              {/* Share button with dropdown */}
                              <div className="dropdown">
                                {/* Share button */}
                                <a
                                  href="#"
                                  className="btn btn-sm btn-light rounded small"
                                  role="button"
                                  id="dropdownShare"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="fas fa-fw fa-share-alt" />
                                </a>
                                {/* dropdown button */}
                                <ul
                                  className="dropdown-menu dropdown-w-sm dropdown-menu-end min-w-auto shadow rounded"
                                  aria-labelledby="dropdownShare"
                                >
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      <i className="fab fa-twitter-square me-2" />
                                      Twitter
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      <i className="fab fa-facebook-square me-2" />
                                      Facebook
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      <i className="fab fa-linkedin me-2" />
                                      LinkedIn
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      <i className="fas fa-copy me-2" />
                                      Copy link
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            {/* Buttons */}
                            <div className="mt-3 d-sm-flex justify-content-sm-between ">
                              {!processing ? (
                                <button
                                  onClick={() =>
                                    addToCart(
                                      course?.course_id,
                                      user_id,
                                      "BD",
                                      cartId
                                    )
                                  }
                                  className="btn btn-main mb-0 w-100 me-2"
                                  disabled={true}
                                >
                                  <i className="fas fa-shopping-cart"></i>{" "}
                                  Adding...
                                </button>
                              ) : (
                                <button
                                  onClick={() =>
                                    addToCart(
                                      course?.course_id,
                                      user_id,
                                      "BD",
                                      cartId
                                    )
                                  }
                                  className="btn btn-outline-main mb-0 w-100 me-2"
                                >
                                  <i className="fas fa-shopping-cart"></i> Add
                                  To Cart
                                </button>
                              )}

                              <Link
                                to="/cart/"
                                className="btn btn-success mb-0 w-100"
                              >
                                Enroll Now{" "}
                                <i className="fas fa-arrow-right"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                        {/* Video END */}
                        {/* Course info START */}
                        <div className="card card-body shadow p-4 mb-4">
                          {/* Title */}
                          <h4 className="mb-3">This course includes</h4>
                          <ul className="list-group list-group-borderless">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              <span className="h6 fw-light mb-0">
                                <i className="fas fa-fw fa-book-open primary-text me-2" />
                                Lectures
                              </span>
                              <span>{course?.curriculum?.length || 0} </span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center d-none">
                              <span className="h6 fw-light mb-0">
                                <i className="fas fa-fw fa-clock primary-text me-2" />
                                Duration
                              </span>
                              <span>4h 50m</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              <span className="h6 fw-light mb-0">
                                <i className="fas fa-fw fa-signal primary-text me-2" />
                                Skills
                              </span>
                              <span>{course?.level} </span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              <span className="h6 fw-light mb-0">
                                <i className="fas fa-fw fa-globe primary-text me-2" />
                                Language
                              </span>
                              <span>{course?.language} </span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              <span className="h6 fw-light mb-0">
                                <i className="fas fa-fw fa-user-clock primary-text me-2" />
                                Published
                              </span>
                              <span>
                                {moment(course?.date).format(
                                  "DD MMM,YYYY"
                                )}{" "}
                              </span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              <span className="h6 fw-light mb-0">
                                <i className="fas fa-fw fa-medal primary-text me-2" />
                                Certificate
                              </span>
                              <span>Yes</span>
                            </li>
                          </ul>
                        </div>
                        {/* Course info END */}
                      </div>
                    </div>
                    {/* Row End */}
                  </div>
                  {/* Right sidebar END */}
                </div>
                {/* Row END */}
              </div>
            </section>
            {/* related course */}
            <section className="mb-5">
              <div className="container mb-lg-8 ">
                <div className="row mb-5 mt-3">
                  {/* col */}
                  <div className="col-12">
                    <div className="mb-6">
                      <h2 className="mb-1 h1">Related Courses</h2>
                      <p>
                        These are the most popular courses among Geeks Courses
                        learners worldwide in year 2022
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                      {courses.map((item) => (
                        <div className="col">
                          {/* Card */}
                          <div className="custom-card card card-hover">
                            <Link to={`/course-detail/slug/`}>
                              <img
                                src={item?.image}
                                alt="course"
                                className="custom-card-img card-img-top"
                              />
                            </Link>
                            <div className="custom-card-body card-body">
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="badge color-primary">
                                  {item?.level}
                                </span>
                                <a href="#" className="fs-5">
                                  <i className="fas fa-heart text-danger align-middle" />
                                </a>
                              </div>
                              <h4 className="mb-2 custom-text-truncate text-truncate-line-2">
                                <Link
                                  to={`/course-detail/slug/`}
                                  className="text-inherit text-decoration-none text-dark fs-5"
                                >
                                  {item?.title}
                                </Link>
                              </h4>
                              <small>By: Claire Evans</small> <br />
                              <small>16k Students</small> <br />
                              <div className="lh-1 mt-3 d-flex">
                                <span className="align-text-top">
                                  <span className="fs-6">
                                    <i className="fas fa-star text-warning"></i>
                                    <i className="fas fa-star text-warning"></i>
                                    <i className="fas fa-star text-warning"></i>
                                    <i className="fas fa-star text-warning"></i>
                                    <i className="fas fa-star-half text-warning"></i>
                                  </span>
                                </span>
                                <span className="text-warning">4.5</span>
                                <span className="fs-6 ms-2">(9,300)</span>
                              </div>
                            </div>
                            <div className="custom-card-footer card-footer">
                              <div className="row align-items-center g-0">
                                <div className="col">
                                  <h5 className="mb-0">$39.00</h5>
                                </div>
                                <div className="col-auto">
                                  <a
                                    href="#"
                                    className="text-inherit text-decoration-none btn btn-main"
                                  >
                                    <i className="fas fa-shopping-cart primary-text align-middle me-2 text-white" />
                                    Enroll Now
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        </>
      )}

      <BaseFooter />
    </>
  );
}

export default CourseDetail;
