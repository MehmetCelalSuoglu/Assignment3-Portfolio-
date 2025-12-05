import React from 'react';
import App from "./assets/p1.jpg";
import COMP125 from "./assets/p2.png";
import Linux from "./assets/linux1.png";

export default function Project() {
  return (
    <section id="projects" className="page">
      <h2 className="page-title">Projects</h2>

      <p className="page-lead">
        Here are some of the projects I have worked on during my studies. 
        They helped me practice web development, problem solving, and working with different technologies.
      </p>

      <div className="project-list">
        <div className="project-card">
          <img src={App} alt="Fitness Tracker App" />
          <h3>Fitness Tracker App</h3>
          <p>
            A React-based fitness tracker to monitor workouts and body weight. 
            Focused on clean UI and a simple user experience for tracking daily progress.
          </p>
        </div>

      <div className="project-card">
        <img src={COMP125} alt="Bug Smasher Game" />
        <h3>Bug Smasher Game</h3>
        <p>
          A simple game created using Java where the user clicks moving bugs
          on the screen to earn points.
          </p>
          <a href="http://studentweb.cencol.ca/msuoglu/MY%20WEB%20PAGE/COMP-125-Assignment3.html" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
          marginTop: "0.8rem",
          display: "inline-block",
          color: "var(--accent)",
          textDecoration: "underline"
        }}
        >  🔗 View Bug Smasher
        </a>
        </div>


        <div className="project-card">
          <img src={Linux} alt="Linux Load Balancer & Web Hosting" />
          <h3>Linux Load Balancer & Web Hosting</h3>
          <p>
            Set up a Linux-based web hosting environment using VirtualBox, Nginx as a load balancer,
            and two CentOS web servers. Configured reverse proxy routing and verified that requests were
            served by different hosts successfully.
          </p>
        </div>
      </div>
    </section>
  );
}

