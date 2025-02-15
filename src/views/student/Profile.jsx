import React, { useEffect, useState } from "react";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";
import useAxios from "../../utils/useAxios";
import UserData from "../plugin/UserData";
import Logout from "../auth/Logout";
import Toast from "../plugin/Toast";
import { OrbitProgress } from "react-loading-indicators";
import { updateUserData } from "../../utils/auth";
import { useNavigate } from "react-router";

function Profile() {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [country, setCountry] = useState("");
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProfile = () => {
    setLoading(true);
    useAxios()
      .get(`user/profile-upate/${UserData()?.user_id}`)
      .then((res) => {
        console.log(res.data);
        setProfile(res.data);
        setName(res.data?.full_name);
        setAbout(res.data?.about);
        setCountry(res.data?.country);
        setLoading(false);
      });
  };
  const navigate = useNavigate();
  useEffect(() => {
    fetchProfile();
  }, []);

  const user_id = UserData()?.user_id;

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(name, about, country);
    try {
      const formData = {
        user: user_id,
        full_name: name,
        about: about,
        country: country,
      };
      await useAxios().patch(`user/profile-upate/${profile?.user}`, formData);
      Toast().fire({
        title: "Profile Detail Successfully Updated.Login Again",
        icon: "success",
      });
      navigate("/logout")
      setLoading(false);
      
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  console.log(profile.user);
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
        <section className="pt-5 pb-5">
          <div className="container">
            {/* Header Here */}
            <Header />
            <div className=" row mt-0 mt-md-4 mt-lg-4">
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
                  <form onSubmit={handleSubmit} className="card-body">
                    <div className="d-lg-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center mb-4 mb-lg-0">
                        <img
                          src="https://eduport.webestica.com/assets/images/avatar/09.jpg"
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
                            type="file"
                            className="form-control mt-3"
                            name=""
                            id=""
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
                            defaultValue={name}
                            required=""
                          />
                          <div className="invalid-feedback">
                            Please enter first name.
                          </div>
                        </div>
                        {/* Last name */}
                        <div className="mb-3 col-12 col-md-12">
                          <label className="form-label" htmlFor="lname">
                            About Me
                          </label>
                          <textarea
                            onChange={(e) => setAbout(e.target.value)}
                            name=""
                            id=""
                            cols="30"
                            rows="5"
                            className="form-control"
                            defaultValue={about}
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
                            defaultValue={country}
                            required=""
                          />
                        </div>
                        <div className="col-12">
                          {/* Button */}
                          <button className="btn btn-primary" type="submit">
                            Update Profile{" "}
                            <i className="fas fa-check-circle"></i>
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
      )}

      <BaseFooter />
    </>
  );
}

export default Profile;
