import { Card, Button } from "antd";
import "./index.scss";
import { http } from "@/utils";
function Step(props) {
  const judge = () => {
    const res = http.get("/apparatus");
  };
  return (
    <>
      <div className="step-box">
        {/* <Card> */}
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
          <br />
          步骤{props.number}：{}
          <br />
          应操作：{props.need_procedure}
          <br />
          实操作：{props.actual_procedure}
          <br />
          判定时间：{}
          <br />
          仪器名？：{}
          <br />
          <Button
            htmlType="button"
            style={{
              margin: "0 8px",
            }}
            onClick={() => judge()}
          >
            判断
          </Button>
        {/* </Card> */}
      </div>
    </>
  );
}

export { Step };
