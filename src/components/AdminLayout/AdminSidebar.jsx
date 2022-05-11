import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { Button, Layout, Menu } from "antd";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import React from "react";
import { navigation } from "../../navigation";

import "./sidebar.scss";

const { Sider } = Layout;

export default function Sidebar(props) {
  const { collapsedSidebar, setCollapsedSidebar } = props;

  return (
    <Sider collapsed={collapsedSidebar}>
      <div className="action-button">
        <Button
          type="primary"
          icon={
            <BsFillGrid3X3GapFill
              style={{
                fontSize: "23px",
                color: "#fff",
              }}
            />
          }
          onClick={() => setCollapsedSidebar(true)}
          size="middle"
        />
        <Button
          type="primary"
          icon={
            <FaBars
              style={{
                fontSize: "23px",
                color: "#fff",
              }}
            />
          }
          onClick={() => setCollapsedSidebar(false)}
        ></Button>
      </div>
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        {navigation.map((i, index) => {
          return (
            <Menu.Item icon={i.icon} key={`${i.link}-${index}`}>
              <Link to={i.link}>{i.text}</Link>
            </Menu.Item>
          );
        })}
      </Menu>
    </Sider>
  );
}
