import React, { useEffect, useState } from "react";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";
import apiInstance from "../../utils/axios";
import UserData from "../plugin/UserData";
import { OrbitProgress } from "react-loading-indicators";
import moment from "moment";
import { useNavigate } from "react-router";

function StudentCourseDetail() {
  const [course, setCourse] = useState([]);
  const [studentCourses, setStudentCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const user_id = UserData()?.user_id;
  const navigate = useNavigate();
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await apiInstance.get(`/course/enrollment/`);
      setCourse(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    const filteredCourses = course.filter(
      (item) => item?.user?.user_id === user_id
    );
    setStudentCourses(filteredCourses);
  }, [course, user_id]);

  console.log("Courses:", studentCourses);
  const coureDetailView = async (slug) => {
    navigate(`/student/course/${slug}/detail`);
  };
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

            <div className="col-lg-8">
              <h3>Your Enrolled Courses:</h3>
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
                  {studentCourses.length > 0 ? (
                    studentCourses.map((courseItem) => (
                      <div key={courseItem.id} className="card mb-3">
                        <div
                          onClick={() =>
                            coureDetailView(courseItem?.course?.slug)
                          }
                          className="card-body d-flex justify-content-between"
                        >
                          <div className="d-flex">
                            <div className="w-100px w-md-80px mb-2 mb-md-0">
                              <img
                                src={courseItem?.course?.image}
                                style={{
                                  width: "100px",
                                  height: "70px",
                                  objectFit: "cover",
                                }}
                                className="rounded"
                                alt=""
                              />
                            </div>
                            <div>
                              <h5 className="card-title">
                                {courseItem?.course?.title}
                              </h5>
                              <small>
                                Enroll ID: {courseItem?.enrolled_id}{" "}
                              </small>
                            </div>
                          </div>
                          <div>
                            <p>
                              Purchased Date:{" "}
                              {moment(courseItem?.date).format(
                                "DD MMM,YYYY"
                              )}{" "}
                            </p>
                            <button type="button" className="btn btn-success">View Detail</button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No courses found.</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <BaseFooter />
    </>
  );
}

export default StudentCourseDetail;
