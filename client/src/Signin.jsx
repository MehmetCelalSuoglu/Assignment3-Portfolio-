// client/src/Signin.jsx
import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "./api";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(`${API_BASE_URL}/auth/signin`, {
        email,
        password,
      });

      // Save JWT (token + user)
      localStorage.setItem("jwt", JSON.stringify(res.data));

      setSuccess("You have signed in successfully!");

      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    } catch (err) {
      console.error("SIGNIN ERROR:", err.response?.data || err.message);
      setError(
        err.response?.data?.error ||
          "Failed to sign in. Please check your email and password."
      );
    }
  };

  return (
    <section className="page">
      <h2 className="page-title">Sign In</h2>

      <p className="page-lead">
        Sign in with your email and password to access your profile.
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
          <label>Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          Sign In
        </button>
      </form>
    </section>
  );
};

export default Signin;





