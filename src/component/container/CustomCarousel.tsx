import React, { FC, useEffect, useState } from "react";
import "./CustomCarousel.scss";
import { Button } from "antd";
import {
  DownOutlined,
  LeftOutlined,
  RightOutlined,
  UpOutlined,
} from "@ant-design/icons";

interface Props {
  children: React.ReactNode;
  mode: "vertical" | "horizontal";
  perPage: number;
  transition: number;
  gap?: number | string;
  height?: number | string;
  width?: number | string;
}

const CustomCarousel: FC<Props> = ({
  children,
  perPage,
  mode,
  height,
  gap,
  width,
  transition,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + perPage) % perPage);
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % perPage);
  };

  const getStyle = (): React.CSSProperties => {
    if (mode === "vertical") {
      return {
        display: "flex",
        flexDirection: "column",
        rowGap: gap,
        transform: `translateY(-${currentIndex * 50}%)`,
        height: height,
        transition: `transform ${transition}s ease-in-out`,
      };
    } else {
      return {
        display: "flex",
        flexDirection: "row",
        columnGap: gap,
        transform: `translateX(-${currentIndex * 50}%)`,
        width: width,
        transition: `transform ${transition}s ease-in-out`,
      };
    }
  };

  return (
    <div
      className="display-container"
      style={{
        width: mode == "vertical" ? "fit-content" : "unset",
      }}
    >
      <div className="slider">
        <div className="slider-wrapper" style={getStyle()}>
          {children}
        </div>
      </div>
      <div id={`prev-${mode}`}>
        {mode == "vertical" ? (
          <>
            <Button
              type="default"
              ghost
              shape="circle"
              onClick={handlePrevClick}
              icon={<UpOutlined />}
            />
            <Button
              type="default"
              ghost
              shape="circle"
              onClick={handleNextClick}
              icon={<DownOutlined />}
            />
          </>
        ) : (
          <>
            {" "}
            <Button
              type="default"
              ghost
              shape="circle"
              onClick={handlePrevClick}
              icon={<LeftOutlined />}
            />
            <Button
              type="default"
              ghost
              shape="circle"
              onClick={handleNextClick}
              icon={<RightOutlined />}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default CustomCarousel;
