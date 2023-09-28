import { Table, Image, Row, Col, Button, Empty } from "antd";
import { ColumnsType } from "antd/es/table";
import "../ordertable/OrderTable.scss";
import logo from "../../assets/EmptyImage.webp";
import React, { memo, useEffect, useState } from "react";
import OrderModal from "../modal/OrderModal";
import { summary } from "../../helper/MathFucntion";
import dayjs from "dayjs";

type Props = {
  allItem: DataType;
  data: orderItem[];
  date: string;
  status: string;
  onButtonClick: () => void;
};

interface DataType {
  order_id: number;
  farm_id: number;
  status: string;
  address: string;
  type: string;
  received_date: string;
  price_per_distance: number;
  remark_buyer: string | null;
  remark_seller: string | null;
  note: string | null;
  images_buyer: { image_url: string }[];
  images_seller: [];
  user: {
    id: number;
    first_name: string;
    last_name: string;
    telephone: string;
    email: string;
    avatar_uri: string;
  };
  orderItem: orderItem[];
}
interface orderItem {
  order_item_id: number;
  weight: number;
  price: number;
  farm_id: number;
  farm_name: string;
  plant_name: string;
  species: string;
  image: string;
}
const OrderTable = memo((props: Props) => {
  const [farmName, setFarmName] = useState<any>("");

  const columns: ColumnsType<any> = [
    {
      title: () => {
        return (
          <p className="farm-title">
            {farmName.farm_name} ({props.data.length})
          </p>
        );
      },
      dataIndex: "plant_name",
      width: "60%",
      render: (value, record) => {
        setFarmName(record);
        return (
          <>
            <Row align={"middle"}>
              <Col style={{ marginRight: "10px" }}>
                <Image
                  width={100}
                  height={90}
                  src={
                    // https://paksod-api.wolfapprove.com/dev/api/v1/image/download/${record.image}
                    record.image
                      ? `https://paksod-api.wolfapprove.com/dev/tmp/images/plant/${record.image}`
                      : "error"
                  }
                  fallback={logo}
                  style={{ borderRadius: "10px" }}
                />
              </Col>
              <Col>
                <div className="farm_content_font">{value}</div>
              </Col>
            </Row>
          </>
        );
      },
    },
    {
      title: "จำนวน",
      dataIndex: "weight",
      width: "20%",
    },
    {
      title: "ราคาสุทธิ",
      dataIndex: "price",
      width: "20%",
      render: (value) => {
        return value + "฿";
      },
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={props.data}
        bordered
        footer={(item) => {
          const totalPrice = summary(item.map((e) => e.price));
          return (
            <>
              <Row justify={"space-between"}>
                <Row>
                  <Col>
                    <div className="status-title">
                      สถานะคำสั่งซื้อ :{" "}
                      {props.allItem.status ? props.allItem.status : "-"}
                    </div>
                    <div className="date-title">
                      วันที่ทำรายการ :{" "}
                      {dayjs(props.date).format("DD/MM/YYYY hh:mm:ss")}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div>
                      ยอดการสั่งซื้อ({props.data.length}) {totalPrice}฿
                    </div>
                    <Button
                      className={`btn_${props.status.toLowerCase()}`}
                      onClick={() => props.onButtonClick()}
                    >
                      {props.status}
                    </Button>
                  </Col>
                </Row>
              </Row>
            </>
          );
        }}
        pagination={false}
        style={{ marginBottom: "10px" }}
      />
    </>
  );
});

export default OrderTable;
