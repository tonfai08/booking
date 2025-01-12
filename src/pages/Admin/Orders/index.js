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
  Tabs,
} from "antd";
import { fetchOrders, updateOrder } from "../../../services/order";
import "./styles.css";
import Sidebar from "../../../components/Sidebar";
import Papa from "papaparse";
import moment from "moment";

const { Option } = Select;
const { TabPane } = Tabs;

function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [form] = Form.useForm();
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await fetchOrders();
        setOrders(response);
        setFilteredOrders(response); // ตั้งค่าข้อมูลเริ่มต้น
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        message.error("Failed to fetch orders.");
        setLoading(false);
      }
    };

    fetchOrderData();
  }, []);

  const handleExportCSV = () => {
    const csvData = filteredOrders.map((order) => ({
      Name: order.name,
      Email: order.email,
      Address: order.address,
      Tel: order.tel,
      Book1: order.book1,
      Book2: order.book2,
      TotalPrice: order.totalPrice,
      Status: order.status,
      CreatedAt: new Date(order.createdAt).toLocaleString(),
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "orders.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleTabChange = (key) => {
    if (key === "all") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter((order) => order.status === key));
    }
  };

  const columns = [
    {
      title: "ชื่อผู้สั่งซื้อ",
      dataIndex: "name",
      key: "name",
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value),
      sorter: (a, b) => a.name.localeCompare(b.name), // ใช้ localeCompare สำหรับ string
    },
    {
      title: "อีเมล",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email), // ใช้ localeCompare สำหรับ string
    },
    {
      title: "order No.",
      dataIndex: "orderId",
      key: "orderId",
      sorter: (a, b) => a.orderId - b.orderId, // ใช้ตัวเลขเปรียบเทียบ
    },
    {
      title: "จำนวนเงิน",
      dataIndex: "totalPrice",
      key: "totalPrice",
      sorter: (a, b) => a.totalPrice - b.totalPrice, // ใช้ตัวเลขเปรียบเทียบ
    },
    {
      title: "เบอร์โทร",
      dataIndex: "tel",
      key: "tel",
      sorter: (a, b) => a.tel.localeCompare(b.tel), // ใช้ localeCompare สำหรับ string
    },
    {
      title: "ที่อยู่",
      dataIndex: "address",
      key: "address",
      sorter: (a, b) => a.address.localeCompare(b.address), // ใช้ localeCompare สำหรับ string
    },
    {
      title: "วันที่สร้างรายการ",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => (
        <span>{moment(createdAt).format("DD/MM/YYYY HH:mm:ss")}</span>
      ),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt), // ใช้ Date เปรียบเทียบ
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "paid" ? "green" : "volcano"}>{status}</Tag>
      ),
      sorter: (a, b) => a.status.localeCompare(b.status), // ใช้ localeCompare สำหรับ string
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

  const handleEdit = (record) => {
    setCurrentOrder(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentOrder(null);
  };

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
    <Sidebar title="Orders">
      <div>
        <div className="admin-box">
          <div className="admin-btn-export">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <Tabs defaultActiveKey="all" onChange={handleTabChange}>
                <TabPane tab="All" key="all" />
                <TabPane tab="Pending" key="pending" />
                <TabPane tab="Paid" key="paid" />
              </Tabs>
            </div>
            <Button type="primary" onClick={handleExportCSV}>
              Export CSV
            </Button>
          </div>
          <Table
            className="admin-table"
            columns={columns}
            dataSource={filteredOrders}
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
    </Sidebar>
  );
}

export default AdminOrdersPage;
