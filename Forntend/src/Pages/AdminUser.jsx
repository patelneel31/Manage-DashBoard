import { useEffect, useState } from "react";
import { useAuth } from "../Components/store/auth";
import { Link } from "react-router-dom";

export default function AdminUser() {
  const { authorizationToken } = useAuth();
  const [users, setUsers] = useState([]);

  const getAllUsersData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken, // already includes 'Bearer '
        },
      });

      const data = await response.json();
      if (response.ok) {
        setUsers(data);
      } else {
        console.error("Failed to fetch users:", data.message);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert(data.message || "User deleted successfully.");
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      } else {
        alert(data.message || "Failed to delete user.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("An error occurred while deleting the user.");
    }
  };

  useEffect(() => {
    if (authorizationToken) {
      getAllUsersData();
    }
  }, [authorizationToken]);

  return (
    <div className="container">
      <h1 className="main-heading mb-4">Admin Users</h1>

      {users.length > 0 ? (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((curUser) => (
              <tr key={curUser._id}>
                <td>{curUser.username}</td>
                <td>{curUser.email}</td>
                <td>{curUser.phone}</td>
                <td>
                  <Link to={`/admin/users/${curUser._id}/edit`} className="btn btn-edit">
                    Edit
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-delete"
                    onClick={() => deleteUser(curUser._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}
