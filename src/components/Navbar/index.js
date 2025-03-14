import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // ใช้ไอคอนแฮมเบอร์เกอร์
import "./styles.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        {" "}
        <img src="/images/logo.png" alt="My Image" className="logo-img" />
      </div>
    </nav>
  );
};

export default Navbar;
