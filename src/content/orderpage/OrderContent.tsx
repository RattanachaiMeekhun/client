import { Button, Col, Empty, Modal, Row, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import "../orderpage/OrderContent.scss";
import OrderTable from "../../component/ordertable/OrderTable";
import { getBuyerOrder } from "../../service/OrderService";
import {
  CheckCircleOutlined,
  CheckOutlined,
  CloseOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import OrderModal from "../../component/modal/OrderModal";
import { log } from "console";

type Props = {};

interface order {
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
  orderItem: {
    order_item_id: number;
    weight: number;
    price: number;
    farm_id: number;
    farm_name: string;
    plant_name: string;
    species: string;
    image: string;
  }[];
}
const tabList = [
  { label: `ทั้งหมด`, key: "ALL" },
  { label: `รอผู้ชายตอบรับ`, key: "PENDING" },
  { label: `ชำระเงิน`, key: "WAIT_FOR_PAYMENT" },
  { label: `รอรับสินค้า`, key: "SHIPPING" },
  { label: `สำเร็จแล้ว`, key: "COMPLETED" },
  { label: `ยกเลิกแล้ว`, key: "REJECTED" },
];
const OrderContent = (props: Props) => {
  const { confirm } = Modal;
  const [orderData, setOrderData] = useState<order[]>([]);
  const [orderDataOld, setOrderDataOld] = useState<order[]>([]);
  const [status, setStatus] = useState<string>("ALL");
  const [tab, setTab] = useState<{ label: string; key: string }[]>(tabList);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const res = await getBuyerOrder("ALL", 1, 10);
    setOrderData(res.response.data);
    setOrderDataOld(res.response.data);
  };
  const statusType = async (statusType: string) => {
    const filtered = orderDataOld.filter((e: order) => {
      if (statusType === "All") {
        return e;
      } else if (e.status === statusType) {
        return e;
      }
    });
    setOrderData(orderDataOld);
    setOrderData(filtered);
    filtered.map((e: order) => {
      setStatus(e.status);
    });

    const items = tabList.map((e: { label: string; key: string }) => {
      if (e.key === statusType) {
        return {
          label: e.label + `(${filtered?.length})`,
          key: e.key,
        };
      }
      return e;
    });
    setTab(items);
  };

  const onButtonClick = () => {
    confirm({
      content: <OrderModal status={status} />,
      footer: false,
      closable: true,
      closeIcon: <CloseOutlined onClick={() => Modal.destroyAll()} />,
    });
  };

  return (
    <>
      <div className="order-page">
        <Row justify={"center"}>
          <Col xs={24} sm={24} lg={24} xl={24} xxl={17}>
            <p
              className="title"
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "black",
                textDecoration: "underline solid #FEA938 5px",
              }}
            >
              คำสั่งซื้อของฉัน
            </p>
          </Col>
        </Row>
        <Row justify={"center"}>
          <Col xs={24} sm={24} lg={24} xl={24} xxl={17}>
            <Tabs
              defaultActiveKey="ALL"
              items={tab}
              onChange={statusType}
              size="large"
            />
          </Col>
        </Row>
        {orderData !== undefined && orderData.length > 0 ? (
          orderData.map((e: order) => {
            return (
              <Row justify={"center"} key={e.order_id}>
                <Col xs={20} sm={23} lg={22} xl={22}>
                  <OrderTable
                    allItem={e}
                    data={e.orderItem}
                    date={e.received_date}
                    status={e.status}
                    onButtonClick={onButtonClick}
                  />
                </Col>
              </Row>
            );
          })
        ) : (
          <Empty />
        )}
      </div>
    </>
  );
};

export default OrderContent;
