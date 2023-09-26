import {
  ArrowLeftOutlined,
  UnlockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Col, Divider, Input, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/LOGO_login.webp";
import Icon from "@ant-design/icons";
import { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import { loginSerive } from "../../service/AuthService";
import { useState } from "react";
import { debugConsole } from "../../helper/log";
import useAuthen from "../../hook/useAuthen";
import loginBG from "../../assets/loginboxbg.webp";
import { Controller, useForm } from "react-hook-form";

const lineIcon = () => (
  <svg
    width="37"
    height="25"
    viewBox="0 0 30 37"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="37" height="37" rx="18.5" fill="#00B900" />
    <path
      d="M18.5682 7.98535C12.4398 7.98535 7.45312 12.0026 7.45312 16.9404C7.45312 21.3672 11.4075 25.0745 16.749 25.7755C17.111 25.853 17.6036 26.0125 17.7283 26.3196C17.8403 26.5986 17.8016 27.0357 17.7641 27.3175C17.7641 27.3175 17.6337 28.0962 17.6055 28.262C17.5572 28.541 17.3822 29.3532 18.5682 28.8569C19.7547 28.3606 24.9696 25.1149 27.3015 22.4501C28.912 20.6964 29.6835 18.9167 29.6835 16.9404C29.6835 12.0026 24.6975 7.98535 18.5682 7.98535Z"
      fill="white"
    />
    <path
      d="M15.4786 14.5938C15.3602 14.5938 15.2639 14.6931 15.2639 14.8152V19.7797C15.2639 19.902 15.3602 20.0011 15.4786 20.0011H16.2511C16.3695 20.0011 16.4656 19.902 16.4656 19.7797V14.8152C16.4656 14.6931 16.3695 14.5938 16.2511 14.5938H15.4786Z"
      fill="#00B900"
    />
    <path
      d="M21.6472 14.5938H20.834C20.7093 14.5938 20.6082 14.6931 20.6082 14.8152V17.7646L18.2934 14.6923C18.2881 14.6844 18.2821 14.677 18.2758 14.6698L18.2743 14.6684C18.2698 14.6634 18.2654 14.6591 18.2607 14.6547C18.2594 14.6534 18.258 14.6523 18.2565 14.651C18.2527 14.6475 18.2487 14.6442 18.2445 14.6411C18.2427 14.6394 18.2407 14.6381 18.2387 14.6366C18.2347 14.6339 18.2309 14.6311 18.2269 14.6287C18.2247 14.6272 18.2225 14.6259 18.22 14.6248C18.216 14.6224 18.212 14.62 18.208 14.618C18.2056 14.6169 18.2034 14.6156 18.2009 14.6147C18.1967 14.6128 18.1925 14.6108 18.188 14.6093C18.1854 14.6084 18.1832 14.6075 18.1807 14.6066C18.1763 14.6051 18.1718 14.6036 18.1672 14.6025C18.1647 14.6016 18.162 14.6012 18.1594 14.6003C18.1549 14.5994 18.1507 14.5983 18.1465 14.5975C18.1434 14.597 18.14 14.5966 18.1369 14.5964C18.1329 14.5955 18.1289 14.5953 18.1249 14.5948C18.1212 14.5944 18.1174 14.5944 18.1134 14.5942C18.1105 14.5942 18.1083 14.5938 18.1054 14.5938H17.2924C17.1677 14.5938 17.0664 14.6931 17.0664 14.8152V19.7797C17.0664 19.902 17.1677 20.0011 17.2924 20.0011H18.1054C18.2303 20.0011 18.3314 19.902 18.3314 19.7797V16.8311L20.6491 19.9075C20.6651 19.9297 20.6849 19.9479 20.7065 19.9623C20.7071 19.9627 20.708 19.9634 20.7087 19.964C20.7133 19.9669 20.718 19.9697 20.7227 19.9723C20.7249 19.9736 20.7269 19.9745 20.7291 19.9756C20.7325 19.9776 20.7362 19.9793 20.7398 19.9808C20.7436 19.9824 20.7469 19.9839 20.7509 19.9854C20.7531 19.9863 20.7553 19.9872 20.7576 19.9878C20.7629 19.9898 20.7678 19.9913 20.7729 19.9929C20.774 19.9929 20.7751 19.9933 20.7762 19.9935C20.7947 19.9983 20.814 20.0011 20.834 20.0011H21.6472C21.7721 20.0011 21.873 19.902 21.873 19.7797V14.8152C21.873 14.6931 21.7721 14.5938 21.6472 14.5938Z"
      fill="#00B900"
    />
    <path
      d="M14.4435 18.758H12.2905V14.8156C12.2905 14.6931 12.192 14.5938 12.0707 14.5938H11.2781C11.1566 14.5938 11.0581 14.6931 11.0581 14.8156V19.779V19.7795C11.0581 19.8391 11.0817 19.893 11.1196 19.9328C11.1205 19.9339 11.1213 19.935 11.1226 19.9361C11.1237 19.9372 11.1248 19.938 11.1259 19.9391C11.1655 19.9776 11.2188 20.0011 11.2779 20.0011H14.4435C14.5649 20.0011 14.663 19.9016 14.663 19.779V18.9799C14.663 18.8574 14.5649 18.758 14.4435 18.758Z"
      fill="#00B900"
    />
    <path
      d="M25.8592 15.8369C25.9807 15.8369 26.0788 15.7377 26.0788 15.615V14.8159C26.0788 14.6933 25.9807 14.5938 25.8592 14.5938H22.6939H22.6935C22.6341 14.5938 22.5806 14.6178 22.541 14.6564C22.5401 14.6573 22.5391 14.658 22.5384 14.6588C22.5371 14.6601 22.536 14.6615 22.5349 14.6628C22.4973 14.7025 22.4739 14.7562 22.4739 14.8156V14.8159V19.7793V19.7795C22.4739 19.8391 22.4975 19.893 22.5354 19.9328C22.5362 19.9339 22.5373 19.9352 22.5384 19.9361C22.5393 19.9372 22.5406 19.9383 22.5417 19.9391C22.5811 19.9773 22.6346 20.0011 22.6935 20.0011H25.8592C25.9807 20.0011 26.0788 19.9016 26.0788 19.7793V18.9799C26.0788 18.8576 25.9807 18.758 25.8592 18.758H23.7065V17.9189H25.8592C25.9807 17.9189 26.0788 17.8195 26.0788 17.697V16.8979C26.0788 16.7754 25.9807 16.6758 25.8592 16.6758H23.7065V15.8369H25.8592Z"
      fill="#00B900"
    />
  </svg>
);

const LineIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={lineIcon} {...props} />
);

interface ILoginForm {
  username: string;
  password: string;
}

const LoginContent = () => {
  const { handleSubmit, control } = useForm<ILoginForm>();
  const [msgErr, setMsgErr] = useState<string>();
  const navigate = useNavigate();
  const { updateAuthDetail } = useAuthen();

  const onSubmit = async (data: ILoginForm) => {
    const res = await loginSerive(data);

    if (res.token) {
      window.localStorage.setItem("token", res.token.token);
      window.localStorage.setItem(
        "avatar",
        res.user.avatar_uri.replaceAll("user-", "")
      );
      updateAuthDetail({
        isAuthenticated: true,
        token: res.token,
        userData: {
          avatarUrl:
            "https://paksod-api.wolfapprove.com/dev/tmp/images/user/" +
            res.user.avatar_uri.replaceAll("user-", ""),
        },
      });
      setMsgErr(undefined);
    } else {
      setMsgErr(res.message);
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="left-side">
          <Button
            className="back"
            icon={<ArrowLeftOutlined style={{ fontSize: 30 }} />}
            ghost
            onClick={() => navigate("/")}
          />
          <div className="centered">
            <h1 style={{ fontSize: "64px" }}>ยินดีต้อนรับ</h1>
            <p style={{ fontSize: "48px" }}>
              เลือกซื้อผักเพื่อสุขภาพ ปราศจากสารเคมี จากเกษตรกรท้องถิ่น
              ได้ที่ผักสด
            </p>
          </div>
        </div>
        <div className="right-side">
          <div className="title">
            <img title="logo" src={logo} alt={"A website logo"} />
          </div>
          <div className="form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row justify={"center"}>
                <Col span={20}>
                  <div className="text-title">
                    <UserOutlined />
                    <p>Username : </p>
                  </div>
                  <Controller
                    key={"username"}
                    name="username"
                    control={control}
                    rules={{ required: "Username is required" }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        {" "}
                        <Input
                          id="username"
                          type="text"
                          placeholder="Username"
                          status={(error || msgErr) && "error"}
                          {...field}
                        />
                        {error && (
                          <div role={"err-username"} style={{ color: "red" }}>
                            {error.message}{" "}
                          </div>
                        )}
                      </>
                    )}
                  />
                </Col>
              </Row>
              <Row justify={"center"}>
                <Col span={20}>
                  <div className="text-title">
                    <UnlockOutlined />
                    <p>Password : </p>
                  </div>
                  <Controller
                    key={"password"}
                    name="password"
                    control={control}
                    rules={{ required: "Password is required" }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        {" "}
                        <Input
                          id="password"
                          type="password"
                          placeholder="Password"
                          status={(error || msgErr) && "error"}
                          {...field}
                        />
                        {error && (
                          <div role={"err-password"} style={{ color: "red" }}>
                            {error.message}
                          </div>
                        )}
                      </>
                    )}
                  />

                  {msgErr && (
                    <div role={"msgErr"} style={{ color: "red" }}>
                      {msgErr}{" "}
                    </div>
                  )}

                  <div style={{ width: "100%", textAlign: "end" }}>
                    <Link to={"/"}>forget password</Link>
                  </div>
                </Col>
              </Row>
              <Row justify={"center"} align={"stretch"}>
                <Col span={20}>
                  <Button
                    name="signin"
                    role="button"
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    Sign-in
                  </Button>
                </Col>
              </Row>
            </form>
            <Divider style={{ color: "hsla(0, 0%, 0%, 0.2)", fontSize: 14 }}>
              or
            </Divider>
            <Row justify={"center"} align={"stretch"} gutter={[20, 20]}>
              <Col span={10}>
                <Button
                  htmlType="button"
                  type="primary"
                  style={{ width: "100%" }}
                  onClick={() => navigate("register")}
                >
                  Register
                </Button>
              </Col>
              <Col span={10}>
                <Button
                  className="line-theme"
                  htmlType="button"
                  type="default"
                  style={{
                    width: "100%",
                  }}
                >
                  Log-in With {<Icon component={LineIcon} />}
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginContent;
