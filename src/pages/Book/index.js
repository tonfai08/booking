import React from "react";
import { Viewer } from "@react-pdf-viewer/core";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import "@react-pdf-viewer/core/lib/styles/index.css";
import Book from "../../components/Book";

const Flipbook = () => {
  return (
    <div style={{ height: "90vh" }}>
      <Book />
    </div>
  );
};

export default Flipbook;
