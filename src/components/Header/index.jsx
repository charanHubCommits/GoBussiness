import Cookies from "js-cookie"
import {useNavigate, Link} from "react-router-dom"
import "./index.css"

const Header = () => {
  const navigate = useNavigate()
  const onLogOut = () => {
    Cookies.remove("jwt_token")
    navigate("/login")
  }

  return (
    <header className="header-container">
      <div className="brand-wrapper">
        <Link to="/" className="brand-logo" aria-label="Go to dashboard home">
          Go Business
        </Link>
      </div>
      <nav aria-label="Primary" className="nav-menu">
        <button type="button" className="try-btn" onClick={onLogOut}>
          Try for free
        </button>
        <button type="button" className="logout-btn" onClick={onLogOut}>
          Log out
        </button>
      </nav>
    </header>
  )
}

export default Header

