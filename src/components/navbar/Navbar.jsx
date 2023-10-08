import "./navbar.scss"
import { Link } from "react-router-dom";

const Navbar = () => {

  const user = sessionStorage.getItem('user');
  const handleLogout = () => sessionStorage.clear();

  return (
      <div className="navbar">
          <div className="navContainer">
              <Link to='/'>
                  <span className="logo">
                  </span>
              </Link>
              <div className="navItems">
                  {!user?.email && (
                      <>
                          <Link to="/registration" className="navButton text-decoration-none">
                              Register
                          </Link>
                          <Link to="/signin" className="navButton text-decoration-none">
                              Login
                          </Link>
                      </>
                  )}

                  {user?.email && (
                      <>
                          <Link className="text-success text-decoration-none fw-bold">{user?.name}</Link>
                          {user?.email && user?.isAdmin &&  <Link to="/admin/dashboard" className="navButton text-decoration-none">
                              Admin Dashboard
                          </Link>}
                          <Link className="navButton text-decoration-none" onClick={handleLogout}>
                              Logout
                          </Link>
                      </>
                  )}
              </div>
          </div>
      </div>
  );
}

export default Navbar