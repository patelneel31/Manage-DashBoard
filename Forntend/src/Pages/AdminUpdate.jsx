// src/pages/adminUpdate.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../Components/store/auth";

export default function AdminUpdate() {
  const { authorizationToken } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/admin/users/${id}`,
          {
            headers: {
              Authorization: authorizationToken,
            },
          }
        );
        const userData = await response.json();
        if (response.ok) {
          setData({
            username: userData.username,
            email: userData.email,
            phone: userData.phone || "",
          });
        } else {
          alert(userData.message || "Failed to fetch user");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchUser();
  }, [id, authorizationToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/edit/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert("User updated successfully");
        navigate("/admin/users");
      } else {
        alert(result.message || "Failed to update user");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("An error occurred while updating the user.");
    }
  };

  return (
    <div className="container">
      <h2>Update User</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={data.username}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={data.phone}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit" className="btn btn-update">
          Update User
        </button>
      </form>
    </div>
  );
}
