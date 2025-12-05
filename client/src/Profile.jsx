// client/src/Profile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "./api";

const Profile = () => {
  // Read JWT from localStorage
  const [jwt] = useState(() => {
    const jwtStr = localStorage.getItem("jwt");
    return jwtStr ? JSON.parse(jwtStr) : null;
  });

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [created, setCreated] = useState("");
  const [updated, setUpdated] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!jwt) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const res = await axios.get(`${API_BASE_URL}/api/profile`, {
          headers: {
            Authorization: `Bearer ${jwt.token}`,
          },
        });

        const u = res.data;
        setName(u.name || "");
        setPhone(u.phone || "");
        setEmail(u.email || "");
        setAddress(u.address || "");
        setRole(u.role || "user");
        if (u.created) setCreated(new Date(u.created).toLocaleString());
        if (u.updated) setUpdated(new Date(u.updated).toLocaleString());
      } catch (err) {
        console.error("PROFILE LOAD ERROR:", err.response?.data || err.message);
        setError(
          err.response?.data?.error || "Failed to load profile from server."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [jwt]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      const res = await axios.put(
        `${API_BASE_URL}/api/profile`,
        {
          name,
          email,
          phone,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt.token}`,
          },
        }
      );

      const u = res.data;
      setUpdated(u.updated ? new Date(u.updated).toLocaleString() : "");
      setSuccess("Profile updated successfully!");
    } catch (err) {
      console.error("PROFILE UPDATE ERROR:", err.response?.data || err.message);
      setError(
        err.response?.data?.error || "Failed to update profile. Try again."
      );
    }
  };

  if (!jwt) {
    return (
      <section className="page">
        <h2 className="page-title">My Profile</h2>
        <p>You need to sign in to view your profile.</p>
      </section>
    );
  }

  return (
    <section className="page">
      <h2 className="page-title">My Profile</h2>

      <p className="page-lead">
        Here you can view and update your basic account information.
      </p>

      {loading && <p>Loading your profile...</p>}

      {!loading && (
        <form className="contact-form" onSubmit={handleSubmit}>
          {error && (
            <p style={{ color: "salmon", marginBottom: "0.5rem" }}>{error}</p>
          )}
          {success && (
            <p style={{ color: "#4caf50", marginBottom: "0.5rem" }}>
              {success}
            </p>
          )}

          <div className="form-row">
            <label>Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-row">
            <label>Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="form-row">
            <label>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-row">
            <label>Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="form-row">
            <label>Role</label>
            <input type="text" value={role} disabled />
          </div>

          {created && (
            <div className="form-row">
              <label>Created</label>
              <input type="text" value={created} disabled />
            </div>
          )}

          {updated && (
            <div className="form-row">
              <label>Last Updated</label>
              <input type="text" value={updated} disabled />
            </div>
          )}

          <button type="submit" className="btn contact-btn">
            Save Changes
          </button>
        </form>
      )}
    </section>
  );
};

export default Profile;
