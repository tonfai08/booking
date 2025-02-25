import React from "react";
import {
  FaXTwitter,
  FaFacebook,
  FaInstagram,
  FaBluesky,
  FaPenClip,
} from "react-icons/fa6"; //
import "./styles.css";

const iconMap = {
  twitter: <FaXTwitter />,
  facebook: <FaFacebook />,
  instagram: <FaInstagram />,
  bluesky: <FaBluesky />,
  pen: <FaPenClip />,
};

const ContactList = ({ title, contacts }) => {
  return (
    <div className="contact-section">
      <div>
        <h4>{title}</h4> {/* 🔹 แสดงหัวข้อที่ส่งมา */}
      </div>
      <div className="contact-list">
        {contacts.map((contact) => (
          <div key={contact.id} className="contact-item">
            {/* 🔹 รูปภาพ */}
            <img
              src={contact.image}
              alt={contact.name}
              className="contact-image"
            />

            {/* 🔹 ชื่อ */}
            <h3 className="contact-name">{contact.name}</h3>

            {/* 🔹 Social Icons (เฉพาะอันที่มีลิงก์) */}
            <div className="contact-socials">
              {Object.entries(contact.socials || {}) // ถ้าไม่มี socials จะเป็น object ว่าง
                .filter(([_, link]) => link && link !== "#") // ตัดอันที่ไม่มีลิงก์หรือเป็น "#"
                .map(([key, link]) => (
                  <a
                    key={key}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {iconMap[key]}
                  </a>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
