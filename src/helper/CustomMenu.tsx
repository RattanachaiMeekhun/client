import { Menu, MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

export function getCustomMenuItem(props: MenuItem): MenuItem {
  return {
    ...props,
  } as MenuItem;
}
