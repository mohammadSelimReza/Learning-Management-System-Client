import React, { useEffect, useState } from "react";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";
import UserData from "../plugin/UserData";
import { useNavigate } from "react-router";
import useAxios from "../../utils/useAxios";
import Toast from "../plugin/Toast";

function InstructorProfile() {
  const user = UserData();
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const [country, setCountry] = useState("");
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [thumbNail, setThumbNail] = useState(
   user?.image || "https://www.eclosio.ong/wp-content/uploads/2018/08/default.png"
  );
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
      console.log(err);
      setError("Failed to upload photo. Please try again.");
    } finally {
      setUploadingPhoto(false);
    }
  };
  const fetchProfile = () => {
    setLoading(true);
    useAxios()
      .get(`user/profile-upate/${UserData()?.user_id}`)
      .then((res) => {
        console.log(res.data);
        setProfile(res.data);
        setName(res.data?.full_name);
        setInfo(res.data?.about);
        setCountry(res.data?.country);
        setLoading(false);
      });
  };
  const navigate = useNavigate();
  useEffect(() => {
    fetchProfile();
  }, []);
  const handleUpdate = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(name, info, country);
    try {
      const formData = {
        user: user.user_id,
        image:thumbNail,
        full_name: name,
        about: info,
        country: country,
      };
      console.log(JSON.stringify(formData));
      await useAxios().patch(`user/profile-upate/${profile?.user}`, formData);
      Toast().fire({
        title: "Profile Detail Successfully Updated.Login Again",
        icon: "success",
      });
      navigate("/logout");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
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
            <div className="col-lg-9 col-md-8 col-12">
              {/* Card */}
              <div className="card">
                {/* Card header */}
                <div className="card-header">
                  <h3 className="mb-0">Profile Details</h3>
                  <p className="mb-0">
                    You have full control to manage your own account setting.
                  </p>
                </div>
                {/* Card body */}
                <form onSubmit={handleUpdate} className="card-body">
                  <div className="d-lg-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center mb-4 mb-lg-0">
                      <img
                        src={`${thumbNail}`}
                        id="img-uploaded"
                        className="avatar-xl rounded-circle"
                        alt="avatar"
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                      <div className="ms-3">
                        <h4 className="mb-0">Your avatar</h4>
                        <p className="mb-0">
                          PNG or JPG no bigger than 800px wide and tall.
                        </p>
                        <input
                          id="courseTHumbnail"
                          className="form-control"
                          type="file"
                          name="thumbnail_photo"
                          onChange={handleImage}
                        />
                      </div>
                    </div>
                  </div>
                  <hr className="my-5" />
                  <div>
                    <h4 className="mb-0">Personal Details</h4>
                    <p className="mb-4">
                      Edit your personal information and address.
                    </p>
                    {/* Form */}
                    <div className="row gx-3">
                      {/* First name */}
                      <div className="mb-3 col-12 col-md-12">
                        <label className="form-label" htmlFor="fname">
                          Full Name
                        </label>
                        <input
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                          id="fname"
                          className="form-control"
                          placeholder="First Name"
                          defaultValue={name}
                        />
                        <div className="invalid-feedback">
                          Please enter full name.
                        </div>
                      </div>
                      {/* Last name */}
                      <div className="mb-3 col-12 col-md-12">
                        <label className="form-label" htmlFor="lname">
                          About Me
                        </label>
                        <textarea
                          onChange={(e) => setInfo(e.target.value)}
                          name=""
                          id=""
                          cols="30"
                          rows="5"
                          className="form-control"
                          defaultValue={info}
                        ></textarea>
                        <div className="invalid-feedback">
                          Please enter last name.
                        </div>
                      </div>

                      {/* Country */}
                      <div className="mb-3 col-12 col-md-12">
                        <label className="form-label" htmlFor="editCountry">
                          Country
                        </label>
                        <input
                          onChange={(e) => setCountry(e.target.value)}
                          type="text"
                          id="country"
                          className="form-control"
                          placeholder="Country"
                          defaultValue={country}
                        />
                        <div className="invalid-feedback">
                          Please choose country.
                        </div>
                      </div>
                      <div className="col-12">
                        {/* Button */}
                        <button className="btn btn-primary" type="submit">
                          Update Profile <i className="fas fa-check-circle"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BaseFooter />
    </>
  );
}

export default InstructorProfile;
