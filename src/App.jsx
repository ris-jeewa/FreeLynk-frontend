import React, { use, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import Login from "./Login/Login";
import { FreelanceProfile } from "./freelancer/Profile";
import AboutUs from "./pages/AboutUs";
import Layout from "./components/Layout";
import SignUp from "./pages/SignUp";
import ClientProfile from "./client/profile";
import axios from "axios";

const App = () => {

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get(`http://localhost:8080/api/users`);
      console.log("users data`````",response.data); 
    }
    getUsers();
  }, []);


 useEffect(() => {
  axios.get("http://localhost:8080/api/users")
  .then((response) => {
    console.log("users data", response.data);
  })
  .catch((error) => {
    console.error("Error fetching users:", error);
  });
 }, []);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/freelance-profile/:id" element={<FreelanceProfile />} />
        <Route path="/client-profile" element={<ClientProfile />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </Layout>
  );
};

export default App;
