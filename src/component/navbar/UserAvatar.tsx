import { Popover, Avatar, Menu, MenuProps } from "antd";
import React from "react";
import useAuthen from "../../hook/useAuthen";
import MenuItem from "antd/es/menu/MenuItem";
import { LogoutOutlined, MailOutlined } from "@ant-design/icons";
import { getCustomMenuItem } from "../../helper/CustomMenu";

const UserAvatar = () => {
  const { authDetail, onLogout } = useAuthen();

  const menuItems: MenuProps["items"] = [
    getCustomMenuItem({
      label: "Sign out",
      icon: (
        <>
          <LogoutOutlined />
        </>
      ),
      key: "signout",
      danger: true,
      onClick: () => {
        onLogout();
      },
    }),
  ];

  return (
    <Popover
      placement="bottomRight"
      content={
        <>
          {" "}
          <Menu
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={menuItems}
          />
        </>
      }
      trigger="click"
    >
      <Avatar
        className="nav-user-avatar"
        src={authDetail.userData?.avatarUrl}
        shape="circle"
        size="large"
      />
    </Popover>
  );
};

export default UserAvatar;
