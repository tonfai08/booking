import React, { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import "./book.css";

const Book = (props) => {
  const { currenBook } = props;
  let book;
  console.log("currenBook", currenBook);
  if (currenBook === 1) {
    book = {
      img: "/images/hero-section-1.png",
    };
  } else {
    book = {
      img: "/images/hero-section-2.png",
    };
  }
  const bookRef = useRef();

  const pages = [
    {
      content: "Welcome to the first page of our book!",
      image: "/images/dice.png",
    },
    {
      content: "This is the second page of the book.",
      image: "https://via.placeholder.com/400x300?text=Page+2",
    },
    {
      content: "Discover more content on this page!",
      image: "https://via.placeholder.com/400x300?text=Page+3",
    },
    {
      content: "Thank you for reading this far!",
      image: "https://via.placeholder.com/400x300?text=Page+4",
    },
  ];

  return (
    <div className="book-container">
      <HTMLFlipBook
        width={400} // ความกว้างของหน้าคู่
        height={600} // ความสูงของหนังสือ
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
          <img src={book.img} alt="Book Cover" className="book-cover-image" />
        </div>

        {/* หน้าใน */}
        {pages.map((page, index) => (
          <div key={index} className="book-page">
            <img
              src={page.image}
              alt={`Page ${index + 1}`}
              className="book-image"
            />
            <p className="book-content">{page.content}</p>
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

export default Book;
