import { useNavigate } from "react-router";
import useAxios from "../../utils/useAxios";
import UserData from "../plugin/UserData";
import { useEffect, useState } from "react";
import BaseHeader from "../partials/BaseHeader";
import Header from "./Partials/Header";
import BaseFooter from "../partials/BaseFooter";
import Sidebar from "./Partials/Sidebar";


function InstructorPassChange() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const api = useAxios();
  const user_id = UserData()?.user_id;
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!newPassword || !confirmPassword) {
      setMessage("All fields are required!");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match!");
      return;
    }
    console.log(JSON.stringify(newPassword));

    try {
      setLoading(true);
      const response = await api.patch(`/user/password-upate/${user_id}`, {
        password: newPassword,
      });
      console.log(response.data);
      setMessage("Password changed successfully!");

      setNewPassword("");
      setConfirmPassword("");
      navigate("/");
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (message != null) {
      alert(message);
    }
  }, [message]);
  return (
    <>
      <BaseHeader />
      <section className="pt-5 pb-5">
        <div className="container">
          {/* Header */}
          <Header />
          <div className="row mt-0 mt-md-4">
            {/* Sidebar */}
            <Sidebar />
            <div className="col-lg-9 col-md-8 col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="mb-0">Change Password</h3>
                </div>
                <div className="card-body">
                  <form className="row gx-3" onSubmit={handleSubmit}>
                    {/* New Password */}
                    <div className="mb-3 col-12">
                      <label className="form-label">New Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="********"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>

                    {/* Confirm New Password */}
                    <div className="mb-3 col-12">
                      <label className="form-label">Confirm New Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="********"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>

                    {/* Error/Success Message */}
                    {message && <p className="text-danger">{message}</p>}

                    {/* Submit Button */}
                    <div className="col-12">
                      <button
                        className="btn btn-primary"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? "Saving..." : "Save New Password"}{" "}
                        <i className="fas fa-check-circle"></i>
                      </button>
                    </div>
                  </form>
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

export default InstructorPassChange;
