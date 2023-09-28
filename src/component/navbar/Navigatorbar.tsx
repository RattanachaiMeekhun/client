import { Avatar, Badge, Button, Col, Menu, Popover, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/LOGO.webp";
import useAuthen from "../../hook/useAuthen";
import { BellOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "./Navigatorbar.scss";
import UserAvatar from "./UserAvatar";
import { useEffect, useState } from "react";

const unAuthorized = {
  logo: { xs: 12, sm: 9, lg: 13, xl: 15, xxl: 17 },
  menu: { xs: 8, sm: 12, lg: 9, xl: 7, xxl: 5 },
  account: { xs: 5, sm: 3, lg: 2, xl: 2, xxl: 2 },
};

const authorized = {
  logo: { xs: 8, sm: 7, lg: 9, xl: 14, xxl: 17 },
  menu: { xs: 7, sm: 12, lg: 9, xl: 7, xxl: 5 },
  account: { xs: 9, sm: 5, lg: 4, xl: 3, xxl: 2 },
};

const Navigatorbar = () => {
  const navigate = useNavigate();
  const { authDetail } = useAuthen();

  const [layout, setLauot] = useState(unAuthorized);

  useEffect(() => {
    if (authDetail.isAuthenticated) {
      setLauot(authorized);
    } else {
      setLauot(unAuthorized);
    }
  }, [authDetail]);

  return (
    <Row justify={"space-between"} align={"middle"}>
      <Col {...layout.logo} style={{ display: "flex" }}>
        <Link to={"/"}>
          <img
            src={logo}
            alt={"logo"}
            style={{ position: "absolute", top: -20 }}
          />
        </Link>
      </Col>
      <Col {...layout.menu} style={{ display: "flex", justifyContent: "end" }}>
        <Menu
          theme="light"
          defaultSelectedKeys={["1"]}
          mode="horizontal"
          style={{ width: "100%" }}
          items={[
            {
              key: "1",
              label: "หน้าแรก",
              onClick: () => {
                navigate("/");
              },
            },
            {
              key: "2",
              label: "สินค้า",
            },
            {
              key: "3",
              label: "ปฏิทินผลผลิต",
            },
            {
              key: "4",
              label: "ระบบตรวจสอบ",
            },
          ]}
        />
      </Col>
      <Col {...layout.account}>
        {authDetail.isAuthenticated ? (
          <Row gutter={[10, 10]}>
            <Col>
              {" "}
              <Badge count={5} color="hsla(11, 100%, 50%, 1)">
                <Avatar
                  className="nav-avatar"
                  shape="circle"
                  size="large"
                  icon={<BellOutlined />}
                />
              </Badge>
            </Col>
            <Col>
              <Badge count={5} color="hsla(11, 100%, 50%, 1)">
                <Avatar
                  className="nav-avatar"
                  shape="circle"
                  size="large"
                  icon={<ShoppingCartOutlined />}
                  onClick={() => {
                    navigate("/order");
                  }}
                />
              </Badge>
            </Col>
            <Col>
              <UserAvatar />
            </Col>
          </Row>
        ) : (
          <Button
            className="login-btn"
            type="primary"
            onClick={() => {
              navigate("/login");
            }}
          >
            เข้าสู่ระบบ
          </Button>
        )}
      </Col>
    </Row>
  );
};

export default Navigatorbar;
