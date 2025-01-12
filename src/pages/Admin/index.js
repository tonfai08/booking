import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Sidebar from "../../components/Sidebar";
import { Row, Col, Statistic, Card } from "antd";
import { fetchOrders } from "../../services/order";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [summary, setSummary] = useState({});

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await fetchOrders();

        // ประมวลผลข้อมูล
        const summaryData = {
          totalOrders: response.length,
          totalBook1: response.reduce((sum, order) => sum + order.book1, 0),
          totalBook2: response.reduce((sum, order) => sum + order.book2, 0),
          totalBooks: response.reduce(
            (sum, order) => sum + order.book1 + order.book2,
            0
          ),
          totalPrice: response.reduce(
            (sum, order) => sum + order.totalPrice,
            0
          ),
          pendingOrders: response.filter((order) => order.status === "pending")
            .length,
          paidOrders: response.filter((order) => order.status === "paid")
            .length,
        };

        // ข้อมูลสำหรับกราฟวงกลม
        const pieChartData = [
          { name: "Paid", value: summaryData.paidOrders },
          { name: "Pending", value: summaryData.pendingOrders },
        ];

        // ข้อมูลสำหรับกราฟแท่ง (ยอดขายต่อสัปดาห์)
        const weeklySalesData = response.reduce((acc, order) => {
          const week = `Week ${new Date(order.createdAt).getWeek()}`;
          if (!acc[week]) acc[week] = { week, book1: 0, book2: 0 };

          acc[week].book1 += order.book1;
          acc[week].book2 += order.book2;

          return acc;
        }, {});

        setSummary(summaryData);
        setPieData(pieChartData);
        setBarData(Object.values(weeklySalesData));
        setOrders(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrderData();
  }, []);

  // Helper function to get week from date
  Date.prototype.getWeek = function () {
    const onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil(((this - onejan) / 86400000 + onejan.getDay() + 1) / 7);
  };

  const COLORS = ["#0088FE", "#FF8042"];
  const summaryItems = [
    { title: "Total Orders", value: summary.totalOrders || 0 },
    { title: "Total Book 1", value: summary.totalBook1 || 0 },
    { title: "Total Book 2", value: summary.totalBook2 || 0 },
    { title: "Total Books", value: summary.totalBooks || 0 },
    { title: "Total Price", value: summary.totalPrice || 0, prefix: "฿" },
    { title: "Pending Orders", value: summary.pendingOrders || 0 },
    { title: "Paid Orders", value: summary.paidOrders || 0 },
  ];
  return (
    <Sidebar title="Dashboard">
      <div style={{ padding: "20px" }}>
        <Row gutter={[16, 16]} justify="center">
          {summaryItems.map((item, index) => (
            <Col key={index} span={6}>
              <Card>
                <Statistic
                  title={item.title}
                  value={item.value}
                  prefix={item.prefix}
                  loading={loading}
                />
              </Card>
            </Col>
          ))}
        </Row>

        <div style={{ width: "100%", height: "300px" }}>
          <h3 style={{ textAlign: "center" }}>Payment Status</h3>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* กราฟแท่ง */}
        <div style={{ width: "100%", height: "300px" }}>
          <h3 style={{ textAlign: "center" }}>Weekly Sales</h3>
          <ResponsiveContainer>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="book1" fill="#82ca9d" name="Book 1" />
              <Bar dataKey="book2" fill="#8884d8" name="Book 2" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Sidebar>
  );
};

export default Dashboard;
