import React, { useState } from "react";
import "./styles.css";
import Navbar from "../../components/Navbar";
function Booking() {
  return (
    <div className="booking-container">
      <Navbar />

      <div className="top-section">
        <div className="image-container">
          <img
            src="/images/hero-section-1.PNG"
            alt="My Image"
            className="image-book"
          />
        </div>
        <div className="text-container">
          <h2>สามารถจองได้แล้ว</h2>
          <button className="btn">สั่งซื้อ</button>
        </div>
      </div>

      <div className="bottom-section">
        <div className="text-container">
          <h2>สามารถจองได้แล้ว</h2>
          <button className="btn">สั่งซื้อ</button>
        </div>
        <div className="image-container">
          <img
            src="/images/hero-section-2.PNG"
            alt="My Image"
            className="image-book"
          />
        </div>
      </div>
    </div>
  );
}

export default Booking;
