import React, { useEffect, useState } from "react";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";

import ReactPlayer from "react-player";
import { useParams } from "react-router";
import useAxios from "../../utils/useAxios";
import { OrbitProgress } from "react-loading-indicators";
import UserData from "../plugin/UserData";
import Toast from "../plugin/Toast";

function StudentCourseLectureDetail() {
  const [course, setCourse] = useState([]);
  const param = useParams();
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5); // Default to 5 stars
  const [review, setReview] = useState("");
  const [profile, setProfile] = useState([]);
  const user_id = UserData()?.user_id;
  const fetchData = async () => {
    setLoading(true);
    try {
      console.log("1");
      const res = await useAxios().get(`/course/course/${param?.slug}`);
      console.log("2");
      setCourse(res.data);
      setLoading(false);
    } catch (error) {
      console.log("3");
      console.error("Error fetching course:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const reviewData = {
      user_id: user_id,
      course_id: course?.course_id,
      review: review,
      rating: rating,
    };
    console.log(JSON.stringify(reviewData));
    try {
      const res = await useAxios().post(`/course/review/`, reviewData);
      if (res.status === 201) {
        Toast().fire({
          title: "Review posted successfully!",
          icon: "success",
        });
        setReview("");
        setRating(5);
      }
    } catch (error) {
      Toast().fire({
        title: "Failed to post review.",
        icon: "error",
      });
      console.error("Error posting review:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(param?.slug);
  console.log(course);
  return (
    <>
      <BaseHeader />
      <section className="pt-5 pb-5">
        <div className="container">
          {/* Header Here */}
          <Header />
          <div className="row mt-0 mt-md-4">
            {/* Sidebar Here */}
            <Sidebar />
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
              <div className="col-lg-9 col-md-8 col-12">
                <section className="bg-blue py-7">
                  <div className="container">
                    <h2>My Enroll Course Title: {course?.title} </h2>
                    <ReactPlayer
                      url="https://youtu.be/kqtD5dpn9C8?si=QDM3MuVw3_iUm831"
                      width={"100%"}
                      height={400}
                    />
                  </div>
                </section>
                <section className="mt-4">
                  <div className="container">
                    <div className="row">
                      {/* Main content START */}
                      <div className="col-12">
                        <div className="card shadow rounded-2 p-0 mt-n5">
                          {/* Tabs START */}
                          <div className="card-header border-bottom px-4 pt-3 pb-0">
                            <ul
                              className="nav nav-bottom-line py-0"
                              id="course-pills-tab"
                              role="tablist"
                            >
                              {/* Tab item */}
                              <li
                                className="nav-item me-2 me-sm-4"
                                role="presentation"
                              >
                                <button
                                  className="nav-link mb-2 mb-md-0 active"
                                  id="course-pills-tab-1"
                                  data-bs-toggle="pill"
                                  data-bs-target="#course-pills-1"
                                  type="button"
                                  role="tab"
                                  aria-controls="course-pills-1"
                                  aria-selected="true"
                                >
                                  Course Lectures
                                </button>
                              </li>

                              <li
                                className="nav-item me-2 me-sm-4"
                                role="presentation"
                              >
                                <button
                                  className="nav-link mb-2 mb-md-0"
                                  id="course-pills-tab-4"
                                  data-bs-toggle="pill"
                                  data-bs-target="#course-pills-4"
                                  type="button"
                                  role="tab"
                                  aria-controls="course-pills-4"
                                  aria-selected="false"
                                >
                                  Leave a Review
                                </button>
                              </li>
                            </ul>
                          </div>
                          {/* Tabs END */}
                          {/* Tab contents START */}
                          <div className="card-body p-sm-4">
                            <div
                              className="tab-content"
                              id="course-pills-tabContent"
                            >
                              {/* Content START */}
                              <div
                                className="tab-pane fade show active"
                                id="course-pills-1"
                                role="tabpanel"
                                aria-labelledby="course-pills-tab-1"
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
                                                    <p className="mb-0">
                                                      2m 10s
                                                    </p>
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
                              <div
                                className="tab-pane fade"
                                id="course-pills-4"
                                role="tabpanel"
                                aria-labelledby="course-pills-tab-4"
                              >
                                <div className="card">
                                  {/* Card header */}
                                  <form
                                    onSubmit={handleSubmit}
                                    className="card-header border-bottom p-0 pb-3"
                                  >
                                    {/* Title */}
                                    <h4 className="mb-3 p-3">Leave a Review</h4>
                                    <div className="mt-2">
                                      <div className="row g-3 p-3">
                                        {/* Rating */}
                                        <div className="col-12 bg-light-input">
                                          <select
                                            id="inputState2"
                                            className="form-select js-choice"
                                            value={rating}
                                            onChange={(e) =>
                                              setRating(Number(e.target.value))
                                            }
                                          >
                                            <option value={5}>
                                              ★★★★★ (5/5)
                                            </option>
                                            <option value={4}>
                                              ★★★★☆ (4/5)
                                            </option>
                                            <option value={3}>
                                              ★★★☆☆ (3/5)
                                            </option>
                                            <option value={2}>
                                              ★★☆☆☆ (2/5)
                                            </option>
                                            <option value={1}>
                                              ★☆☆☆☆ (1/5)
                                            </option>
                                          </select>
                                        </div>
                                        {/* Message */}
                                        <div className="col-12 bg-light-input">
                                          <textarea
                                            className="form-control"
                                            id="exampleFormControlTextarea1"
                                            placeholder="Your review"
                                            rows={3}
                                            value={review}
                                            onChange={(e) =>
                                              setReview(e.target.value)
                                            }
                                          />
                                        </div>
                                        {/* Button */}
                                        <div className="col-12">
                                          <button
                                            type="submit"
                                            className="btn btn-primary mb-0"
                                            onClick={handleSubmit}
                                            disabled={loading}
                                          >
                                            {loading
                                              ? "Posting..."
                                              : "Post Review"}
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}
          </div>
        </div>
      </section>

      <BaseFooter />
    </>
  );
}

export default StudentCourseLectureDetail;
