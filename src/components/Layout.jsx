import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="pt-15 flex-1">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
