import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "./store/auth";

export const Navbar = () => {
  const { isLoggedIn } = useAuth();

  return (
    <header className="navbar">
      <div className="container navbar-container">
        <div className="logo-brand">
          <NavLink to="/" className="logo-link">MyProfile</NavLink>
        </div>

        <nav>
          <ul className="nav-list">
            <li>
              <NavLink to="/" className="nav-link" end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="nav-link">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/service" className="nav-link">
                Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="nav-link">
                Contact
              </NavLink>
            </li>

            {isLoggedIn ? (
              <li>
                <NavLink to="/logout" className="nav-link logout-link">
                  Logout
                </NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink to="/register" className="nav-link secondary-btn">
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/login" className="nav-link btn">
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
