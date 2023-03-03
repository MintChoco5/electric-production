import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  QuestionCircleTwoTone,
} from "@ant-design/icons";
import { useState, useContext, useEffect } from "react";
import { Card, Button } from "antd";
import "./index.scss";
import { http, algorithm } from "@/utils";
import { Context } from "../Home/index";

const Device = () => {
  const [key] = useContext(Context);
  console.log("device output key:", key);

  const [shouldDevice, setShouldDevice] = useState("221号柜");
  const [actualDevice, setActualDevice] = useState("221号柜");

  const judge = () => {
    const res = http.post("/cabinet");
    setShouldDevice(res.data.needCabinet);
    setActualDevice(res.data.actualCabinet);
  };

  // 获取设备检测结果列表
  const [device, setDevice] = useState([]);
  useEffect(() => {
    async function fetchDevice() {
      console.log("key in device useEffect:", key);
      const res = await algorithm.post("/cabinet", key);
      setDevice(res.data);
    }
    fetchDevice();
  }, [key, device]);

  // 假数据
  const data = [
    {
      code: 200,
      msg: "write cabinet error success",
      result: "True",
      ticketId: 1,
      needCabinet: "10kV安居2线611开关柜",
      actualCabinet: "10kV安居2线611开关柜",
      img: "1_cabinet.jpg",
    },
  ];
  return (
    <>
      <div className="device-c">
        <Card
          title={
            <div style={{ textAlign: "center" }}>
              <b>操作设备诊断</b>
            </div>
          }
          bordered={true}
          style={{ height: 425 }}
        >
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
          <li className="col">
            <div className="label-icon">
            {data[0].result === "True" && (
                <CheckCircleTwoTone twoToneColor="#52c41a" />
            )}
            {data[0].result === "Unknown" && (
                <QuestionCircleTwoTone twoToneColor="#ffa940" />
            )}
            {data[0].result === "False" && (
                <CloseCircleTwoTone twoToneColor="#eb2f96" />
            )}
            </div>
            <div className="val">
              应操作设备：{data[0].needCabinet}
              <br />
              实操作设备：{data[0].actualCabinet}
            </div>
          </li>
          {/* <Button
            htmlType="button"
            style={{
              margin: "0 8px",
            }}
            onClick={() => judge()}
          >
            判断
          </Button> */}
          <div
          className="totalclothing"
          style={{ textAlign: "center", position: "absolute", bottom: 10, left:0,right:0 }}
        >
          设备正确
        </div>
        </Card>
      </div>
    </>
  );
};
export default Device;
