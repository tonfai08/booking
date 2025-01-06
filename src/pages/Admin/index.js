import React, { useEffect, useState } from "react";
import { Table, Image, Button, Tag, message } from "antd";
import { fetchOrders } from "../../services/order";
import "./styles.css";

function AdminPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await fetchOrders();
        setOrders(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        message.error("Failed to fetch orders.");
        setLoading(false);
      }
    };

    fetchOrderData();
  }, []);

  // กำหนด Columns ของตาราง
  const columns = [
    {
      title: "ชื่อผู้สั่งซื้อ",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "อีเมล",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "เบอร์โทร",
      dataIndex: "tel",
      key: "tel",
    },
    {
      title: "ที่อยู่",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "paid" ? "green" : "volcano"}>{status}</Tag>
      ),
    },
    {
      title: "สลิปการโอนเงิน",
      dataIndex: "slip",
      key: "slip",
      render: (slip) => (
        <Image
          src={`data:image/jpeg;base64,${slip}`}
          width={100}
          alt="Slip"
          preview={true}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Button type="primary" onClick={() => handleAction(record)}>
          จัดการ
        </Button>
      ),
    },
  ];

  const handleAction = (record) => {
    console.log("Action clicked for order:", record);
    message.info(`คุณคลิก Action สำหรับคำสั่งซื้อของ ${record.name}`);
  };

  return (
    <div>
      <div className="admin-box">
        <h1 className="admin-title">จัดการคำสั่งซื้อ</h1>
        <Table
          className="admin-table"
          columns={columns}
          dataSource={orders}
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
}

export default AdminPage;
