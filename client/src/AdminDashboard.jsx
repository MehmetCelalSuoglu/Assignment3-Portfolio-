// client/src/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "./api";

const AdminDashboard = () => {
  // Read JWT from localStorage
  const jwtStr = localStorage.getItem("jwt");
  let jwt = null;

  try {
    jwt = jwtStr ? JSON.parse(jwtStr) : null;
  } catch (e) {
    console.error("Failed to parse jwt from localStorage:", e);
    jwt = null;
  }

  const user = jwt?.user;

  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState("");

  // Load admin data (users + contacts)
  useEffect(() => {
    const fetchData = async () => {
      // If there is no token, don't try to call the backend
      if (!jwt || !jwt.token) {
        return;
      }

      try {
        setError("");

        const config = {
          headers: {
            Authorization: `Bearer ${jwt.token}`,
          },
        };

        const usersRes = await axios.get(
          `${API_BASE_URL}/api/secure/users`,
          config
        );

        const contactsRes = await axios.get(
          `${API_BASE_URL}/api/contacts`,
          config
        );

        setUsers(usersRes.data || []);
        setContacts(contactsRes.data || []);
      } catch (err) {
        console.error("ADMIN DASHBOARD ERROR:", err.response?.data || err);
        setError(
          err.response?.data?.error || "Failed to load admin data from server."
        );
      }
    };

    fetchData();
  }, [jwt?.token]);

  // If not admin, show friendly message
  if (!user || user.role !== "admin") {
    return (
      <div className="page">
        <h1 className="page-title">Admin Panel</h1>
        <p className="page-lead">
          You do not have permission to view this page. Only{" "}
          <strong>admin</strong> users can access the admin panel.
        </p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="page-title">Admin Panel</h1>
      <p className="page-lead">
        Welcome, {user.name}. You are logged in as <strong>admin</strong>.
      </p>

      {error && (
        <p style={{ color: "salmon", marginBottom: "1rem" }}>{error}</p>
      )}

      {/* Registered Users */}
      <section style={{ marginTop: "2rem" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "0.8rem" }}>
          Registered Users
        </h2>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.95rem",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    borderBottom: "1px solid #333",
                    textAlign: "left",
                    padding: "0.5rem",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    borderBottom: "1px solid #333",
                    textAlign: "left",
                    padding: "0.5rem",
                  }}
                >
                  Email
                </th>
                <th
                  style={{
                    borderBottom: "1px solid #333",
                    textAlign: "left",
                    padding: "0.5rem",
                  }}
                >
                  Role
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td
                    style={{
                      borderBottom: "1px solid #222",
                      padding: "0.4rem 0.5rem",
                    }}
                  >
                    {u.name}
                  </td>
                  <td
                    style={{
                      borderBottom: "1px solid #222",
                      padding: "0.4rem 0.5rem",
                    }}
                  >
                    {u.email}
                  </td>
                  <td
                    style={{
                      borderBottom: "1px solid #222",
                      padding: "0.4rem 0.5rem",
                    }}
                  >
                    {u.role || "user"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Contact Messages */}
      <section style={{ marginTop: "2.5rem" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "0.8rem" }}>
          Contact Messages
        </h2>
        {contacts.length === 0 ? (
          <p>No contact messages yet.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1rem",
              marginTop: "0.5rem",
            }}
          >
            {contacts.map((c) => (
              <div
                key={c._id}
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid #262626",
                  borderRadius: "10px",
                  padding: "0.9rem 1rem",
                  fontSize: "0.95rem",
                }}
              >
                <p>
                  <strong>Name:</strong> {c.firstname} {c.lastname}
                </p>
                <p>
                  <strong>Email:</strong> {c.email}
                </p>
                {c.subject && (
                  <p>
                    <strong>Subject:</strong> {c.subject}
                  </p>
                )}
                {c.message && (
                  <p style={{ marginTop: "0.4rem" }}>
                    <strong>Message:</strong> {c.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
