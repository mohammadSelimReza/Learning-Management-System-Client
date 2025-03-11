import React, { useEffect, useState } from "react";
import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";

import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import useAxios from "../../utils/useAxios";
import UserData from "../plugin/UserData";
import moment from "moment";
import Toast from "../plugin/Toast";
import { OrbitProgress } from "react-loading-indicators";

function InstructorViewCourse() {
  const [summary, setSummary] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = UserData();
  console.log(user.user_id);
  const teacherData = async () => {
    setLoading(true);
    try {
      const res = await useAxios().get(`/teacher/info/${user?.user_id}/`);
      console.log(res.data[0].id);
      const data = await useAxios().get(`/teacher/summary/${res.data[0].id}/`);
      console.log(data.data[0]);
      const courseList = await useAxios().get(
        `/teacher/course/list/${res.data[0].id}/`
      );
      setSummary(data.data[0]);
      setCourseList(courseList.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    try {
      await useAxios().delete(`/course/action/${id}/`);
      Toast().fire({
        title: "Successfully Deleted",
        icon: "success",
      });
      setCourseList((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      Toast().fire({
        title: `Error: ${error}`,
        icon: "error",
      });
    }
  };
  useEffect(() => {
    teacherData();
  }, []);
  console.log(summary);
  console.log(courseList);
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
            <div className="col-lg-9 col-md-8 col-12">
              <div className="row mb-4">
                <h4 className="mb-0 mb-2 mt-4">
                  {" "}
                  <i className="bi bi-grid-fill"></i> Courses
                </h4>
              </div>
              <div className="card mb-4">
                <div className="card-header">
                  <span>
                    Manage your courses from here, earch, view, edit or delete
                    courses.
                  </span>
                </div>
                <div className="card-body">
                  <form className="row gx-3">
                    <div className="col-lg-12 col-md-12 col-12 mb-lg-0 mb-2">
                      <input
                        type="search"
                        className="form-control"
                        placeholder="Search Your Courses"
                      />
                    </div>
                  </form>
                </div>
                <div className="table-responsive overflow-y-hidden">
                  <table className="table mb-0 text-nowrap table-hover table-centered text-nowrap">
                    <thead className="table-light">
                      <tr>
                        <th>Courses</th>
                        <th>Enrolled</th>
                        <th>Level</th>
                        <th>Status</th>
                        <th>Date Created</th>
                        <th>Action</th>
                        <th />
                      </tr>
                    </thead>
                    {
                        loading
                        ?
                        (
                            <tbody>
                            <tr>
                              <td colSpan="100%" className="text-center">
                                <OrbitProgress variant="spokes" color="#32cd32" size="medium" />
                              </td>
                            </tr>
                          </tbody>
                        )
                        :
                        (
                            <tbody>
                            {courseList.map((course) => (
                                <tr key={course.course_id}>
                                <td>
                                    <div className="d-flex align-items-center">
                                    <div>
                                        <a href="#">
                                        <img
                                            src={`${course?.image}`}
                                            alt="course"
                                            className="rounded img-4by3-lg"
                                            style={{
                                            width: "100px",
                                            height: "70px",
                                            borderRadius: "50%",
                                            objectFit: "cover",
                                            }}
                                        />
                                        </a>
                                    </div>
                                    <div className="ms-3">
                                        <h4 className="mb-1 h6">
                                        <a
                                            href="#"
                                            className="text-inherit text-decoration-none text-dark"
                                        >
                                            {course?.title}
                                        </a>
                                        </h4>
                                        <ul className="list-inline fs-6 mb-0">
                                        <li className="list-inline-item">
                                            <small>
                                            <i className="bi bi-clock-history"></i>
                                            <span className="ms-1">1hr 30 Mins</span>
                                            </small>
                                        </li>
                                        <li
                                            className="list-inline-item"
                                            style={{ width: "100px" }}
                                        >
                                            <small>
                                            <i className="bi bi-reception-4"></i>
                                            <span className="ms-1">
                                                {" "}
                                                {course?.level}{" "}
                                            </span>
                                            </small>
                                        </li>
                                        <li className="list-inline-item">
                                            <small>
                                            <i className="fas fa-dollar-sign"></i>
                                            <span> {course?.price} </span>
                                            </small>
                                        </li>
                                        </ul>
                                    </div>
                                    </div>
                                </td>
                                <td>
                                    <p className="mt-3"> {course?.students.length} </p>
                                </td>
                                <td>
                                    <p className="mt-3 badge bg-success">
                                    {" "}
                                    {course?.level}{" "}
                                    </p>
                                </td>
                                <td>
                                    <p className="mt-3 badge bg-warning text-dark">
                                    {" "}
                                    {course?.level}{" "}
                                    </p>
                                </td>
                                <td>
                                    <p className="mt-3">
                                    {moment(course?.date).format("DD MMM,YYYY")}
                                    </p>
                                </td>
                                <td>
                                    <button className="btn btn-main btn-sm mt-3 me-1">
                                    <i className="fas fa-edit"></i>
                                    </button>
                                    <button
                                    onClick={() => handleDelete(course?.course_id)}
                                    className="btn btn-danger btn-sm mt-3 me-1"
                                    >
                                    <i className="fas fa-trash"></i>
                                    </button>
                                    <button className="btn btn-secondary btn-sm mt-3 me-1">
                                    <i className="fas fa-eye"></i>
                                    </button>
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        )

                    }
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BaseFooter />
    </>
  );
}

export default InstructorViewCourse;
