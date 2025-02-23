import React, { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import "../../components/Book/book.css";

const CheckStatus = () => {
  const bookRef = useRef();

  const pages = [
    { content: "Welcome to the first page of our book!" },
    { content: "This is the second page of the book." },
    { content: "Discover more content on this page!" },
    { content: "Thank you for reading this far!" },
  ];

  return (
    <div className="book-container">
      <HTMLFlipBook
        width={600} // ความกว้างของหน้าคู่
        height={400} // ความสูงของหนังสือ
        size="stretch"
        minWidth={400}
        maxWidth={1200}
        minHeight={300}
        maxHeight={800}
        drawShadow={true} // เพิ่มเงาให้เหมือนจริง
        showCover={true} // แสดงปกหน้าและปกหลัง
        flippingTime={1000} // เวลาเปิดหน้า
        useMouseEvents={true} // ใช้เมาส์ในการพลิกหน้า
        ref={bookRef}
        className="book-flip-book"
      >
        {/* ปกหน้า */}
        <div className="book-page book-page-cover">
          <h1>Book Cover</h1>
        </div>

        {/* หน้าใน */}
        {pages.map((page, index) => (
          <div key={index} className="book-page">
            <h2>Page {index + 1}</h2>
            <p>{page.content}</p>
          </div>
        ))}

        {/* ปกหลัง */}
        <div className="book-page book-page-cover">
          <h1>Back Cover</h1>
        </div>
      </HTMLFlipBook>
    </div>
  );
};

export default CheckStatus;
