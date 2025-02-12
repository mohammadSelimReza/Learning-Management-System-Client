import { Link } from "react-router-dom";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";

export default function NotFound() {
  return (
    <>
      <BaseHeader />
      <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light text-center">
        <h1 className="display-1 fw-bold text-danger">404</h1>
        <h2 className="mb-3 fw-semibold text-dark">Oops! Page Not Found</h2>
        <p className="text-muted">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="btn btn-main mt-3 px-4 py-2">
          Go Home
        </Link>
      </div>
      <BaseFooter />
    </>
  );
}
