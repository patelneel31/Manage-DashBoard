// src/layout/AdminLayout.jsx
import { NavLink, Outlet, Navigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { RiCustomerServiceFill } from "react-icons/ri";
import { IoHome } from "react-icons/io5";
import { useAuth } from "../store/auth";

export default function AdminLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  // If not an admin, redirect
  if (!user?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <header className="admin-header">
        <div className="container">
          <nav>
            <ul className="admin-nav">
              <li>
                <NavLink
                  to="/admin/users"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <FaUser /> Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/contacts"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <IoMdContact /> Contacts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/service"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <RiCustomerServiceFill /> Services
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <IoHome /> Home
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="admin-main">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </>
  );
}
