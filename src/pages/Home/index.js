import Clothing from "../Clothing";
import Device from "../Device";
import Operation from "../Operation";
import Procedure from "../Procedure";
import "./index.scss";
import { Row, Col } from "antd";
import React, { useState, createContext } from "react";

export const Context = createContext()

const Home = () => {
  const props1 = [
    {
      id: 1,
      title: "安装五防编码锁",
    },
    {
      id: 2,
      title: "合闸接地开关",
    },
    {
      id: 3,
      title: "摇入手车至实验位",
    },
  ];
  const [key, setKey] = useState(782);
  return (
    <>
    <Context.Provider value={[key, setKey]}>
      <div>
        <Operation />
      </div>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={6} xs={24} md={6}>
            {/* <Card title="Card title" bordered={false}>
              Card content
            </Card> */}
            <Clothing/>
          </Col>
          <Col span={6} xs={24} md={6}>
            {/* <Card title="Card title" bordered={false}>
              Card content
            </Card> */}
            <Device />
          </Col>
          <Col span={12} xs={24} md={12}>
            {/* <Card title="Card title" bordered={false}>
              Card content
            </Card> */}
            <Procedure msg={props1} />
          </Col>
        </Row>
      </div>
      </Context.Provider>
    </>
  );
};
export default Home;
