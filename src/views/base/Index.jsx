import React, { useEffect, useState } from "react";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import { Link, useNavigate } from "react-router-dom";
import apiInstance from "../../utils/axios";
import {
  FaFlag,
  FaLayerGroup,
  FaVideo,
  FaLifeRing,
  FaCheck,
  FaPlay,
  FaUserGraduate,
  FaBook,
  FaCheckCircle,
  FaStar,
  FaRegStar,
} from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";
import Countdown from "react-countdown";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Container, Row, Col } from "react-bootstrap";
import "./main.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import useAxios from "../../utils/useAxios";
import UserData from "../plugin/UserData";
import CartID from "../plugin/CartID";
import Toast from "../plugin/Toast";
import { OrbitProgress } from "react-loading-indicators";

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <>
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} className="text-warning" />
      ))}
      {halfStar && <FaStarHalfAlt className="text-warning" />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} className="text-muted" />
      ))}
    </>
  );
};

function Index() {
  const [course, setCourse] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [email, setEmail] = useState("");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const user_id = UserData()?.user_id;
  const [testimonials, setTestimonials] = useState([]);
  const navigate = useNavigate();
  const [loading,setLoading] = useState(true);
  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.get("/course/course/");
      const blogRes = await apiInstance.get("/blog/");
      const resReview = await apiInstance.get("/review/");
      setBlogData(blogRes.data);
      setCourse(res.data.slice(0, 3));
      setTestimonials(resReview.data?.slice(3,6));
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const features = [
    {
      icon: <FaFlag className="primary-text display-4 mb-3" />,
      title: "Expert Teacher",
      description:
        "Develop skills for career of various majors including computer.",
    },
    {
      icon: <FaLayerGroup className="primary-text display-4 mb-3" />,
      title: "Self Development",
      description:
        "Develop skills for career of various majors including computer.",
    },
    {
      icon: <FaVideo className="primary-text display-4 mb-3" />,
      title: "Remote Learning",
      description:
        "Develop skills for career of various majors including language.",
    },
    {
      icon: <FaLifeRing className="primary-text display-4 mb-3" />,
      title: "Life Time Support",
      description:
        "Develop skills for career of various majors including language.",
    },
  ];
  const coureDetailView = async (slug) => {
    setLoading(true)
    try {
      const res = await apiInstance.get(`/course/course/${slug}`);
      console.log(res.data);
      setLoading(false)
      navigate(`/course-detail/${res.data?.slug}`);
    } catch (error) {
      setLoading(false)
    }
  };
  const handleSubscribe = (e) => {
    e.preventDefault();
    Toast().fire({
      title:`Subscribed with: ${email}`,
      icon:"success", 
    });
    setEmail("");
  };
  console.log(course)
  return (
    <>
      <BaseHeader />
      {/* banner */}
      <section className="banner">
        {/* container */}
        <div className="container">
          {/* row */}
          <div className="row align-items-center">
            {/* col */}
            <div className="col-lg-6 mb-6 mb-lg-0">
              <div>
                {/* heading */}
                <h5 className="text-dark mb-4 text-white">
                  <i className="fe fe-check icon-xxs icon-shape bg-light-success text-success rounded-circle me-2" />
                  Most trusted education platform
                </h5>
                {/* heading */}
                <h1 className="display-3 fw-bold mb-3 text-white">
                  Grow your skills and advance career
                </h1>
                {/* para */}
                <p className="pe-lg-10 mb-5 text-white">
                  Start, switch, or advance your career with more than 5,000
                  courses, Professional Certificates, and degrees from
                  world-class universities and companies.
                </p>
                {/* btn */}
                <Link
                  to="/courses"
                  className="btn btn-main fs-4 text-inherit ms-3"
                >
                  Our Courses
                </Link>
                <Link
                  to="/register"
                  className="btn btn-secondary fs-4 text-inherit ms-3"
                >
                  Sign Up
                </Link>
              </div>
            </div>
            {/* col */}
            <div className="col-lg-6 d-flex justify-content-center"></div>
          </div>
        </div>
      </section>
      {/* motivation */}
      <section className="motivation container">
        <section className="py-5 text-center">
          <h4 className="text-success text-uppercase fw-semibold">
            Maximize Your Potentials
          </h4>
          <h2 className="fw-bold text-dark">
            Learn the secrets to{" "}
            <span className="primary-text">Life Success</span>
          </h2>
          <p className="text-muted mx-auto w-50">
            The ultimate planning solution for busy women who want to reach
            their personal goals
          </p>

          <div className="row mt-5">
            {features.map((feature, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="d-flex flex-column align-items-center">
                  {feature.icon}
                  <h3 className="h5 fw-bold text-black">{feature.title}</h3>
                  <p className="text-muted small">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
      {/* addvertersing */}
      <section className="add container py-5">
        <div className="row align-items-center">
          {/* Left Side - Video Thumbnail */}
          <div className="col-md-6">
            <div className="position-relative">
              {/* Thumbnail Image */}
              <img
                src="https://res.cloudinary.com/dofqxmuya/image/upload/v1739138856/LMS/kts9tflzg8ddlykjy5uy.jpg"
                alt="Video Thumbnail"
                className="img-fluid rounded shadow"
              />

              {/* Gradient Overlay */}
              <div
                className="position-absolute top-50 start-50 translate-middle w-100 h-100"
                style={{
                  background:
                    "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6))",
                  borderRadius: "10px",
                }}
              ></div>

              {/* Play Button & Loader */}
              <div className="position-absolute top-50 start-50 translate-middle d-flex flex-column align-items-center">
                <TailSpin
                  visible={true}
                  height="80"
                  width="80"
                  color="#fff"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
                <div className="position-absolute top-50 start-50 translate-middle d-flex flex-column align-items-center btn-play">
                  <FaPlay />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="col-md-6">
            <h6 className="text-uppercase text-success fw-semibold">
              Self Development Course
            </h6>
            <h2 className="fw-bold text-dark">
              Get Instant Access To{" "}
              <span className="primary-text">Expert Solution</span>
            </h2>
            <p className="text-muted">
              The ultimate planning solution for busy women who want to reach
              their personal goals. Effortless, comfortable, eye-catching unique
              detail.
            </p>
            <ul className="list-unstyled">
              <li className="mb-2">
                <FaCheck className="text-success me-2" />
                <strong>High Quality Video Details</strong>
              </li>
              <li className="mb-2">
                <FaCheck className="text-success me-2" />
                <strong>Powerful Audience</strong>
              </li>
              <li className="mb-2">
                <FaCheck className="text-success me-2" />
                <strong>Premium Content Worldwide</strong>
              </li>
            </ul>
            <Link to="/courses" className="btn btn-success">
              Our Courses
            </Link>
          </div>
        </div>
      </section>
      {/* courses */}
      <section className="courses mb-5 bg-color">
        <div className="container mb-lg-8 ">
          <div className="row mb-5 mt-3">
            {/* col */}
            <div className="col-12">
              <div className="mb-6 text-center">
                <h2 className="mb-1 h1">🔥Most Popular Courses</h2>
                <p>
                  These are the most popular courses among Geeks Courses
                  learners worldwide in year 2022
                </p>
              </div>
            </div>
          </div>
          <div className="container py-5">
            <div className="row g-4">
              {
                loading ?
                (<div className="text-center">
                <OrbitProgress variant="spokes" color="#32cd32" size="medium" text="" textColor="" />
                </div>)
                :
                (
                  <>
                  {course.map((item) => (
                <div key={item?.course_id} className="col-md-4">
                  <div className="card border-0 shadow-sm rounded overflow-hidden">
                    {/* Image with Price Badge */}
                    <div
                      onClick={() => coureDetailView(item?.slug)}
                      className="position-relative"
                    >
                      <img
                        src={
                          item?.image ||
                          "https://geeksui.codescandy.com/geeks/assets/images/course/course-css.jpg"
                        }
                        alt="course"
                        className="card-img-top"
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                        }}
                      />
                      <span className="position-absolute bottom-0 end-0 m-2 badge bg-success fs-6 p-2">
                        ${item?.price}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="card-body bg-white">
                      <span className="text-uppercase text-success fw-semibold fs-6">
                        {item?.category?.title}
                      </span>
                      <h5 className="fw-bold text-dark mt-1">
                        <div
                          onClick={() => coureDetailView(item?.slug)}
                          className="text-decoration-none text-dark"
                        >
                          <p>{item?.title}</p>
                        </div>
                      </h5>
                      <div className="d-flex text-muted small">
                        <span className="me-3">
                          <FaUserGraduate className="me-1" />{" "}
                          {item?.students?.length} Students
                        </span>
                        <span>
                          <FaBook className="me-1" /> {item?.lectures?.length}{" "}
                          Lessons
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
                  </>
                )
              }
            </div>
            <p className="text-center py-5">
              Take the control of their life back and start doing things to make
              their dream come true.{" "}
              <Link to="/courses" className="primary-text">
                {" "}
                View all courses
              </Link>{" "}
            </p>
          </div>
        </div>
      </section>
      {/* stat */}
      <section className="stat pb-8" ref={ref}>
        <div className="container mb-lg-8">
          {/* Heading */}
          <div className="text-center mb-5">
            <p className="text-uppercase text-success fw-semibold">
              Maximize Your Potentials
            </p>
            <h2 className="fw-bold text-dark">
              We break down barriers so teams can focus on what matters –
              learning together to create an online career you love.
            </h2>
          </div>

          {/* Stats Row */}
          <div className="row text-center">
            {/* Instructors */}
            <div className="col-md-6 col-lg-3 border-top-md border-top pb-4 border-end-md">
              <h2 className="text-success fw-bold">
                {inView && <CountUp start={1} end={90} duration={2} />}
              </h2>
              <span className="fw-semibold">Instructors</span>
              <p className="text-muted small">
                Tempus imperdiet nulla malpellen tesque Malesuada libero
              </p>
            </div>

            {/* Total Courses */}
            <div className="col-md-6 col-lg-3 border-top-md border-top border-end-lg">
              <h2 className="text-success fw-bold">
                {inView && <CountUp start={1000} end={1450} duration={2} />}
              </h2>
              <span className="fw-semibold">Total Courses</span>
              <p className="text-muted small">
                Tempus imperdiet nulla malpellen tesque Malesuada libero
              </p>
            </div>

            {/* Registered Enrolls */}
            <div className="col-md-6 col-lg-3 border-top-lg border-top border-end-md">
              <h2 className="text-success fw-bold">
                {inView && <CountUp start={5000} end={5697} duration={2} />}
              </h2>
              <span className="fw-semibold">Registered Enrolls</span>
              <p className="text-muted small">
                Tempus imperdiet nulla malpellen tesque Malesuada libero
              </p>
            </div>

            {/* Countdown Timer */}
            <div className="col-md-6 col-lg-3 border-top-lg border-top">
              <h2 className="text-success fw-bold">
                <Countdown date={Date.now() + 1000 * 60 * 60 * 24 * 5} />
              </h2>
              <span className="fw-semibold">Enrollment Ends In</span>
              <p className="text-muted small">
                Hurry up! Limited spots available.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* support */}
      <section className="support py-5">
        <Container>
          <Row className="align-items-center">
            {/* Left Content */}
            <Col lg={6}>
              <p className="text-uppercase text-success fw-semibold">
                Why Choose Us
              </p>
              <h2 className="fw-bold text-dark">
                Unlock Your Potential with Our Expert Guidance
              </h2>
              <p className="text-muted">
                Join our learning community and gain access to high-quality
                resources, expert mentorship, and a seamless learning
                experience.
              </p>

              {/* Feature List */}
              <div className="d-flex align-items-start mb-3">
                <FaCheckCircle className="text-success fs-3 me-3" />
                <div>
                  <h5 className="fw-bold">Expert Instructors</h5>
                  <p className="text-muted mb-0">
                    Learn from industry-leading professionals and experts.
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-start mb-3">
                <FaCheckCircle className="text-success fs-3 me-3" />
                <div>
                  <h5 className="fw-bold">Flexible Learning</h5>
                  <p className="text-muted mb-0">
                    Access courses anytime, anywhere, at your own pace.
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-start">
                <FaCheckCircle className="text-success fs-3 me-3" />
                <div>
                  <h5 className="fw-bold">Career Growth</h5>
                  <p className="text-muted mb-0">
                    Enhance your skills and unlock new job opportunities.
                  </p>
                </div>
              </div>
            </Col>

            {/* Right Image */}
            <Col lg={6} className="text-center">
              <img
                src="https://res.cloudinary.com/dofqxmuya/image/upload/v1739144332/LMS/obmdx1arplbmwkn5nqp0.jpg"
                alt="Learning Together"
                className="img-fluid rounded"
              />
            </Col>
          </Row>
        </Container>
      </section>
      {/* review */}
      <section className="bg-gray-200 review bg-color ">
        <div className="container pb-8">
          <div className="row mb-lg-8 mb-5">
            <div className="offset-lg-1 col-lg-10 col-12 text-center">
              <h2 className="h1">What our students say</h2>
              <p>
                Hear from <span className="text-dark">teachers</span>,
                <span className="text-dark"> trainers</span>, and
                <span className="text-dark"> leaders</span> in the learning
                space about how Geeks empowers them to provide quality online
                learning experiences.
              </p>
            </div>
          </div>

          <div className="row justify-content-center align-items-center">
            {
              loading
              ?
              (<div className="text-center">
                <OrbitProgress variant="spokes" color="#32cd32" size="medium" text="" textColor="" />
                </div>)
                :
                (
                  <>
                  {testimonials.map((item) => (
              <div key={item.review_id} className="col-md-4">
                <div className="card d-flex justify-content-center align-items-center border-0 shadow-sm rounded text-center p-4">
                  <img
                    src={
                      item.profile.image ||
                      "https://res.cloudinary.com/dofqxmuya/image/upload/v1725378249/default_user_i0wpzv.png"
                    }
                    alt="User Avatar"
                    className="avatar avatar-lg rounded-circle mb-3"
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <p className="mb-3">“{item.review}”</p>
                    <div className="lh-1 mb-3">{renderStars(item.rating)}</div>
                    <h5 className="mb-0">{item.profile.full_name}</h5>
                    <span className="text-muted small">
                      {item.profile.user_type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
                  </>
                )
            }
            
          </div>
        </div>
      </section>
      {/* blog */}
      <section className="blog container text-center mt-5">
        <h5 className="text-success fw-semibold">BLOG NEWS</h5>
        <h2 className="fw-bold mb-3">Latest From The Blog</h2>
        <p className="mb-5 text-muted">
          The ultimate planning solution for busy professionals looking to
          achieve their goals.
        </p>
          {
            loading ?
            (<div className="text-center">
              <OrbitProgress variant="spokes" color="#32cd32" size="medium" text="" textColor="" />
              </div>)
              :
              (
                <>
                <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{
            delay: 5000, // Reduced delay for better engagement
            disableOnInteraction: false,
          }}
          breakpoints={{
            576: { slidesPerView: 1 }, // Mobile
            768: { slidesPerView: 2 }, // Tablets
            1024: { slidesPerView: 3 }, // Desktop
          }}
        >
          {blogData.map((blog, index) => (
            <SwiperSlide key={index} className="p-3">
              <div className="card border-0 shadow-sm rounded overflow-hidden">
                {/* Image */}
                <img
                  src={blog?.blog_img || `https://res.cloudinary.com/dofqxmuya/image/upload/v1739316718/tablet-which-you-can-read-blog_edsmki.jpg`}
                  className="card-img-top blog-img"
                  alt={blog.title}
                  style={{ width: "100%", height: "220px", objectFit: "cover" }}
                />

                {/* Card Content */}
                <div className="card-body text-start">
                  <h5 className="card-title fw-bold text-dark">{blog.title}</h5>
                  <p className="card-text text-muted">
                    {blog.blog_text.slice(0, 100)}...
                  </p>

                  {/* Read More Button */}
                  <div className="text-center mt-3">
                    <a href="#" className="btn btn-outline-main px-4">
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
                </>
              )
          }
        
      </section>

      {/* newsletter */}
      <section className="newsletter bg-light container">
        <div className="row justify-content-center">
          <div className="col-md-8  p-4 rounded text-center">
            <h6 className="text-success fw-bold">NEWSLETTER</h6>
            <h2 className="fw-bold">Subscribe to get latest news</h2>
            <form onSubmit={handleSubscribe} className="mt-3 d-flex">
              <input
                type="email"
                className="form-control me-2 px-4 py-3"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-success">
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>
      </section>
      <BaseFooter />
    </>
  );
}

export default Index;
