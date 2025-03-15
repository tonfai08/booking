import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import ContactList from "../../components/ContactList";
import { FaXTwitter, FaFacebook, FaInstagram } from "react-icons/fa6"; // ใช้โลโก้ X แทน Twitter
import { Modal } from "antd";
import Book from "../../components/Book";
import contacts from "../../data/contacts.json";

const iconMap = {
  twitter: <FaXTwitter />,
  facebook: <FaFacebook />,
  instagram: <FaInstagram />,
};
function Home() {
  const navigate = useNavigate();
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState("book-1"); // ✅ เลือกหนังสือเริ่มต้น
  const [isScrolled, setIsScrolled] = useState(false);

  const openBook = (bookId) => {
    setSelectedBook(bookId);
    setIsBookOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="home-container">
      <div className={`header-logo ${isScrolled ? "scrolled" : ""}`}>
        <img src="/images/logo.png" alt="My Image" />
      </div>

      <div className="carousel-blox">
        <div className="carousel-wrapper">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={50}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            speed={1000}
            loop={true}
          >
            <SwiperSlide>
              <div className="carousel-item">
                <img
                  src="/images/hero/1.png"
                  alt="My Image"
                  className="carousel-img"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="carousel-item">
                <img
                  src="/images/hero/2.png"
                  alt="My Image"
                  className="carousel-img"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="carousel-item">
                <img
                  src="/images/hero/3.png"
                  alt="My Image"
                  className="carousel-img"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="carousel-item">
                <img
                  src="/images/hero/4.png"
                  alt="My Image"
                  className="carousel-img"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="carousel-item">
                <img
                  src="/images/hero/5.png"
                  alt="My Image"
                  className="carousel-img"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="carousel-item">
                <img
                  src="/images/hero/6.png"
                  alt="My Image"
                  className="carousel-img"
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <div className="two-section">
        <div className="preview">
          สามารถดู Preview เนื้อหา ได้โดย Click ที่หนังสือค่ะ
        </div>
        <div className="book-section">
          <div className="book-container">
            <img
              src="/images/Book_Dust_Jacket_Mockup_2.png"
              alt="Book 1"
              className="image book-front"
              onClick={() => openBook("book-1")}
            />
            {/* ✅ เปิด book-2 */}
            <img
              src="/images/Book_Dust_Jacket_Mockup_1.png"
              alt="Book 2"
              className="image book-back"
              onClick={() => openBook("book-2")}
            />
          </div>
          <div className="sell-container">
            <div className="hero-section-img-box">
              <a type="primary" href="https://forms.gle/X3xTnqL8WA4tWPc47">
                <img src="/images/shop.png" alt="shop" className="image shop" />
              </a>
            </div>
            <div className="hero-section-img-box">
              <a
                type="primary"
                href=" https://script.google.com/macros/s/AKfycbyvcnmUwgWdmAtZTa3Bu61pVnumCtkJ2qLwvEvBV0VXGzGg-lh3Xdi3MEiOBLAF8JWx/exec"
              >
                <img
                  src="/images/tracking.png"
                  alt="shop"
                  className="image shop"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title=""
        open={isBookOpen}
        onCancel={() => setIsBookOpen(false)}
        footer={null}
        centered
        width={800}
        closable={false} // ✅ ซ่อนปุ่ม X ของ Modal
        maskClosable={false}
        keyboard={false}
      >
        <Book bookId={selectedBook} onClose={() => setIsBookOpen(false)} />
      </Modal>

      <div className="home-contact-section">
        <div>
          <h3 className="home-h3">Contributors</h3>
        </div>
        <ContactList title="Artists" contacts={contacts.artists} />
        <ContactList title="Writers" contacts={contacts.writers} />
        <ContactList title="Staff" contacts={contacts.others} />
      </div>

      <div className="foot-section">
        <div className="left">
          <h3>Operated by @krtskandkhn_th</h3>
        </div>
        <div className="right">
          <a
            href="https://x.com/krtskandkhn_th?s=21&t=trriZKjO9sE5g1x4gUyGpg"
            target="_blank"
            rel="noopener noreferrer"
          >
            {iconMap["twitter"]}
          </a>
          <a
            href="https://www.instagram.com/krtskandkhn_th?igsh=MTk3MWJ1Y2R0eWVvZA=="
            target="_blank"
            rel="noopener noreferrer"
          >
            {iconMap["instagram"]}
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
