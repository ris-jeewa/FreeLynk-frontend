import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import Login from "./Login/Login";
import { FreelanceProfile } from "./freelancer/Profile";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/freelance-profile/:id" element={<FreelanceProfile />} />
      </Routes>
    </>
  );
};

export default App;
