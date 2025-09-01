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
import { checkVisit } from "../../services/visit";
import Navbar from "../../components/Navbar";
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

  useEffect(() => {
    const logVisit = async () => {
      const data = await checkVisit();
      console.log("Visit logged:", data);
    };

    logVisit();
  }, []);

  return (
     <>

    <div className="home-bg" aria-hidden="true" />
    <div className="home-container">
      <Navbar />
      <section id="home" className="hero-section">
        <img
          src="/images/hero-section.png"
          alt="shop"
          className="sell-img"
        />
      </section>

      <section id="about" className="section-about-us">

        <h2> Work Hard, Love Harder!</h2>
        <div class="detail-about">
          <div>Unofficial Anthology ของคู่ <span>Kuroo Tetsurou x Tsukishima Kei</span> และคู่ <span>Kozume Kenma x Hinata Shoyo</span> จากเรื่อง Haikyu!<br/></div>
          <div>โปรเจกต์หนังสือรวมเรื่องสั้นที่ประกอบไปด้วย Fanfics, Illustrations และ Comics ที่มีมากกว่า 20 เรื่องราว ในธีม <span>'อาชีพ'</span> ที่หลากหลาย</div>
          <div>รังสรรค์โดยทีมผู้กำกับทั้ง 31 ท่าน ของ KRTSKKHN Productions</div>
        </div>

      </section>
      {/* <div className="carousel-blox">
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
      </div> */}

      <div className="two-section">
        <div className="book-section">
          <div className="book-container">
            <div class="book-row">
              <div className="book-img">
                <img
                  src="/images/Book_Dust_Jacket_Mockup_2.png"
                  alt="Book 1"
                  className="image book-front"
                  onClick={() => openBook("book-1")}
                />
                <p>Click ที่หนังสือเพื่อดูเนื้อหา Preview</p>
              </div>
              <div class="book-detail"><h3>Work Hard, Love Harder!<br /> (Unofficial KRTSK Anthology)</h3>
                <p>Paring: Kuroo Tetsurou x Tsukishima Kei<br />
                  Contains<br />
                  • 8 one-shot fanfictions<br />
                  • 1 short comic<br />
                  • 7 illustrations<br />
                  </p>
                  <br />
                <a class="btn-action" href="https://forms.gle/ow9R19eRtkvW4zrn6" target="_blank" rel="noopener noreferrer">Order Here</a>

              </div>

            </div>
            <div class="book-row section-2">
              <div class="book-detail">
                <h3>Work Hard, Love Harder!<br /> (Unofficial KHN Anthology)</h3>
                <p>Paring: Kozume Kenma x Hinata Shoyo<br />
                  Contains<br />
                  • 8 one-shot fanfictions<br />
                  • 1 short comic<br />
                  • 5 illustrations<br />
                 </p>
                 <br />
                <a class="btn-action" href="https://forms.gle/ow9R19eRtkvW4zrn6" target="_blank" rel="noopener noreferrer">Order Here</a>

              </div>
              <div className="book-img">
                <img
                  src="/images/Book_Dust_Jacket_Mockup_1.png"
                  alt="Book 2"
                  className="image book-back"
                  onClick={() => openBook("book-2")}
                />
                <p>Click ที่หนังสือเพื่อดูเนื้อหา Preview</p>
              </div>
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
      <div className="sell-container">
       
        <a href="https://order-detail-eight.vercel.app/check-order">
          <img
            src="/images/tracking-white.png"
            alt="shop"
            className="sell-img"
          />
        </a>
      </div>

      <section id="contributors" class="home-contact-section">
        <div>
          <h3 className="home-h3">Contributors</h3>
        </div>
        <div className="contact-divider"></div>
        <ContactList title="Artists" contacts={contacts.artists} />
        <ContactList title="Writers" contacts={contacts.writers} />
        <ContactList title="Staff" contacts={contacts.others} />
      </section>
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
     </>
  );
}

export default Home;
