import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import Login from "./Login/Login";
import { FreelanceProfile } from "./freelancer/Profile";
import AboutUs from "./pages/AboutUs";
import Layout from "./components/Layout";
import SignUp from "./pages/SignUp";
import ClientProfile from "./client/profile";
import { Settings } from "./freelancer/Settings";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/freelance-profile/:id" element={<FreelanceProfile />} />
        <Route path="/client-profile" element={<ClientProfile />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  );
};

export default App;
