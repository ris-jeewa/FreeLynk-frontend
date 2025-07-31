import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import Login from "./Auth/Login";
import { FreelanceProfile } from "./freelancer/Profile";
import AboutUs from "./pages/AboutUs";
import Layout from "./components/Layout";
import Register from "./Auth/Register";
import Membership from "./pages/Membership";
import Careers from "./pages/Careers";

const App = () => {
  return (
    <Routes>
      {/* Auth pages without Layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Other pages with Layout */}
      <Route path="/" element={
        <Layout>
          <Home />
        </Layout>
      } />
      <Route path="/freelance-profile/:id" element={
        <Layout>
          <FreelanceProfile />
        </Layout>
      } />
      <Route path="/about" element={
        <Layout>
          <AboutUs />
        </Layout>
      } />
      <Route path="/membership" element={
        <Layout>
          <Membership />
        </Layout>
      } />
      <Route path="/careers" element={
        <Layout>
          <Careers />
        </Layout>
      } />
    </Routes>
  );
};

export default App;
