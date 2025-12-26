import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
// import Login from "./Auth/Login";
import { FreelanceProfile } from "./freelancer/Profile";
import AboutUs from "./pages/AboutUs";
import Layout from "./components/Layout";
// import Register from "./Auth/Register";
import Membership from "./pages/Membership";
import Careers from "./pages/Careers";
import TestCheckBox from "./pages/TestCheckBox";
import { ClientProfile } from "./client/Profile";
import { PostProject } from "./pages/PostProject";
import AdminDashboard from "./pages/AdminDashboard";
import Checkout from "./pages/Checkout";
// import ProtectedRoute from "./components/ProtectedRoute";
// import { AuthProvider } from "./contexts/AuthContext";
// import AuthDemo from "./components/AuthDemo";

const App = () => {
  return (
      <Routes>
        {/* Auth pages without Layout */}
        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}

        <Route path="/checkout" element={<Checkout />} />
        
        {/* Public pages with Layout */}
        <Route path="/" element={
          <Layout>
            <Home />
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

        {/* Protected Routes - Role-based access */}
        <Route path="/freelance-profile/:id" element={
            <Layout>
              <FreelanceProfile />
            </Layout>
        } />
        
        <Route path="/client-profile/:id" element={
            <Layout>
              <ClientProfile />
            </Layout>
        } />
        
        <Route path="/post-project" element={
            <Layout>
              <PostProject />
            </Layout>
        } />
        
        {/* Admin Routes */}
        <Route path="/admin/*" element={
            <Routes>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="*" element={<AdminDashboard />} />
            </Routes>
        } />

        {/* Test routes */}
        <Route path="/checkbox" element={
          <Layout>
            <TestCheckBox />
          </Layout>
        } />
        
        <Route path="/auth-demo" element={
            <Layout>
              {/* <AuthDemo /> */}
            </Layout>
        } />
      </Routes>
  );
};

export default App;
