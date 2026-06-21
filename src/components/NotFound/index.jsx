import {Link} from "react-router-dom"
import "./index.css"

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-heading">Page Not Found</h2>
        <p className="not-found-text">
          Oops! The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="back-btn">
          Back to dashboard
        </Link>
      </div>
    </div>
  )
}

export default NotFound
