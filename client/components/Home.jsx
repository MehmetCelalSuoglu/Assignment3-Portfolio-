import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="page">

      <h1 className="heroTitle">Welcome to My Portfolio</h1>

      <h2 className="heroSubtitle">
        Hi, I'm Mehmet — a Software Engineering Technician Student
      </h2>

      <p className="heroText">
        I enjoy building modern web applications using React, Node.js,
        and database technologies such as MongoDB and Oracle SQL.
        I focus on clean UI, responsive layouts, and simple user experience.
      </p>

      <Link to="/about">
        <button className="btn">Learn More About Me</button>
      </Link>

    </div>
  );
}

