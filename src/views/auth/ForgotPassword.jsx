import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import { useState } from "react";
import apiInstance from "../../utils/axios";
import Toast from "../plugin/Toast";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      Toast().fire({
        title:"Please enter your email.",
        icon:"warning",
      })
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Toast().fire({
        title:"Please enter a valid email address.",
        icon:"warning",
      })
      return;
    }

    setLoading(true);
    try {
      const response = await apiInstance.post("user/forgot-password/", { email });
      Toast().fire({
        title:`${response.data.message}`,
        icon:"success",
      })
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to send reset link. Please try again later.";
      Toast().fire({
        title:`${errorMessage}`,
        icon:"error",
      })
      console.error("Password reset error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BaseHeader />
      <section className="container d-flex flex-column vh-100" style={{ marginTop: "150px" }}>
        <div className="row align-items-center justify-content-center g-0 h-lg-100 py-8">
          <div className="col-lg-5 col-md-8 py-8 py-xl-0">
            <div className="card shadow">
              <div className="card-body p-6">
                <div className="mb-4 text-center">
                  <h1 className="mb-1 fw-bold">Forgot Password</h1>
                  <span>Enter your email to reset your password</span>
                </div>
                <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      placeholder="example@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                    />
                    <div className="invalid-feedback">Please enter a valid email.</div>
                  </div>

                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-main"
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="text-center">
                          <div className="spinner-border text-success" role="status">
                            <span className="visually-hidden">Sending...</span>
                          </div>
                        </div>
                      ) : (
                        <>Send Reset Link</>
                      )}
                    </button>
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
