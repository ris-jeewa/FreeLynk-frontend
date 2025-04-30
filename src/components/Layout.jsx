import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white">
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="pt-15">{children}</main>
    </div>
  );
};

export default Layout;
