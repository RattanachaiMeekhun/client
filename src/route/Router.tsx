import { Route, Routes } from "react-router-dom";
import HomeContent from "../content/homepage/HomeContent";
import LoginContent from "../content/loginpage/LoginContent";

type Props = {};

const Router = (props: Props) => {
  return (
    <Routes>
      <Route path="/" element={<HomeContent />} />
      <Route path="/login" element={<LoginContent />} />
    </Routes>
  );
};

export default Router;
