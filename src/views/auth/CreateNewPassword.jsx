import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import apiInstance from "../../utils/axios";

function CreateNewPassword() {
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [loading, setLoading] = useState(false);

  const [searchParam] = useSearchParams();
  const otp = searchParam.get("otp");
  const uuidb64 = searchParam.get("uuidb64");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (pass !== pass2) {
      alert("Password didn't match.Try again.");
      setLoading(false);
      return;
    } else {
      const formdata = new FormData();
      formdata.append("otp", otp);
      formdata.append("uuidb64", uuidb64);
      formdata.append("password", pass);
      try {
        await apiInstance
          .post("user/password-change/", formdata)
          .then((res) => {
            alert(res.data.message);
            navigate("/login");
          });
      } catch (error) {
        alert(error);
        setLoading(false);
      }
      setLoading(false);
    }
  };

  return (
    <>
      <BaseHeader />

      <section
        className="container d-flex flex-column vh-100"
        style={{ marginTop: "150px" }}
      >
        <div className="row align-items-center justify-content-center g-0 h-lg-100 py-8">
          <div className="col-lg-5 col-md-8 py-8 py-xl-0">
            <div className="card shadow">
              <div className="card-body p-6">
                <div className="mb-4">
                  <h1 className="mb-1 fw-bold">Create New Password</h1>
                  <span>Choose a new password for your account</span>
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="needs-validation"
                  noValidate=""
                >
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Enter New Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      name="password"
                      placeholder="**************"
                      required=""
                      onChange={(e) => setPass(e.target.value)}
                    />
                    <div className="invalid-feedback">
                      Please enter valid password.
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="password2"
                      className="form-control"
                      name="password"
                      placeholder="**************"
                      required=""
                      onChange={(e) => setPass2(e.target.value)}
                    />
                    <div className="invalid-feedback">
                      Please enter valid password.
                    </div>
                  </div>

                  <div>
                    <div className="d-grid">
                      <button
                        type="submit"
                        className="btn btn-main"
                        disabled={loading}
                      >
                        {loading ? (
                          <p>
                            Saving... <i className="fas fa-spinner fa-spin"></i>
                          </p>
                        ) : (
                          <p>
                            Save New Password
                            <i className="fas fa-check-circle"></i>
                          </p>
                        )}
                      </button>
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

export default CreateNewPassword;
