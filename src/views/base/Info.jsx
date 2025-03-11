import { useState } from "react";
import { motion } from "framer-motion";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";

const AboutUs = () => {
  return (
    <>
      <BaseHeader />
      <motion.div
        className="container text-center my-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="display-4 fw-bold mb-4">About EduSoft</h1>
        <p className="lead text-muted">
          EduSoft is a modern Learning Management System (LMS) designed to
          streamline online education. Our platform provides seamless course
          management, student engagement, and an intuitive learning experience.
        </p>
        <h2 className="h2 fw-semibold mt-5">Our Mission</h2>
        <p className="text-muted">
          To empower educators and learners by offering a robust and scalable
          LMS with a focus on user experience and accessibility.
        </p>
        <h2 className="h2 fw-semibold mt-5">Our Vision</h2>
        <p className="text-muted">
          To revolutionize online education by creating an innovative and
          user-friendly platform for global learning.
        </p>
        <h2 className="h2 fw-semibold mt-5">Why Choose Us?</h2>
        <ul className="list-group list-group-flush text-start mx-auto w-50">
          <li className="list-group-item">
            ✔ Interactive and engaging courses
          </li>
          <li className="list-group-item">✔ Seamless user experience</li>
          <li className="list-group-item">
            ✔ Scalable and secure infrastructure
          </li>
          <li className="list-group-item">✔ Dedicated support team</li>
        </ul>
      </motion.div>
      <BaseFooter />
    </>
  );
};

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", form);
  };

  return (
    <>
      <BaseHeader />
      <motion.div
        className="container text-center my-5"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="display-4 fw-bold mb-4">Contact Us</h1>
        <p className="lead text-muted">We’d love to hear from you!</p>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="form-control"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <textarea
              name="message"
              placeholder="Your Message"
              className="form-control"
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-main w-100 py-2">
            Send Message
          </button>
        </form>
        <div className="mt-5">
          <h2 className="h4">Other Ways to Reach Us</h2>
          <p className="text-muted">Email: support@edusoft.com</p>
          <p className="text-muted">Phone: +123 456 7890</p>
          <p className="text-muted">Address: 123 EduSoft Lane, Tech City</p>
        </div>
      </motion.div>
      <BaseFooter />
    </>
  );
};

export { AboutUs, ContactUs };
