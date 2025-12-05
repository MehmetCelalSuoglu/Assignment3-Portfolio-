import React, { useState } from 'react';
import "./index.css";

export default function Services() {
  return (
    <section id="services" className="page">
      <h2 className="page-title">Services</h2>

      <p className="page-lead">
        I am a Software Engineering Technician student and this is my web
        development project. I really enjoy building modern, responsive websites
        and web applications. Here are some of the services I can do.
      </p>

      <div className="servicesList">
        <div className="serviceCard">
          <h3>Front-End Development</h3>
          <p>
            Building responsive web pages using HTML, CSS, JavaScript, and React.
            I focus on clean layouts and easy-to-use interfaces.
          </p>
        </div>

        <div className="serviceCard">
          <h3>React Single-Page Apps</h3>
          <p>
            Creating React projects with components, routing, and reusable UI so
            that the site feels fast and smooth.
          </p>
        </div>

        <div className="serviceCard">
          <h3>Back-End Basics</h3>
          <p>
            Working with Node.js and Express to create simple APIs and connect
            the front-end to a server or a database.
          </p>
        </div>

        <div className="serviceCard">
          <h3>Linux &amp; Server Setup</h3>
          <p>
            Working with Linux environments to set up web servers, manage
            deployments, and automate simple tasks using shell scripting and
            command-line tools.
          </p>
        </div>
      </div>
    </section>
  );
}
