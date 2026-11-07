import { Link, useLocation } from "react-router";

function NotFoundPage() {
  const { pathname } = useLocation();

  return (
    <div className="card">
      <h2>404: Page not found</h2>
      <p className="muted">There is no page at {pathname}.</p>
      <Link to="/">Go back to the vendors</Link>
    </div>
  );
}

export default NotFoundPage;
