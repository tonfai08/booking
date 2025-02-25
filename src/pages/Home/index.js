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
import { FaXTwitter, FaFacebook, FaInstagram } from "react-icons/fa6"; // ใช้โลโก้ X แทน Twitter

const iconMap = {
  twitter: <FaXTwitter />,
  facebook: <FaFacebook />,
  instagram: <FaInstagram />,
};
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
      image: "/images/profile/1.png",
      socials: {
        twitter: "https://x.com/lililaxx?s=21&t=trriZKjO9sE5g1x4gUyGpg",
      },
    },
    {
      id: 2,
      name: "Jaylor",
      image: "/images/profile/jaylor-1.png",
      socials: {
        twitter: "https://x.com/jxylor?s=21&t=NN8Aj7UU1q_adgdKy55hgA",
        bluesky: "https://bsky.app/profile/jxylor.bsky.social",
        pen: "https://www.readawrite.com/?action=user_page&user_id_publisher=2644295",
      },
    },
    {
      id: 3,
      name: "ฮาทคุง",
      image: "/images/profile/kzr1402.png",
      socials: {
        twitter: "https://x.com/kzr1402?s=21&t=TkbQS0ksydw1ufimYSQFBw",
        bluesky: "https://bsky.app/profile/krrorz.bsky.social",
        pen: "https://www.readawrite.com/?action=user_page&user_id_publisher=2665545",
      },
    },
    {
      id: 4,
      name: "Lumina Luceat",
      image: "/images/profile/jaylor-1.png",
      socials: { twitter: "#", facebook: "#", instagram: "#" },
    },
    {
      id: 5,
      name: "โม",
      image: "/images/profile/mocha.png",
      socials: {
        twitter: "https://x.com/mocha_2909?s=21",
        bluesky: "https://bsky.app/profile/mocha2909.bsky.social",
      },
    },
    {
      id: 6,
      name: "myumyday",
      image: "/images/hero-section-1.png",
      socials: { twitter: "#", facebook: "#", instagram: "#" },
    },
    {
      id: 7,
      name: "seatale",
      image: "/images/profile/seatale.jpg",
      socials: {
        twitter: "https://x.com/S3ATAL3",
        bluesky: "https://bsky.app/profile/seatale.bsky.social",
        pen: "https://seatale.readawrite.com/",
      },
    },
    {
      id: 8,
      name: "ลิตา",
      image: "/images/profile/YounLitt.png",
      socials: {
        twitter: "https://x.com/younlitt_09/",
        bluesky: "https://bsky.app/profile/younlitt.bsky.social",
        instragram:
          "https://www.instagram.com/younlitt_09?igsh=MWd1dzUzOXZpaDZiMQ==",
      },
    },
    {
      id: 9,
      name: "ᴘғ. 🧸`♡*",
      image: "/images/profile/1.png",
      socials: {
        twitter: "https://x.com/lililaxx?s=21&t=trriZKjO9sE5g1x4gUyGpg",
      },
    },
    {
      id: 10,
      name: "Jaylor",
      image: "/images/profile/jaylor-1.png",
      socials: {
        twitter: "https://x.com/jxylor?s=21&t=NN8Aj7UU1q_adgdKy55hgA",
        bluesky: "https://bsky.app/profile/jxylor.bsky.social",
        pen: "https://www.readawrite.com/?action=user_page&user_id_publisher=2644295",
      },
    },
    {
      id: 11,
      name: "ᴘғ. 🧸`♡*",
      image: "/images/profile/1.png",
      socials: {
        twitter: "https://x.com/lililaxx?s=21&t=trriZKjO9sE5g1x4gUyGpg",
      },
    },
    {
      id: 12,
      name: "Lumina Luceat",
      image: "/images/profile/1.png",
      socials: {
        twitter: "https://x.com/Lumina_Luceat?t=n43W7w8TY28ZH2oBagiV7w&s=09",
        bluesky: "https://bsky.app/profile/luminaluceat.bsky.social",
        pen: "https://www.readawrite.com/?action=user_page&user_id_publisher=2574643",
        instragram:
          "https://www.instagram.com/luminaluceat?igsh=Mzg2M3p0ZjZhand2",
      },
    },
    {
      id: 13,
      name: "ᴘғ. 🧸`♡*",
      image: "/images/profile/1.png",
      socials: {
        twitter: "https://x.com/lililaxx?s=21&t=trriZKjO9sE5g1x4gUyGpg",
      },
    },
    {
      id: 14,
      name: "ppeachbf_",
      image: "/images/profile/1.png",
      socials: {
        twitter: "https://x.com/ppeachbf_?t=cDG2ZkmiAuXLv3n7D0G4kA&s=09",
        bluesky: "https://bsky.app/profile/ppeachbf.bsky.social",
        pen: "https://www.readawrite.com/?action=user_page&user_id_publisher=2698080",
      },
    },
  ];

  const writers = [
    {
      id: 1,
      name: "ᴘғ. 🧸`♡*",
      image: "/images/hero-section-1.png",
      socials: {
        twitter: "https://x.com/lililaxx?s=21&t=trriZKjO9sE5g1x4gUyGpg",
        facebook: "https://x.com/lililaxx?s=21&t=trriZKjO9sE5g1x4gUyGpg",
        instagram: "https://x.com/lililaxx?s=21&t=trriZKjO9sE5g1x4gUyGpg",
      },
    },
    {
      id: 2,
      name: "Jane Smith",
      image: "/images/hero-section-1.png",
      socials: { twitter: "#" },
    },
    {
      id: 3,
      name: "Alice Johnson",
      image: "/images/hero-section-1.png",
      socials: { twitter: "#", facebook: "#", instagram: "#" },
    },
    {
      id: 4,
      name: "John Doe",
      image: "/images/hero-section-1.png",
      socials: { twitter: "#", facebook: "#", instagram: "#" },
    },
    {
      id: 4,
      name: "John Doe",
      image: "/images/hero-section-1.png",
      socials: { twitter: "#", facebook: "#", instagram: "#" },
    },
    {
      id: 5,
      name: "Jaylor",
      image: "/images/profile/jaylor-1.png",
      socials: {
        twitter: "https://x.com/jxylor?s=21&t=NN8Aj7UU1q_adgdKy55hgA",
        bluesky: "https://bsky.app/profile/jxylor.bsky.social",
        pen: "https://www.readawrite.com/?action=user_page&user_id_publisher=2644295",
      },
    },
    {
      id: 6,
      name: "myumyday",
      image: "/images/profile/myumyday.png",
      socials: {
        twitter: "https://x.com/moonlover_miyu?s=21",
        bluesky: "https://bsky.app/profile/moonlovermiiyuu.bsky.social",
        pen: "https://www.readawrite.com/?action=user_page&user_id_publisher=739781",
      },
    },
    {
      id: 7,
      name: "seatale",
      image: "/images/profile/seatale.jpg",
      socials: {
        twitter: "https://x.com/S3ATAL3",
        bluesky: "https://bsky.app/profile/seatale.bsky.social",
        pen: "https://seatale.readawrite.com/",
      },
    },
    {
      id: 8,
      name: "Jaylor",
      image: "/images/profile/jaylor-1.png",
      socials: {
        twitter: "https://x.com/jxylor?s=21&t=NN8Aj7UU1q_adgdKy55hgA",
        bluesky: "https://bsky.app/profile/jxylor.bsky.social",
        pen: "https://www.readawrite.com/?action=user_page&user_id_publisher=2644295",
      },
    },
    {
      id: 9,
      name: "Jaylor",
      image: "/images/profile/jaylor-1.png",
      socials: {
        twitter: "https://x.com/jxylor?s=21&t=NN8Aj7UU1q_adgdKy55hgA",
        bluesky: "https://bsky.app/profile/jxylor.bsky.social",
        pen: "https://www.readawrite.com/?action=user_page&user_id_publisher=2644295",
      },
    },
    {
      id: 10,
      name: "Jaylor",
      image: "/images/profile/jaylor-1.png",
      socials: {
        twitter: "https://x.com/jxylor?s=21&t=NN8Aj7UU1q_adgdKy55hgA",
        bluesky: "https://bsky.app/profile/jxylor.bsky.social",
        pen: "https://www.readawrite.com/?action=user_page&user_id_publisher=2644295",
      },
    },
    {
      id: 11,
      name: "Jaylor",
      image: "/images/profile/jaylor-1.png",
      socials: {
        twitter: "https://x.com/jxylor?s=21&t=NN8Aj7UU1q_adgdKy55hgA",
        bluesky: "https://bsky.app/profile/jxylor.bsky.social",
        pen: "https://www.readawrite.com/?action=user_page&user_id_publisher=2644295",
      },
    },
    {
      id: 12,
      name: "Lumina Luceat",
      image: "/images/profile/lumina.png",
      socials: {
        twitter: "https://x.com/Lumina_Luceat?t=n43W7w8TY28ZH2oBagiV7w&s=09",
        bluesky: "https://bsky.app/profile/luminaluceat.bsky.social",
        pen: "https://www.readawrite.com/?action=user_page&user_id_publisher=2574643",
      },
      instragram:
        "https://www.instagram.com/luminaluceat?igsh=Mzg2M3p0ZjZhand2",
    },
    {
      id: 13,
      name: "Jaylor",
      image: "/images/profile/jaylor-1.png",
      socials: {
        twitter: "https://x.com/jxylor?s=21&t=NN8Aj7UU1q_adgdKy55hgA",
        bluesky: "https://bsky.app/profile/jxylor.bsky.social",
        pen: "https://www.readawrite.com/?action=user_page&user_id_publisher=2644295",
      },
    },
    {
      id: 14,
      name: "Jaylor",
      image: "/images/profile/jaylor-1.png",
      socials: {
        twitter: "https://x.com/jxylor?s=21&t=NN8Aj7UU1q_adgdKy55hgA",
        bluesky: "https://bsky.app/profile/jxylor.bsky.social",
        pen: "https://www.readawrite.com/?action=user_page&user_id_publisher=2644295",
      },
    },
    {
      id: 15,
      name: "ppeachbf_",
      image: "/images/profile/ppeachbf.png",
      socials: {
        twitter: "https://x.com/ppeachbf_?t=cDG2ZkmiAuXLv3n7D0G4kA&s=09",
        bluesky: "https://bsky.app/profile/ppeachbf.bsky.social",
        pen: "https://www.readawrite.com/?action=user_page&user_id_publisher=2698080",
      },
    },
  ];

  const others = [
    {
      id: 1,
      name: "ปอฝอ",
      image: "/images/profile/puifai.png",
      socials: {
        twitter: "https://x.com/lililaxx?s=21&t=trriZKjO9sE5g1x4gUyGpg",
      },
    },
    {
      id: 2,
      name: "Jane Smith",
      image: "/images/hero-section-1.png",
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
                <img src="/images/hero-1.png" alt="My Image" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="carousel-item">
                <img src="/images/hero-2.png" alt="My Image" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <div className="two-section">
        <div className="book-container">
          <img
            src="/images/Book_Dust_Jacket_Mockup_2.png"
            alt="Book 1"
            className="image book-front"
          />
          <img
            src="/images/Book_Dust_Jacket_Mockup_1.png"
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

      <div className="foot-section">
        <div className="left">
          <h3>Operated by @krtskandkhn_th</h3>
        </div>
        <div className="right">
          <a href="#" target="_blank" rel="noopener noreferrer">
            {iconMap["twitter"]}
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            {iconMap["instagram"]}
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
