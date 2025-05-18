import { useEffect, useState } from "react";
import { useAuth } from "../Components/store/auth";

export default function AdminContact() {
  const { authorizationToken } = useAuth();
  const [contacts, setContacts] = useState([]);

  const getContactsData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/contacts", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setContacts(data);
      } else {
        console.error("Failed to fetch contacts:", data.message);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const deleteContact = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this message?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/contacts/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Contact deleted successfully");
        setContacts((prev) => prev.filter((contact) => contact._id !== id));
      } else {
        alert(data.message || "Failed to delete contact");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting contact.");
    }
  };

  useEffect(() => {
    if (authorizationToken) {
      getContactsData();
    }
  }, [authorizationToken]);

  return (
    <div className="container">
      <h1 className="main-heading">Admin Contacts</h1>
      {contacts.length > 0 ? (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id}>
                <td>{contact.username}</td>
                <td>{contact.email}</td>
                <td>{contact.message}</td>
                <td>
                  <button
                    className="btn btn-delete"
                    onClick={() => deleteContact(contact._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No contact messages found.</p>
      )}
    </div>
  );
}
