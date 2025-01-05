import React, { useState } from "react";
import Book from "../../components/Book";
import "./home.css";
import { Popover, Drawer } from "antd";
import DrawerSell from "../../components/Drawer";

function Home() {
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [isbookType, setIsBookType] = useState(1);
  const [open, setOpen] = useState(false);
  const handleOpenBook = (bookType) => {
    setIsBookType(bookType);
    setIsBookOpen(true);
  };
  const handleCloseBook = () => setIsBookOpen(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="text-container">
          <h2>ยินดีต้อนรับ</h2>
        </div>
        <div className="hero-section-img-box">
          <img
            src="/images/hero-section-1.PNG"
            alt="My Image"
            className="image"
          />
          <img
            src="/images/hero-section-2.PNG"
            alt="My Image"
            className="image"
          />
        </div>
      </div>
      <div className="two-section">
        <div className="text-container">
          <h2>อะไรสักอย่าง</h2>
        </div>
        <div className="hero-section-img-box">
          <img
            src="/images/hero-section-1.PNG"
            alt="My Image"
            className="image"
          />
        </div>
      </div>
      <div className="top-section">
        <div className="image-container" onClick={() => handleOpenBook(1)}>
          <img
            src="/images/hero-section-1.PNG"
            alt="My Image"
            className="image-book"
          />
        </div>
        <div className="text-container">
          <h2>สามารถจองได้แล้ว</h2>
          <button className="btn" onClick={() => showDrawer()}>
            สั่งซื้อ
          </button>
        </div>
      </div>

      {isBookOpen && (
        <div className="book-modal">
          <div className="modal-content">
            <button className="close-btn" onClick={handleCloseBook}>
              X
            </button>
            <Book currenBook={isbookType} />
          </div>
        </div>
      )}

      <div className="bottom-section">
        <div className="text-container">
          <h2>สามารถจองได้แล้ว</h2>
          <button className="btn" onClick={() => showDrawer(2)}>
            สั่งซื้อ
          </button>
        </div>
        <div className="image-container" onClick={() => handleOpenBook()}>
          <img
            src="/images/hero-section-2.PNG"
            alt="My Image"
            className="image-book"
          />
        </div>
      </div>
      <div className="footer-section"></div>
      <Drawer title="จองหนังสือ" onClose={onClose} mask={false} open={open}>
        <DrawerSell onClose={onClose} />
      </Drawer>
    </div>
  );
}

export default Home;
