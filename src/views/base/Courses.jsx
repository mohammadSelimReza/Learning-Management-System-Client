import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiInstance from "../../utils/axios";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await apiInstance.get("/course/course/");
        setCourses(res.data); // Fetch and set all courses
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourses();
  }, []);

  const courseDetailView = (slug) => {
    navigate(`/course-detail/${slug}`);
  };

  return (
    <>
      <BaseHeader />
      <section className="courses mb-5">
        <div className="container mb-lg-8">
          <div className="row mb-5 mt-3">
            <div className="col-12 text-center">
              <h2 className="mb-1 h1">📚 All Courses</h2>
              <p>Browse all available courses and start learning today!</p>
            </div>
          </div>

          <div className="row g-4">
            {courses.map((item) => (
              <div key={item?.course_id} className="col-md-4">
                <div className="card border-0 shadow-sm rounded overflow-hidden">
                  <div
                    onClick={() => courseDetailView(item?.slug)}
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

                  <div className="card-body bg-white">
                    <span className="text-uppercase text-success fw-semibold fs-6">
                      {item?.category?.title}
                    </span>
                    <h5 className="fw-bold text-dark mt-1">
                      <div
                        onClick={() => courseDetailView(item?.slug)}
                        className="text-decoration-none text-dark"
                      >
                        <p>{item?.title}</p>
                      </div>
                    </h5>
                    <div className="d-flex text-muted small">
                      <span className="me-3">
                        <i className="fas fa-user-graduate me-1"></i>{" "}
                        {item?.students?.length} Students
                      </span>
                      <span>
                        <i className="fas fa-book me-1"></i>{" "}
                        {item?.lectures?.length} Lessons
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <BaseFooter />
    </>
  );
}
