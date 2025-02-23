import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import { Popover, Drawer, Button } from "antd";
import DrawerSell from "../../components/Drawer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Navbar from "../../components/Navbar";
import ContactList from "../../components/ContactList";
function Home() {
  const navigate = useNavigate();
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
    setStepBuy(0);
  };

  const artists = [
    {
      id: 1,
      name: "ᴘғ. 🧸`♡*",
      image: "/images/hero-section-1.PNG",
      socials: {
        twitter: "https://x.com/lililaxx?s=21&t=trriZKjO9sE5g1x4gUyGpg",
      },
    },
    {
      id: 2,
      name: "Jane Smith",
      image: "/images/hero-section-1.PNG",
      socials: { twitter: "#" },
    },
    {
      id: 3,
      name: "Alice Johnson",
      image: "/images/hero-section-1.PNG",
      socials: { twitter: "#", facebook: "#", instagram: "#" },
    },
    {
      id: 4,
      name: "John Doe",
      image: "/images/hero-section-1.PNG",
      socials: { twitter: "#", facebook: "#", instagram: "#" },
    },
    {
      id: 5,
      name: "Jane Smith",
      image: "/images/hero-section-1.PNG",
      socials: {
        twitter: "https://x.com/lililaxx?s=21&t=trriZKjO9sE5g1x4gUyGpg",
        facebook: "#",
        instagram: "#",
      },
    },
    {
      id: 6,
      name: "Alice Johnson",
      image: "/images/hero-section-1.PNG",
      socials: { twitter: "#", facebook: "#", instagram: "#" },
    },
  ];

  const writers = [
    {
      id: 1,
      name: "ᴘғ. 🧸`♡*",
      image: "/images/hero-section-1.PNG",
      socials: {
        twitter: "https://x.com/lililaxx?s=21&t=trriZKjO9sE5g1x4gUyGpg",
        facebook: "https://x.com/lililaxx?s=21&t=trriZKjO9sE5g1x4gUyGpg",
        instagram: "https://x.com/lililaxx?s=21&t=trriZKjO9sE5g1x4gUyGpg",
      },
    },
    {
      id: 2,
      name: "Jane Smith",
      image: "/images/hero-section-1.PNG",
      socials: { twitter: "#" },
    },
    {
      id: 3,
      name: "Alice Johnson",
      image: "/images/hero-section-1.PNG",
      socials: { twitter: "#", facebook: "#", instagram: "#" },
    },
    {
      id: 4,
      name: "John Doe",
      image: "/images/hero-section-1.PNG",
      socials: { twitter: "#", facebook: "#", instagram: "#" },
    },
  ];

  const others = [
    {
      id: 1,
      name: "ᴘғ. 🧸`♡*",
      image: "/images/hero-section-1.PNG",
      socials: {
        twitter: "https://x.com/lililaxx?s=21&t=trriZKjO9sE5g1x4gUyGpg",
      },
    },
    {
      id: 2,
      name: "Jane Smith",
      image: "/images/hero-section-1.PNG",
      socials: { twitter: "#" },
    },
  ];

  return (
    <div className="home-container">
      <Navbar />
      <div className="carousel-blox">
        <div className="carousel-wrapper">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={50}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }} // เปลี่ยนสไลด์อัตโนมัติทุก 3 วิ
            pagination={{ clickable: true, dynamicBullets: true }} // dot pagination ที่สามารถ scroll ได้
            speed={1000}
            loop={true}
          >
            <SwiperSlide>
              <div className="carousel-item">
                <img src="/images/hero-1.PNG" alt="My Image" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="carousel-item">
                <img src="/images/hero-2.PNG" alt="My Image" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <div className="two-section">
        <div className="book-container">
          <img
            src="/images/Book_Dust_Jacket_Mockup_2.PNG"
            alt="Book 1"
            className="image book-front"
          />
          <img
            src="/images/Book_Dust_Jacket_Mockup_1.PNG"
            alt="Book 2"
            className="image book-back"
          />
        </div>

        <div className="hero-section-img-box">
          {" "}
          <Button type="primary" onClick={() => navigate("/book")}>
            กดสั่งซื้อ
          </Button>
        </div>
      </div>
      <div className="contact-section">
        <div>
          <h3>ผู้เกี่ยวข้อง</h3>
        </div>
        <ContactList title="นักวาด" contacts={artists} />
        <ContactList title="นักเขียน" contacts={writers} />
        <ContactList title="ใครก็ไม่รู้" contacts={others} />
      </div>
    </div>
  );
}

export default Home;
