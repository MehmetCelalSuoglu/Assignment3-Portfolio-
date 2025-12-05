// client/src/Signup.jsx
import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "./api";

const Signup = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const payload = {
      name,
      email,
      password,
      phone,
      address,
    };

    console.log("SIGNUP PAYLOAD:", payload);

    try {
      await axios.post(`${API_BASE_URL}/auth/signup`, payload);
      setSuccess("Account created successfully! You can now sign in.");
      setName("");
      setPhone("");
      setEmail("");
      setAddress("");
      setPassword("");
    } catch (err) {
      console.error("SIGNUP ERROR:", err.response?.data || err.message);
      setError(
        err.response?.data?.error || "Failed to sign up. Please try again."
      );
    }
  };

  return (
    <section className="page">
      <h2 className="page-title">Sign Up</h2>

      <p className="page-lead">
        Create a new account. Default role is <strong>user</strong>.
      </p>

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
          <label>Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn contact-btn">
          Sign Up
        </button>
      </form>
    </section>
  );
};

export default Signup;
