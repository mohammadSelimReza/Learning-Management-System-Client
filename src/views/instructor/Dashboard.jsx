import { useEffect, useState } from "react"
import BaseFooter from "../partials/BaseFooter"
import BaseHeader from "../partials/BaseHeader"
import Sidebar from "./Partials/Sidebar"
import useAxios from "../../utils/useAxios"
import UserData from "../plugin/UserData"
import moment from "moment"
import { OrbitProgress } from "react-loading-indicators"
import Header from "./Partials/Header"

function InstructorDashboard() {
    const [summary,setSummary] = useState([]);
    const [courseList,setCourseList] = useState([]);
    const [loading,setLoading] = useState(true);
    const user = UserData();
    console.log(user.user_id);
    const teacherData = async()=>{
        setLoading(true)
        try {
            const res = await useAxios().get(`/teacher/info/${user?.user_id}/`);
            console.log(res.data[0].id);
            const data = await useAxios().get(`/teacher/summary/${res.data[0].id}/`);
            console.log(data.data[0]);
            const courseList = await useAxios().get(`/teacher/course/list/${res.data[0].id}/`)
            setSummary(data.data[0]);
            setCourseList(courseList.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    useEffect(()=>{
        teacherData();
    },[])
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
                        {
                            loading
                            ?
                            (
                               <div className="col-lg-9 col-md-8 col-12">
                                 <div className="text-center w-100">
                                    <OrbitProgress variant="spokes" color="#32cd32" size="medium" />
                                </div>
                               </div>
                               )
                               :
                               ( 
                                <>
                                <div className="col-lg-9 col-md-8 col-12">
                                    <div className="row mb-4">
                                        <h4 className="mb-0 mb-4"> <i className='bi bi-grid-fill'></i> Dashboard</h4>
                                        {/* Counter item */}
        
                                        <div className="col-sm-6 col-lg-4 mb-3 mb-lg-0">
                                            <div className="d-flex justify-content-center align-items-center p-4 bg-warning bg-opacity-10 rounded-3">
                                                <span className="display-6 lh-1 text-orange mb-0">
                                                    <i className="fas fa-tv fa-fw text-warning" />
                                                </span>
                                                <div className="ms-4">
                                                    <div className="d-flex">
                                                        <h5 className="purecounter mb-0 fw-bold" > {summary?.total_courses} </h5>
                                                    </div>
                                                    <p className="mb-0 h6 fw-light">Total Courses</p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Counter item */}
                                        <div className="col-sm-6 col-lg-4 mb-3 mb-lg-0">
                                            <div className="d-flex justify-content-center align-items-center p-4 bg-danger bg-opacity-10 rounded-3">
                                                <span className="display-6 lh-1 text-purple mb-0">
                                                    <i className="fas fa-graduation-cap text-danger fa-fw" />
                                                </span>
                                                <div className="ms-4">
                                                    <div className="d-flex">
                                                        <h5 className="purecounter mb-0 fw-bold" > {summary?.total_students} </h5>
                                                    </div>
                                                    <p className="mb-0 h6 fw-light">Total Students</p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Counter item */}
                                        <div className="col-sm-6 col-lg-4 mb-3 mb-lg-0">
                                            <div className="d-flex justify-content-center align-items-center p-4 bg-success bg-opacity-10 rounded-3">
                                                <span className="display-6 lh-1 text-success mb-0">
                                                    <i className="fas fa-dollar-sign fa-fw" />
                                                </span>
                                                <div className="ms-4">
                                                    <div className="d-flex">
                                                        <h5 className="purecounter mb-0 fw-bold" >${summary?.total_revenue} </h5>
                                                    </div>
                                                    <p className="mb-0 h6 fw-light">Total Revenue</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
        
                                    <div className="card mb-4">
                                        <div className="card-header">
                                            <h3 className="mb-0">Courses</h3>
                                            <span>
                                                Manage your courses from here, earch, view, edit or delete courses.
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
                                                    <tr className="text-center">
                                                        <th>Courses</th>
                                                        <th>Enrolled</th>
                                                        <th>Level</th>
                                                        <th>Status</th>
                                                        <th>Date Created</th>
                                                        <th>Action</th>
                                                        <th />
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        courseList.map((course)=>(
                                                            <tr key={course.course_id}>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <div>
                                                                    <a href="#">
                                                                        <img src={`${course?.image}`} alt="course" className="rounded img-4by3-lg" style={{ width: "100px", height: "70px", borderRadius: "50%", objectFit: "cover" }} />
                                                                    </a>
                                                                </div>
                                                                <div className="ms-3">
                                                                    <h4 className="mb-1 h6">
                                                                        <a href="#" className="text-inherit text-decoration-none text-dark">
                                                                            {course?.title}
                                                                        </a>
                                                                    </h4>
                                                                    <ul className="list-inline fs-6 mb-0">
                                                                        <li className="list-inline-item">
                                                                            <small><i className='bi bi-clock-history'></i>
                                                                                <span className='ms-1'>1hr 30 Mins</span>
                                                                            </small>
                                                                        </li>
                                                                        <li className="list-inline-item" style={{'width':'100px'}}>
                                                                            <small>
                                                                                <i className='bi bi-reception-4'></i>
                                                                                <span className='ms-1'> {course?.level} </span>
                                                                            </small>
                                                                        </li>
                                                                        <li className="list-inline-item">
                                                                            <small>
                                                                                <i className='fas fa-dollar-sign'></i>
                                                                                <span> {course?.price} </span>
                                                                            </small>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td><p className='mt-3'> {course?.students.length} </p></td>
                                                        <td><p className='mt-3 badge bg-success' > {course?.level} </p></td>
                                                        <td><p className='mt-3 badge bg-warning text-dark' > {course?.level} </p></td>
                                                        <td><p className='mt-3'>{moment(course?.date).format("DD MMM,YYYY")}</p></td>
                                                        <td>
                                                            <button className='btn btn-main btn-sm mt-3 me-1'><i className='fas fa-edit'></i></button>
                                                            <button className='btn btn-danger btn-sm mt-3 me-1'><i className='fas fa-trash'></i></button>
                                                            <button className='btn btn-secondary btn-sm mt-3 me-1'><i className='fas fa-eye'></i></button>
                                                        </td>
                                                    </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                </>
                               )
                             }
                    </div>
                </div>
            </section>

            <BaseFooter />
        </>
    )
}

export default InstructorDashboard