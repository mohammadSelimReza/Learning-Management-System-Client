import Sidebar from './Partials/Sidebar'
import Header from './Partials/Header'
import BaseHeader from '../partials/BaseHeader'
import BaseFooter from '../partials/BaseFooter'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import apiInstance from '../../utils/axios';
import UserData from '../plugin/UserData';
import useAxios from '../../utils/useAxios';
import Toast from '../plugin/Toast';

function CourseCreate() {
  const [category,setCategory] = useState([]);
  const [cataId,setCataId] = useState(0);
  const [teacherId,setTeacherId] = useState(0);
  const [level,setLevel] = useState("Begining");
  const [title,setTitle] = useState("");
  const [price,setPrice] = useState(0.00);
  const [info,setInfo] = useState("");
  const [loading,setLoading] = useState(true);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [thumbNail,setThumbNail] = useState("https://www.eclosio.ong/wp-content/uploads/2018/08/default.png")
  const user = UserData();
  const teacherData = async()=>{
    setLoading(true)
    try {
        const res = await useAxios().get(`/teacher/info/${user?.user_id}/`);
        setTeacherId(res.data[0].id);
        setLoading(false);
    } catch (error) {
        console.log(error);
        setLoading(false);
    }
}


  const fetchCategory = async() => {
    try {
      const res = await apiInstance.get(`/course/category/`);
      console.log(res.data);
      setCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleImage = (event) => {
    uploadPhoto(event.target.files[0]);
  };
  const uploadPhoto = async (file) => {
    setUploadingPhoto(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "vaccinereactup");
    formData.append("cloud_name", "dofqxmuya");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dofqxmuya/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      console.log(data);
      setThumbNail(data.secure_url);
    } catch (err) {
      console.log(err)
      setError("Failed to upload photo. Please try again.");
    } finally {
      setUploadingPhoto(false); 
    }
  };
  const navigate = useNavigate();
  const handleCourseCreation = async(e) =>{
    e.preventDefault();
    const courseData = {
      image: thumbNail,
      title: title,
      info: info,
      price: price,
      language: "English",
      level: level,
      platform_status: "Published",
      teacher_course_status: "Published",
      featured: false,
      teacher: teacherId,
      category: cataId
    }
    try {
      const res = await useAxios().post(`/course/action/`,courseData)
      console.log(res)
      Toast().fire({
        title: "New Course Created Successfully!!!",
        icon: "success",
      });
      navigate("/instructor/course/view")
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    teacherData();
    fetchCategory();
  },[])
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
              <>
                <section className="py-4 py-lg-6 color-primary rounded-3">
                  <div className="container">
                    <div className="row">
                      <div className="offset-lg-1 col-lg-10 col-md-12 col-12">
                        <div className="d-lg-flex align-items-center justify-content-between">
                          {/* Content */}
                          <div className="mb-4 mb-lg-0">
                            <h1 className="text-white mb-1">Add New Course</h1>
                            <p className="mb-0 text-white lead">
                              Just fill the form and create your courses.
                            </p>
                          </div>
                          <div>
                            <Link to="/instructor/course/view" className="btn" style={{ backgroundColor: "white" }}> <i className='fas fa-arrow-left'></i> Back to Course</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <form onSubmit={handleCourseCreation} className="pb-8 mt-5">
                  <div className="card mb-3">

                    {/* Basic Info Section */}
                    <div className="card-header border-bottom px-4 py-3">
                      <h4 className="mb-0">Basic Information</h4>
                    </div>
                    <div className="card-body">
                      <label htmlFor="courseTHumbnail" className="form-label">Thumbnail Preview</label>
                      <img style={{ width: "100%", height: "330px", objectFit: "cover", borderRadius: "10px" }} className='mb-4' src={`${thumbNail}`} alt="" />
                      <div className="mb-3">
                        <label htmlFor="courseTHumbnail" className="form-label">Course Thumbnail</label>
                        <input
                          id="courseTHumbnail"
                          className="form-control"
                          type="file"
                          name="thumbnail_photo"
                          onChange={handleImage}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="courseTitle" className="form-label">
                          Title
                        </label>
                        <input
                          id="courseTitle"
                          className="form-control"
                          type="text"
                          placeholder=""
                          onChange={(e)=>setTitle(e.target.value)}
                        />
                        <small>Write a 60 character course title.</small>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Courses category</label>
                        <select className="form-select" onChange={(e)=>setCataId(e.target.value)}>
                          <option value="">-------------</option>
                          {
                            category.map((item)=>(
                              <option key={item?.id} value={`${item?.id}`}> {item?.title} </option>
                            ))
                          }
                        </select>
                        <small>
                          Help people find your courses by choosing categories
                          that represent your course.
                        </small>
                      </div>
                      <div className="mb-3">
                        <select 
                          className="form-select"
                          value={level} 
                          onChange={(e) => setLevel(e.target.value)} // Update state on change
                        >
                          <option value="">Select level</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Begining">Beginners</option>
                          <option value="Advanced">Advanced</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Course Description</label>
                        <textarea onChange={(e)=>setInfo(e.target.value)} name="" className='form-control' id="" cols="30" rows="10"></textarea>
                        <small>A brief summary of your courses.</small>
                      </div>
                      <label htmlFor="courseTitle" className="form-label">
                        Price
                      </label>
                      <input
                        id="courseTitle"
                        className="form-control"
                        type="number"
                        placeholder="$20.99"
                        onChange={(e)=>setPrice(e.target.value)}
                      />
                    </div>
                  </div>
                    <button className='btn btn-lg btn-success w-100 mt-2' type='submit'>Create Course <i className='fas fa-check-circle'></i></button>
                </form>
              </>

            </div>

          </div>
        </div>
      </section>

      <BaseFooter />
    </>
  )
}

export default CourseCreate
