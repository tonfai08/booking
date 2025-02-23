import React, { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Navbar from "../../components/Navbar";
import { getCustomerByTwitter } from "../../services/customer";
import "./styles.css";
import { Steps } from "antd";

function CheckStatus() {
  const [twitter, setTwitter] = useState("");
  const [customerData, setCustomerData] = useState(null);
  const [error, setError] = useState(null);
  const [stepIndex, setStepIndex] = useState(-1); // เริ่มต้นยังไม่มีขั้นตอนถูกเลือก

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setCustomerData(null);
    setStepIndex(-1); // รีเซ็ต Step เมื่อกด Submit ใหม่

    if (!twitter.trim()) {
      setError("⚠️ Please enter a Twitter handle.");
      return;
    }

    try {
      const data = await getCustomerByTwitter(twitter);
      setCustomerData(data);
    } catch (err) {
      setError("❌ No customer found or an error occurred.");
    }
  };
  const getStepIndex = (customerData) => {
    if (!customerData) return -1; // ยังไม่ได้ Submit
    if (customerData.status === "waiting") return 0;
    if (customerData.status === "payment") {
      if (
        !customerData.postId ||
        customerData.postId === "" ||
        customerData.postId === null
      ) {
        return 2;
      }
      if (customerData.postStatus === "Success") {
        return 4;
      }
      return 3;
    }
    return -1; // เงื่อนไขอื่น ๆ
  };

  const stepIndexTest = getStepIndex(customerData);
  return (
    <div className="input-container">
      <Navbar />
      <div className="input-section">
        <h2>Check Customer Status</h2>
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
            placeholder="Enter Twitter handle"
            className="input-field"
          />
          <button type="submit" className="submit-btn">
            Search
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}
        {/* {customerData && (
          <div className="customer-result">
            <h3>Customer Data:</h3>
            <pre>{JSON.stringify(customerData, null, 2)}</pre>
          </div>
        )} */}
        <Steps
          current={stepIndexTest}
          items={[
            {
              title: "Waiting for Payment Verification",
              description: "Your payment is being verified.",
            },
            {
              title: "Payment Completed",
              description: "Your payment has been successfully processed.",
            },
            {
              title: "Awaiting Shipment",
              description: "Your order is being prepared for shipment.",
            },
            {
              title: "Shipped",
              description: "Your order has been shipped and is on its way.",
            },
            {
              title: "Delivered",
              description: "Your order has been successfully delivered.",
            },
          ]}
        />
      </div>
    </div>
  );
}

export default CheckStatus;
