import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import { useState } from "react";
import apiInstance from "../../utils/axios";
import { useNavigate } from "react-router";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(email);
    try {
      await apiInstance.get(`user/password-reset/${email}/`).then((res) => {
        console.log(res.data);
        setLoading(false);
        alert("Check your email");
        navigate("/");
      });
    } catch (error) {
      console.log(error);
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
                  <h1 className="mb-1 fw-bold">Forgot Password</h1>
                  <span>Let's help you get back into your account</span>
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="needs-validation"
                  noValidate=""
                >
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      name="email"
                      placeholder="johndoe@gmail.com"
                      required=""
                      onChange={(e) => setEmail(e.target.value)}
                    />
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
                            Reset Password{" "}
                            <i className="fas fa-spinner fa-spin"></i>
                          </p>
                        ) : (
                          <p>
                            Reset Password{" "}
                            <i className="fas fa-arrow-right"></i>
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

export default ForgetPassword;
