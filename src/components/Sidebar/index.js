import React from "react";
import { Menu } from "antd";
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles.css";

const Sidebar = ({ title = "", children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      key: "/admin/",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "/admin/orders",
      icon: <ShoppingCartOutlined />,
      label: "Orders",
    },
    // {
    //   key: "/admin/users",
    //   icon: <UserOutlined />,
    //   label: "Users",
    // },
    // {
    //   key: "/admin/settings",
    //   icon: <SettingOutlined />,
    //   label: "Settings",
    // },
  ];

  return (
    <div className="layout-container">
      {/* Sidebar */}
      <div className="sidebar-container">
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={(e) => navigate(e.key)}
          items={menuItems}
        />
      </div>

      <div className="content-container">
        <div className="header-container">
          <h1 className="page-title">{title}</h1>
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Sidebar;
