import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Flipbook from "./pages/Book";
import Dashboard from "./pages/Admin";
import AdminOrdersPage from "./pages/Admin/Orders";
import CheckStatus from "./pages/CheckStatus";
import "./styles.css";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<Flipbook />} />
        <Route path="/checkstatus" element={<CheckStatus />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/orders" element={<AdminOrdersPage />} />
      </Routes>
    </Router>
  );
}

export default App;
