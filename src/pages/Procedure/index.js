import { Card, Row, Col } from "antd";
import { useContext, useState, useEffect } from "react";
import "./index.scss";
import { Step } from "@/components/Step";
import { Context } from "../Home/index";
import { algorithm } from "@/utils";

const Procedure = (props) => {
  const [key] = useContext(Context);
  console.log("procedure output key:", key);

  // 获取步骤检测结果列表
  const [steps, setSteps] = useState([]);
  useEffect(() => {
    async function fetchSteps() {
      console.log("key in procedure useEffect:", key);
      const res = await algorithm.post("/cabinet", key);
      setSteps(res.data);
    }
    fetchSteps();
  }, [key, steps]);

  console.log(props.msg);
  return (
    <>
      <Card
        title={
          <div style={{ textAlign: "center" }}>
            <b>操作步骤诊断</b>
          </div>
        }
        headStyle={{ color: "#0785fd" }}
        bodyStyle={{ overflowX: "auto", whiteSpace: "nowrap" }}
        bordered={true}
        style={{ height: 425 }}
      >
        <div className="procedure-container">
          <Row wrap={false}>
            {props.msg.map((item) => (
              <Col>
                <Step number={item.id} should={item.title}></Step>
              </Col>
            ))}
            <Col className="empty-margin"></Col>
          </Row>
        </div>
      </Card>
    </>
  );
};
export default Procedure;
