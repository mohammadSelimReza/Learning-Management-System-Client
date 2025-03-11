import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiInstance from "../../utils/axios";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import { OrbitProgress } from "react-loading-indicators";
import "./Courses.css";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await apiInstance.get(`/course/list/?page=${page}`);
      setCourses(res.data.results);
      setPageCount(Math.ceil(res.data.count / 9));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, [page]);

  const courseDetailView = (slug) => {
    navigate(`/course-detail/${slug}`);
  };

  return (
    <>
      <BaseHeader />
      <section className="courses mb-5">
        <div className="container mb-5">
          <div className="row mb-5 mt-3">
            <div className="col-12 text-center">
              <h2 className="mb-1 h1">📚 All Courses</h2>
              <p>Browse all available courses and start learning today!</p>
            </div>
          </div>

          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-end">
              {[...Array(pageCount)].map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${page === index + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="col-md-12">
              <div className="row g-4">
                {loading ? (
                  <div className="text-center w-100">
                    <OrbitProgress variant="spokes" color="#32cd32" size="medium" />
                  </div>
                ) : (
                  courses.map((item) => (
                    <div key={item?.course_id} className="col-md-4">
                      <div className="card border-0 shadow-sm rounded overflow-hidden">
                        <div onClick={() => courseDetailView(item?.slug)} className="position-relative">
                          <img
                            src={
                              item?.image ||
                              "https://geeksui.codescandy.com/geeks/assets/images/course/course-css.jpg"
                            }
                            alt="course"
                            className="card-img-top"
                            style={{ width: "100%", height: "200px", objectFit: "cover" }}
                          />
                          <span className="position-absolute bottom-0 end-0 m-2 badge bg-success fs-6 p-2">
                            ${item?.price}
                          </span>
                        </div>

                        <div className="card-body bg-white">
                          <span className="text-uppercase text-success fw-semibold fs-6">
                            {item?.category}
                          </span>
                          <h5 className="fw-bold text-dark mt-1">
                            <div onClick={() => courseDetailView(item?.slug)} className="text-decoration-none text-dark" style={{'height':'60px'}}>
                              <p>{item?.title}</p>
                            </div>
                          </h5>
                          <div className="d-flex text-muted small">
                            <span className="me-3">
                              <i className="fas fa-user-graduate me-1"></i> {item?.total_students} Students
                            </span>
                            <span>
                              <i className="fas fa-book me-1"></i> {item?.total_lessons} Lessons
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
        </div>
      </section>
      <BaseFooter />
    </>
  );
}
