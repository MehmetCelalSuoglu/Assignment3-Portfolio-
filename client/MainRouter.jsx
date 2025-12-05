import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home.jsx";
import About from "./src/About.jsx";
import Education from "./src/education.jsx";
import Project from "./src/project.jsx";
import Services from "./src/services.jsx";
import Contact from "./src/contact.jsx";
import Layout from "./components/Layout.jsx";
import Signin from "./src/Signin.jsx";
import Signup from "./src/Signup.jsx";
import AdminDashboard from "./src/AdminDashboard.jsx";
import Profile from "./src/Profile.jsx"; 

const MainRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/education" element={<Education />} />
        <Route path="/project" element={<Project />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
};

export default MainRouter;


