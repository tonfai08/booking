import React from "react";
import {
  FaXTwitter,
  FaFacebook,
  FaInstagram,
  FaBluesky,
  FaPenFancy,
} from "react-icons/fa6"; //
import "./styles.css";

const iconMap = {
  twitter: <FaXTwitter />,
  facebook: <FaFacebook />,
  instagram: <FaInstagram />,
  bluesky: <FaBluesky />,
  pen: <FaPenFancy />,
};

const ContactList = ({ title, contacts }) => {
  return (
    <div className="contact-section">
      <div className="contact-title">
        <h4 className="contact-h4">{title}</h4>
      </div>
      <div className="contact-list">
        {contacts.map((contact) => (
          <div key={contact.id} className="contact-item">
            <img
              src={contact.image}
              alt={contact.name}
              className="contact-image"
            />

            <h3 className="contact-name">{contact.name}</h3>

            <div className="contact-socials">
              {Object.entries(contact.socials || {})
                .filter(([_, link]) => link && link !== "#")
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
      {title !== "Staff" ? (
        <div className="contact-divider"></div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ContactList;
