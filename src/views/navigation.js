import {Link} from "react-router-dom";
import {useLocation} from "react-router";
import {useSelector} from "react-redux";
import './index.css';
import {UserRoles} from "../constants/constants";
const Navigation = () => {
    const {currentUser} = useSelector((state) => state.users)
    const {pathname} = useLocation()
    const parts = pathname.split('/')
    return(
      <div className="mt-4">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <Link to="/"
                  className={`nav-link ${parts[1] === ''?'active': ''}`}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/search"
                  className={`nav-link ${parts[1] === 'search'?'active': ''}`}>
              Search
            </Link>
          </li>
          {
            currentUser && currentUser.userRole === UserRoles.SYSTEM_ADMIN &&
            <li className="nav-item">
              <Link to="/users"
                    className={`nav-link ${parts[1] === 'users'?'active': ''}`}>
                Users
              </Link>
            </li>
          }
          <li className={`nav-item ${currentUser ? 'd-none':''}`}>
            <Link to="/login"
                  className={`nav-link ${parts[1] === 'login'?'active': ''}`}>
              Login
            </Link>
          </li>
          <li className={`nav-item ${currentUser ? 'd-none':''}`}>
            <Link to="/register"
                  className={`nav-link ${parts[1] === 'register'?'active': ''}`}>
              Register
            </Link>
          </li>
          {
            currentUser &&
            <li className="nav-item">
              <Link to={"/profile/" + currentUser._id}
                    className={`nav-link ${parts[1] === 'profile'?'active': ''}`}>
                Profile
              </Link>
            </li>
          }
        </ul>
      </div>
    )
}

export default Navigation