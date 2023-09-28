import React, { useEffect, useState } from "react";
import { Button, Checkbox, Col, Input, Modal, Rate, Row } from "antd";
import "../modal/OrderModal.scss";
import "../../variables.scss";
import { CheckboxValueType } from "antd/es/checkbox/Group";

type Props = { status: any };

// const statusList = [
//   {
//     status: "COMPLETED",
//     label: "ให้คะแนน",
//   },
//   {
//     status: "REJECTED",
//     label: "รายละเอียดการยกเลิก",
//   },
// ];

const OrderModal = (props: Props) => {
  const options = [
    { label: "รอนานเกินไป", value: "รอนานเกินไป" },
    { label: "ผู้ขายไม่ตอบกลับข้อความ", value: "ผู้ขายไม่ตอบกลับข้อความ" },
    {
      label: "ฉันต้องการแก้ไขรายการคำสั่งซื้อ",
      value: "ฉันต้องการแก้ไขรายการคำสั่งซื้อ",
    },
    {
      label: "ฉันต้องการเปลี่ยนที่อยู่สำหรับการจัดส่ง",
      value: "ฉันต้องการเปลี่ยนที่อยู่สำหรับการจัดส่ง",
    },
    { label: "อื่นๆ", value: "อื่นๆ" },
  ];
  const [checkBox, setCheckBox] = useState<any>();

  const onChange = (checkedValues: CheckboxValueType[]) => {
    checkedValues.map((e: any) => {
      if (e === "อื่นๆ") {
        setCheckBox(e);
      }
    });
  };

  return (
    <>
      <Row>
        <Col>
          {props.status === "PENDING" && (
            <Row justify={"center"} gutter={[0, 36]}>
              <div className="modal-title-font" style={{ color: "green" }}>
                การยกเลิกคำสั่งซื้อ
              </div>
              <div
                className="modal-content-font"
                style={{
                  borderRadius: "12px",
                  background: "#FFF",
                  boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
                  padding: "15px",
                }}
              >
                กรุณาเลือกเหตุผลที่คุณต้องการยกเลิกคำสั่งซื้อ (เลือกได้มากกว่า
                1)
              </div>
              <Row>
                <Col>
                  <Checkbox.Group options={options} onChange={onChange} />
                </Col>
              </Row>

              {checkBox && checkBox === "อื่นๆ" && <Input />}
              <Row>
                <Col>
                  <Button
                    onClick={() => {
                      Modal.destroyAll();
                      console.log("ได้รับสินค้าแล้ว");
                    }}
                    className="btn_rejected"
                  >
                    ยกเลิกคำสั่งซื้อ
                  </Button>

                  <Button
                    onClick={() => {
                      Modal.destroyAll();
                      console.log("ได้รับสินค้าแล้ว");
                    }}
                    className="btn_success"
                  >
                    ขอคิดดูก่อน
                  </Button>
                </Col>
              </Row>
            </Row>
          )}
          {props.status === "SHIPPING" && (
            <Row justify={"center"} gutter={[0, 36]}>
              <div className="modal-title-font" style={{ color: "green" }}>
                ยืนยันการได้รับสินค้า
              </div>
              <div
                className="modal-content-font"
                style={{
                  borderRadius: "12px",
                  background: "#FFF",
                  boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
                  padding: "15px",
                }}
              >
                หากท่านกดปุ่ม “ได้รับสินค้าแล้ว”
                จะเป็นการยืนยันว่าท่านได้รับสินค้าครบถ้วน
                ถูกต้องตามรายการคำสั่งซื้อ
              </div>
              <Button
                type="primary"
                onClick={() => {
                  Modal.destroyAll();
                  console.log("ได้รับสินค้าแล้ว");
                }}
              >
                ได้รับสินค้า
              </Button>
            </Row>
          )}
          {props.status === "COMPLETED" && (
            <>
              <Row justify={"center"} gutter={[0, 36]}>
                <div className="modal-title-font" style={{ color: "green" }}>
                  ให้คะแนน
                </div>
                <div
                  className="modal-content-font"
                  style={{
                    borderRadius: "12px",
                    background: "#FFF",
                    boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
                    padding: "15px",
                  }}
                >
                  คุณรู้สึกประทับใจมากน้อยแค่ไหนกับฟาร์มนี้
                </div>

                <Rate style={{ fontSize: "20px" }} />

                <Row>
                  {" "}
                  <div className="modal-content-font">
                    เขียนคอมเม้นท์(ถ้ามี)
                  </div>
                  <Input />
                </Row>

                <Button
                  type="primary"
                  onClick={() => {
                    Modal.destroyAll();
                    console.log("ใหคะแนน");
                  }}
                >
                  ยืนยัน
                </Button>
              </Row>
            </>
          )}
          {props.status === "REJECTED" && (
            <Row justify={"center"} gutter={[0, 36]}>
              <div className="modal-title-font" style={{ color: "red" }}>
                คำสั่งถูกยกเลิก
              </div>
              <div
                className="modal-content-font"
                style={{
                  borderRadius: "12px",
                  background: "#FFF",
                  boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
                  padding: "15px",
                }}
              >
                <Row justify={"center"}>
                  <div
                    className="modal-content-font"
                    style={{ marginBottom: "10px" }}
                  >
                    คำสั่งซื้อถูกยกเลิกโดย
                  </div>
                  <div
                    className="modal-content-font"
                    style={{ color: "green" }}
                  >
                    คุณ
                  </div>
                </Row>

                <div style={{ marginBottom: "5px" }}>
                  คุณได้ทำการยกเลิกคำสั่งซื้อเนื่องจาก
                </div>
                <div
                  className="modal-content-font"
                  style={{ color: "#FEA938" }}
                >
                  “ฉันต้องการเปลี่ยนที่อยู่สำหรับการจัดส่ง”
                </div>
              </div>
            </Row>
          )}
        </Col>
      </Row>
    </>
  );
};

export default OrderModal;
