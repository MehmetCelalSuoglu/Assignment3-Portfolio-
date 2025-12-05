import React, { useState } from 'react';

export default function Education() {
  return (
    <section id="education" style={{ maxWidth: "800px", margin: "2rem auto", color: "white" }}>
      <h2>Education</h2>

      <div style={{ marginTop: "1.5rem" }}>
        <h3>Centennial College</h3>
        <p><strong>Program:</strong> Software Engineering Technician</p>
        <p><strong>Years:</strong> 2024 – Present</p>
        <p>
          Currently studying software development with a focus on web applications, databases, 
          and object-oriented programming in C#, Java and JavaScript.
        </p>
      </div>

      <hr style={{ margin: "2rem 0", borderColor: "#444" }} />

      <div>
        <h3>Akdeniz University</h3>
        <p><strong>Degree:</strong> Bachelor&apos;s Degree in Econometrics</p>
        <p><strong>Years:</strong> 2017 – 2023</p>
        <p>
          Completed a strong foundation in statistics, data analysis, and economics, 
          learning how to understand complex data and solve real-world problems.
        </p>
      </div>
    </section>
  );
}

