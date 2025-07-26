import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import Login from "./Login/Login";
import { FreelanceProfile } from "./freelancer/Profile";
import AboutUs from "./pages/AboutUs";
import Layout from "./components/Layout";
import Register from "./Login/Register";

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
    </Routes>
  );
};

export default App;
