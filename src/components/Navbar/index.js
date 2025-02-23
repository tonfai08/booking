import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // ใช้ไอคอนแฮมเบอร์เกอร์
import "./styles.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State สำหรับเปิด/ปิดเมนู

  return (
    <nav className="navbar">
      {/* 🔹 โลโก้ตรงกลาง */}
      <div className="logo">
        {" "}
        <img src="/images/logo.PNG" alt="My Image" className="logo-img" />
      </div>

      {/* 🔹 เมนูด้านขวา (Desktop) */}
      <ul className="nav-right">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="/book">Booking</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
        <li></li>
      </ul>

      {/* 🔹 ปุ่มแฮมเบอร์เกอร์ (Mobile) */}
      <button className="menu-toggle" onClick={() => setIsOpen(true)}>
        <FaBars />
      </button>

      {/* 🔹 เมนู Mobile แบบ Fullscreen */}
      <div className={`nav-mobile ${isOpen ? "open" : ""}`}>
        {/* 🔹 ปุ่มปิดเมนู (X) */}
        <button className="close-menu" onClick={() => setIsOpen(false)}>
          <FaTimes />
        </button>

        <ul>
          <li>
            <a href="#" onClick={() => setIsOpen(false)}>
              Home
            </a>
          </li>
          <li>
            <a href="#" onClick={() => setIsOpen(false)}>
              About
            </a>
          </li>
          <li>
            <a href="#" onClick={() => setIsOpen(false)}>
              Services
            </a>
          </li>
          <li>
            <a href="#" onClick={() => setIsOpen(false)}>
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
