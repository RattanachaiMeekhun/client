import React from "react";
import ProductCardComponet from "../../component/card/ProductCardComponet";
import { Col, Row } from "antd";
import CustomCarousel from "../../component/container/CustomCarousel";

type Props = {};

const HomeContent = (props: Props) => {
  const array = Array(20).fill(0);

  return (
    <>
      <CustomCarousel
        mode={"horizontal"}
        perPage={5}
        gap={20}
        width={"100%"}
        transition={0.2}
      >
        {array.map((e, index) => (
          <ProductCardComponet key={index} />
        ))}
      </CustomCarousel>

      <CustomCarousel
        mode={"vertical"}
        height={500}
        gap={20}
        perPage={5}
        transition={0.2}
      >
        {array.map((e, index) => (
          <ProductCardComponet key={index} />
        ))}
      </CustomCarousel>
    </>
  );
};

export default HomeContent;
