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
            <Link to="/">
              <img src="../../images/logo_2.png"
                   className="rounded p-0" height="60px" width="90px"
                   alt="" />
            </Link>
          </li>
          <li className="nav-item ps-2">
            <Link to="/"
                  className={`nav-link ${parts[1] === ''?'active': ''}`}>
              <h3>Home</h3>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/search"
                  className={`nav-link ${parts[1] === 'search'?'active': ''}`}>
              <h3>Search</h3>
            </Link>
          </li>
          {
            currentUser && currentUser.userRole === UserRoles.SYSTEM_ADMIN &&
            <li className="nav-item">
              <Link to="/users"
                    className={`nav-link ${parts[1] === 'users'?'active': ''}`}>
                <h3>Users</h3>
              </Link>
            </li>
          }
          <li className={`nav-item ${currentUser ? 'd-none':''}`}>
            <Link to="/login"
                  className={`nav-link ${parts[1] === 'login'?'active': ''}`}>
              <h3>Login</h3>
            </Link>
          </li>
          <li className={`nav-item ${currentUser ? 'd-none':''}`}>
            <Link to="/register"
                  className={`nav-link ${parts[1] === 'register'?'active': ''}`}>
              <h3>Register</h3>
            </Link>
          </li>
          {
            currentUser &&
            <li className="nav-item">
              <Link to={"/profile"}
                    className={`nav-link ${parts[1] === 'profile'?'active': ''}`}>
                <h3>Profile</h3>
              </Link>
            </li>
          }
        </ul>
      </div>
    )
}

export default Navigation