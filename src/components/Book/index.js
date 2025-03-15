import React, { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { FaXmark } from "react-icons/fa6";
import booksData from "../../data/books.json";
import "./styles.css";

const Book = ({ bookId, onClose }) => {
  const pages = booksData[bookId] || [];
  const flipBook = useRef(null);

  const handleClose = () => {
    if (flipBook.current && flipBook.current.pageFlip) {
      flipBook.current.pageFlip().flip(0);
    }
    onClose(); // ✅ ปิด Modal
  };

  return (
    <div className="book-container">
      <a className="book-close-btn" onClick={handleClose}>
        <FaXmark />
      </a>

      <HTMLFlipBook
        ref={flipBook} // ✅ เชื่อมกับ useRef
        width={400}
        height={567}
        className="flipbook"
        minWidth={300}
        maxWidth={851}
        minHeight={425}
        maxHeight={749}
        size="stretch"
        maxShadowOpacity={0.5}
        showCover={true} // ✅ ให้รองรับปกเดี่ยว
        mobileScrollSupport={true} // ✅ รองรับมือถือ
      >
        {pages.map((page, index) => (
          <div key={index} className={`page ${page.name}`}>
            <img src={page.image} alt={page.name} />
          </div>
        ))}
      </HTMLFlipBook>
    </div>
  );
};

export default Book;
