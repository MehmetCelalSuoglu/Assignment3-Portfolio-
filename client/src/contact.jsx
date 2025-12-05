// client/src/contact.jsx
import React, { useState } from "react";
import "./index.css";
import axios from "axios";
import { API_BASE_URL } from "./api";

export default function Contact() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      await axios.post(`${API_BASE_URL}/api/contacts`, {
        firstname,
        lastname,
        phone,
        email,
        address,
        message,
      });

      setSuccess("Your message has been sent successfully!");

      setFirstname("");
      setLastname("");
      setPhone("");
      setEmail("");
      setAddress("");
      setMessage("");
    } catch (err) {
      console.error("CONTACT ERROR:", err.response?.data || err.message);
      setError(
        err.response?.data?.error ||
          "Failed to send your message. Please try again."
      );
    }
  };

  return (
    <section className="page">
      <h2 className="page-title">Contact Me</h2>

      <div className="contact-layout">
        <div className="contact-info-box">
          <h3>Get in touch</h3>
          <p>
            <strong>Email:</strong> celalsuoglu@gmail.com
          </p>
          <p>
            <strong>Phone:</strong> +1 (416) 555-1234
          </p>
          <p className="contact-note">
            You can contact me about web projects, school work, or
            collaboration ideas.
          </p>
        </div>

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
            <label>First Name</label>
            <input
              type="text"
              required
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>

          <div className="form-row">
            <label>Last Name</label>
            <input
              type="text"
              required
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
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
            <label>Message</label>
            <textarea
              rows="4"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <button type="submit" className="btn contact-btn">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
