import wretch from "wretch";
import { notification } from "antd";
import { HOST } from "./apis";
import "../context/AlertContext.tsx";

export const wretchInstance = (options = { withCredentials: true }) => {
  let headers: any = {
    "Content-Type": "application/json",
  };
  if (options.withCredentials) {
    const token = window.localStorage.getItem("token") || "";
    if (!token) {
      window.location.href = "/login";
    } else {
      headers.Username = window.localStorage.getItem("username") || "";
      headers.Authorization = "Bearer " + token;
    }
  }

  return wretch(HOST.apiUrl)
    .headers(headers)
    .resolve((data: any) => {
      return data.json();
    })
    .catcher(400, (error) => {
      notification.error({
        message: "Error",
        description: JSON.parse(error.message),
      });
      return JSON.parse(error.message);
    })
    .catcher(404, (error) => {
      console.log("error=>", error.json());

      return false;
    })
    .catcher(405, (error) => {
      const msg = JSON.parse(error.message);
      notification.error({
        message: "Error",
        description: msg.Message,
      });
      return false;
    })
    .catcher(500, (error) => {
      const msg = JSON.parse(error.message);
      notification.error({
        message: "Error",
        description: msg.Message,
      });
      return false;
    });
};
