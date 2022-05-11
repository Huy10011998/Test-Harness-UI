import "antd/dist/antd.css";
import React, { useState } from "react";
import { Layout } from "antd";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import "./Admin.scss";

const { Content } = Layout;

export default function AdminLayout(props) {
  const [collapsedSidebar, setCollapsedSidebar] = useState(false);

  return (
    <div className="dashboard">
      <AdminHeader />
      <Layout style={{ minHeight: "100vh" }}>
        <AdminSidebar
          collapsedSidebar={collapsedSidebar}
          setCollapsedSidebar={setCollapsedSidebar}
        />
        <Layout className="site-layout">
          <Content>
            <div className="site-layout-background" style={{ padding: 24 }}>
              {props.children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
