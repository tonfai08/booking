import React, { useState } from "react";
import FlipPage from "react-flip-page";
import { Viewer } from "pdf-viewer-reactjs";
import "./styles.css";

const FlipBook = ({ pdfUrl, onClose }) => {
  const pages = [
    <div key={1} className="page">
      <Viewer fileUrl={pdfUrl} />
    </div>,
    <div key={2} className="page">
      <Viewer fileUrl={pdfUrl} />
    </div>,
    <div key={3} className="page">
      <Viewer fileUrl={pdfUrl} />
    </div>,
  ];

  return (
    <div className="flipbook-overlay">
      <button className="close-btn" onClick={onClose}>
        ✖
      </button>
      <FlipPage orientation="horizontal">{pages}</FlipPage>
    </div>
  );
};

export default FlipBook;
