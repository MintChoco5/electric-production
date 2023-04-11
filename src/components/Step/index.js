import { Card, Button } from "antd";
import "./index.scss";
import { http } from "@/utils";
function Step(props) {
  // const judge = () => {
  //   const res = http.get("/apparatus");
  // };
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
          <div>
          应操作：{props.should}
          </div>
          <br />
          实操作：{props.actual}
          <br />
          判定时间：{}
          {/* 会换行吗会换行吗会换行吗会换行吗会换行吗会换行吗会换行吗会换行吗会换行吗会换行吗会换行吗会换行吗会换行吗 */}
          <br />
          仪器名？：{}
          <br />
          {/* <Button
            htmlType="button"
            style={{
              margin: "0 8px",
            }}
            onClick={() => judge()}
          >
            判断
          </Button> */}
        {/* </Card> */}
      </div>
    </>
  );
}

export { Step };
