import React, { useEffect, useState } from "react";
import {
  Table,
  Image,
  Button,
  Tag,
  message,
  Modal,
  Form,
  Input,
  Select,
} from "antd";
import { fetchOrders, updateOrder } from "../../services/order";
import "./styles.css";

const { Option } = Select;

function AdminPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [form] = Form.useForm();

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
      title: "order No.",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "จำนวนเงิน",
      dataIndex: "totalPrice",
      key: "totalPrice",
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
        <Button type="primary" onClick={() => handleEdit(record)}>
          จัดการ
        </Button>
      ),
    },
  ];

  // เปิด Modal และตั้งค่าข้อมูลคำสั่งซื้อ
  const handleEdit = (record) => {
    setCurrentOrder(record);
    form.setFieldsValue(record); // เติมข้อมูลในฟอร์ม
    setIsModalVisible(true);
  };

  // ปิด Modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentOrder(null);
  };

  // อัปเดตคำสั่งซื้อ
  const handleUpdate = async () => {
    try {
      const updatedData = form.getFieldsValue();
      await updateOrder(currentOrder._id, updatedData);
      message.success("Order updated successfully!");
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === currentOrder._id ? { ...order, ...updatedData } : order
        )
      );
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error updating order:", error);
      message.error("Failed to update order.");
    }
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
      <Modal
        title="แก้ไขคำสั่งซื้อ"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleUpdate}
        okText="อัปเดต"
        cancelText="ยกเลิก"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="ชื่อผู้สั่งซื้อ"
            name="name"
            rules={[{ required: true, message: "กรุณากรอกชื่อผู้สั่งซื้อ" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="อีเมล"
            name="email"
            rules={[{ required: true, message: "กรุณากรอกอีเมล" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="เบอร์โทร"
            name="tel"
            rules={[{ required: true, message: "กรุณากรอกเบอร์โทร" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="ที่อยู่"
            name="address"
            rules={[{ required: true, message: "กรุณากรอกที่อยู่" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="สถานะ"
            name="status"
            rules={[{ required: true, message: "กรุณาเลือกสถานะ" }]}
          >
            <Select>
              <Option value="pending">Pending</Option>
              <Option value="paid">Paid</Option>
              <Option value="preparing">Preparing</Option>
              <Option value="shipping">Shipping</Option>
              <Option value="delivered">Delivered</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminPage;
