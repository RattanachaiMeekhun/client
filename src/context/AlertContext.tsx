import { createContext, ReactNode, useEffect, useState } from "react";
import React from "react";
import { useLocation } from "react-router";
import { notification } from "antd";
import "./AlertContext.scss";

interface AlertProviderProps {
  children: ReactNode;
}
declare const AlertType: ["success", "info", "warning", "error"];
interface IToggleAlertParams {
  type: (typeof AlertType)[number];
  message: string;
  description: string;
  duration?: number;
}
interface IAlertContextType {
  toggleAlert: (params: IToggleAlertParams) => void;
}
const AlertContext = createContext<IAlertContextType | null>(null);
const alertColors = {
  error: "#b34045",
  warning: "#fecf6d",
  info: "#4091d7",
  success: "#2d884d",
};
const AlertContextProvider: React.FC<AlertProviderProps> = (props) => {
  const [api, contextHolder] = notification.useNotification();
  const handleToggleAlert = (params: IToggleAlertParams) => {
    const iconSize = 28;

    api["error"]({
      className: "alert-custom",
      message: params.message,
      description: params.description,
      placement: "topRight",
      duration: params.duration && params.duration,
      style: {
        borderRadius: 8,
        zIndex: 10000,
      },
    });
  };
  return (
    <AlertContext.Provider value={{ toggleAlert: handleToggleAlert }}>
      {contextHolder}
      {props.children}
    </AlertContext.Provider>
  );
};

export { AlertContextProvider, AlertContext };
