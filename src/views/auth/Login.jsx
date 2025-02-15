import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../../utils/auth";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailErr, setEmailErr] = useState("");
  const [passErr, setPassErr] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailErr("");
    setPassErr("");
    setLoading(true);
    const { error } = await login(email, password);

    console.log(error?.detail);
    if (error) {
      if (error.detail) setEmailErr(error.detail);
      if (error.password) setPassErr(error.password);
      setLoading(false);
    } else {
      navigate("/");
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
                  <h1 className="mb-1 fw-bold ">Sign in</h1>
                  <span>
                    Don’t have an account?
                    <Link to="/register/" className="ms-1 primary-text">
                      Sign up
                    </Link>
                  </span>
                </div>
                {/* Form */}
                <form
                  onSubmit={handleLogin}
                  className="needs-validation"
                  noValidate=""
                >
                  <p>{emailErr}</p>
                  {/* Username */}
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
                  {/* Password */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      name="password"
                      placeholder="**************"
                      required=""
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="invalid-feedback">{passErr}</div>
                  </div>
                  {/* Checkbox */}
                  <div className="d-lg-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="rememberme"
                        required=""
                      />
                      <label className="form-check-label" htmlFor="rememberme">
                        Remember me
                      </label>
                      <div className="invalid-feedback">
                        You must agree before submitting.
                      </div>
                    </div>
                    <div>
                      <Link to="/forget-password/" className="primary-text">Forgot your password?</Link>
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
                            logging...<i className="fas fa-spinner fa-spin"></i>{" "}
                          </p>
                        ) : (
                          <p>
                            Sign in <i className="fas fa-sign-in-alt"></i>
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

export default Login;
