import { Route, Routes } from "react-router-dom";
import HomeContent from "../content/homepage/HomeContent";
import LoginContent from "../content/loginpage/LoginContent";
import OrderContent from "../content/orderpage/OrderContent";

type Props = {};

const Router = (props: Props) => {
  return (
    <Routes>
      <Route path="/" element={<HomeContent />} />
      <Route path="/login" element={<LoginContent />} />
      <Route path="/order" element={<OrderContent />} />
    </Routes>
  );
};

export default Router;
