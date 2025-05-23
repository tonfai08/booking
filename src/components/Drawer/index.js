import React, { useState } from "react";
import { Button, Input, Form, message } from "antd";
import { createOrder } from "../../services/order";
import "./styles.css";

const DrawerSell = (props) => {
  const { onClose, stepBuy, changeStepBuy } = props;
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [slipBase64, setSlipBase64] = useState("");

  const pricePerItem1 = 300;
  const pricePerItem2 = 500;

  const totalPrice1 = count1 * pricePerItem1;
  const totalPrice2 = count2 * pricePerItem2;

  const totalItems = count1 + count2;
  const shippingFee =
    totalItems === 0 ? 0 : 30 + Math.max(0, totalItems - 1) * 10;
  const grandTotal = totalPrice1 + totalPrice2 + shippingFee;

  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async () => {
    if (!totalItems) {
      message.error("กรุณาเลือกสินค้าอย่างน้อย 1 เล่ม");
      return;
    }
    if (!slipBase64) {
      message.error("กรุณาอัปโหลดสลิปการโอนเงิน");
      return;
    }

    const orderData = {
      email: customerInfo.email,
      name: `${customerInfo.firstName} ${customerInfo.lastName}`,
      address: customerInfo.address,
      tel: customerInfo.phone,
      book1: count1,
      book2: count2,
      totalPrice: grandTotal,
      slip: slipBase64,
    };

    try {
      const result = await createOrder(orderData);
      console.log("Order created successfully:", result);
      resetForm();
      setOrderSuccess(true);
      setShowCustomerForm(false);
      changeStepBuy(2);
      message.success("การสั่งซื้อสำเร็จ!");
    } catch (error) {
      console.error("Error creating order:", error);
      message.error("เกิดข้อผิดพลาดในการสั่งซื้อ");
    }
  };

  const resetForm = () => {
    setCount1(0);
    setCount2(0);
    setCustomerInfo({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
    });
  };

  const handleClose = () => {
    setShowCustomerForm(false);
    setOrderSuccess(false);
    resetForm();
    onClose();
  };

  const handleConfirmClick = () => {
    if (totalItems === 0) {
      message.error("กรุณาเลือกสินค้าอย่างน้อย 1 เล่ม");
    } else {
      setShowCustomerForm(true);
      changeStepBuy(1);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) message.error("กรุณาอัพโหลด Slip");
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(",")[1]; // เอาเฉพาะ Base64
        setSlipBase64(base64String);
      };
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
        message.error("เกิดข้อผิดพลาดในการอ่านไฟล์");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="seatsContainer">
      {stepBuy === 2 ? (
        <>
          ขอบคุณสำหรับการสั่งซื้อ
          <Button type="primary" onClick={handleClose}>
            ตกลง
          </Button>
        </>
      ) : stepBuy === 0 ? (
        <>
          <div className="book-buy">
            <div className="book-buy-img">
              <img src="/images/hero-section-1.png" alt="Product 1" />
            </div>
            <div className="book-buy-count">
              <Input
                type="number"
                min="0"
                value={count1}
                onChange={(e) => setCount1(parseInt(e.target.value, 10) || 0)}
                placeholder="จำนวน"
              />
            </div>
            <div className="book-buy-price">฿{totalPrice1} บาท</div>
          </div>
          <div className="book-buy">
            <div className="book-buy-img">
              <img src="/images/hero-section-2.png" alt="Product 2" />
            </div>
            <div className="book-buy-count">
              <Input
                type="number"
                min="0"
                value={count2}
                onChange={(e) => setCount2(parseInt(e.target.value, 10) || 0)}
                placeholder="จำนวน"
              />
            </div>
            <div className="book-buy-price">฿{totalPrice2} บาท</div>
          </div>
          <hr />
          <p>ค่าจัดส่ง: ฿{shippingFee} บาท</p>
          <p>ราคารวมทั้งหมด: ฿{grandTotal} บาท</p>
          <Button type="primary" onClick={handleConfirmClick}>
            ยืนยัน
          </Button>
        </>
      ) : (
        <div>
          <h2>ข้อมูลส่วนตัวการจัดส่ง</h2>
          <Form layout="vertical" onFinish={handleFormSubmit}>
            <Form.Item label="ชื่อ" required>
              <Input
                name="firstName"
                value={customerInfo.firstName}
                onChange={handleInputChange}
                placeholder="กรอกชื่อ"
              />
            </Form.Item>
            <Form.Item label="นามสกุล" required>
              <Input
                name="lastName"
                value={customerInfo.lastName}
                onChange={handleInputChange}
                placeholder="กรอกนามสกุล"
              />
            </Form.Item>
            <Form.Item label="อีเมล" required>
              <Input
                name="email"
                value={customerInfo.email}
                onChange={handleInputChange}
                placeholder="กรอกอีเมล"
              />
            </Form.Item>
            <Form.Item label="เบอร์โทร" required>
              <Input
                name="phone"
                value={customerInfo.phone}
                onChange={handleInputChange}
                placeholder="กรอกเบอร์โทร"
              />
            </Form.Item>
            <Form.Item label="ที่อยู่" required>
              <Input.TextArea
                name="address"
                value={customerInfo.address}
                onChange={handleInputChange}
                placeholder="กรอกที่อยู่"
                rows={4}
              />
            </Form.Item>
            <Form.Item label="อัปโหลดสลิปการโอนเงิน" required>
              <Input type="file" accept="image/*" onChange={handleFileUpload} />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              ยืนยันการสั่งซื้อ
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default DrawerSell;
