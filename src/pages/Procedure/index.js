import { Card, Row, Col, Button, Steps } from "antd";
import { useContext, useState, useEffect } from "react";
import "./index.scss";
import { Step } from "@/components/Step";
import { Context } from "../Home/index";
import { algorithm } from "@/utils";
import axios from "axios";
import JSMpegCom from "@/components/JSMpegCom";

// let timer = null;

const Procedure = (props) => {
  // const [key] = useContext(Context);
  // console.log("procedure output key:", key);
  const description = "这里是步骤描述";
  // 获取步骤检测结果列表
  const [steps, setSteps] = useState({
    code: 200,
    msg: "write operation error success",
    step_order: 1,
    result: "False",
    need_procedure: "将远方/就地切换开关切换至就地位置",
    actual_procedure: "远方就地切换->右",
    img: "1_operation.jpg",
  });
  // useEffect(() => {
  //   async function fetchSteps() {
  //     // console.log("key in procedure useEffect:", key);
  //     // const res = await algorithm.post("/cabinet", key);
  //     // setSteps(res.data);
  //   }
  //   fetchSteps();
  // }, [steps]);
  const [items, setItems] = useState({
    list: [
      {
        title: "已完成",
        description,
        // status: "error"
      },
      {
        title: "已完成",
        description,
      },
      {
        title: "正在进行",
        description,
      },
      {
        title: "等待中",
        description,
      },
      {
        title: "等待中",
        description,
      },
    ],
    current: 2,
  });
  useEffect(() => {
    let flag=0
    async function fetchItems() {
      if (
        !(Array.prototype.isPrototypeOf(props.msg) && props.msg.length === 0)
      ) {
        console.log("进判断了");
        let arrnew = [];
        for (const key in props.msg) {
          const mytitle = "";
          if(props.msg[key].result === "Unknown"&&flag==0){
            arrnew.push(Object.assign({ title: "未完成", description: <div>应操作：{props.msg[key].needProcedure}<br/>
            实操作：{props.msg[key].actualProcedure}</div>,status:"waiting"}));
            flag=1
          }
          else if(props.msg[key].result === "Unknown"&&flag==1){
            arrnew.push(Object.assign({ title: "未完成", description: <div>应操作：{props.msg[key].needProcedure}<br/>
            实操作：{props.msg[key].actualProcedure}</div>,status:"waiting"}));
            flag=1
          }
          else if(props.msg[key].result === "False"){
            arrnew.push(Object.assign({ title: "错误", description: <div>应操作：{props.msg[key].needProcedure}<br/>
            实操作：{props.msg[key].actualProcedure}</div> ,status:"error"}));
          }
          else{
            arrnew.push(Object.assign({ title: "已完成", description: <div>应操作：{props.msg[key].needProcedure}<br/>
            实操作：{props.msg[key].actualProcedure}</div> }));
          }
          // if(props.msg.)
        }
        console.log("arrnew", arrnew);
        setItems({list:arrnew,current:3});
      }
      console.log("props.msg", props.msg);
    }
    fetchItems();
  }, [props.msg]);
  // 轮询
  // useEffect(() => {
  //   console.log("传进procedure的msg:", props.msg);
  //   if (!(Array.prototype.isPrototypeOf(props.msg) && props.msg.length === 0)) {
  //     getStepsData(); //数据查询函数，
  //     clearTimerFun(); //清空定时器
  //     setTimerFun(); //创建定时器
  //   }
  // }, [props.msg]); //监听筛选条件，一旦变化就立即重新查询，并清空已有定时器，创建新的定时器

  // useEffect(() => {
  //   return () => {
  //     clearTimerFun(); //组件销毁时，清空定时器
  //   };
  // }, []);

  // const setTimerFun = () => {
  //   console.log("创建定时器");
  //   timer = setInterval(() => {
  //     getStepsData();
  //   }, 5000);
  // };
  // const clearTimerFun = () => {
  //   console.log("清空定时器");
  //   clearInterval(timer);
  // };
  // const getStepsData = () => {
  //   console.log("查询逻辑：", props.msg);
  //   //这里自行编写查询逻辑
  //   setItems({
  //     list: [{ title: "已完成", description: <div>应操作：开关一:出<br/>实操作：开关一:出</div> },
  //     { title: "已完成", description: <div>应操作：接地保护跳闸:出<br/>实操作：接地保护跳闸:出</div> },
  //     { title: "正在进行", description: <div>应操作：低周减载:出<br/>实操作：</div> },
  //     // { title: "等待中", description: <div>应操作：<br/>实操作：</div> },
  //   ],
  //     current: 2,
  //   });
  // };
  // 判断
  const [acsteps, setAcsteps] = useState([
    {
      code: 200,
      msg: "write operation error success",
      step_order: 1,
      result: "False",
      need_procedure: "将远方/就地切换开关切换至就地位置",
      actual_procedure: "远方就地切换->右",
      img: "1_operation.jpg",
    },
  ]);
  // const judge = async () => {
  //   // const res = await axios.post("http://localhost:5000/operation", {
  //   //   workerId: 3,
  //   // });
  //   // setSteps(res.data);
  //   const data2 = [
  //     {
  //       code: 200,
  //       msg: "write operation error success",
  //       step_order: 2,
  //       result: "False",
  //       need_procedure: "将远方/就地切换开关切换至就地位置",
  //       actual_procedure: "我是second",
  //       img: "1_operation.jpg",
  //     },
  //   ];
  //   if (data2[0].step_order >= steps[0].step_order) {
  //     acsteps.push(data2[0]);
  //     console.log(acsteps);
  //     console.log(acsteps.length);
  //     console.log(acsteps[0].actual_procedure);
  //   }
  //   setSteps([
  //     {
  //       code: 200,
  //       msg: "write operation error success",
  //       step_order: 2,
  //       result: "False",
  //       need_procedure: "将远方/就地切换开关切换至就地位置",
  //       actual_procedure: "我是second",
  //       img: "1_operation.jpg",
  //     },
  //   ]);
  // };
  // console.log(props.msg);
  const [isCover, setIsCover] = useState(true);
  const [hasTicket, setHasTicket] = useState(false);

  return (
    <>
      <Card
        title={
          <div style={{ textAlign: "center" }}>
            <b>操作步骤诊断</b>
            {/* <Button onClick={judge}>判断</Button> */}
          </div>
        }
        // headStyle={{ color: "#0785fd" }}
        bodyStyle={{ overflowX: "auto", whiteSpace: "nowrap" }}
        bordered={true}
        style={{ height: 425, overflowY: "auto" }}
        size="small"
      >
        {/* <div className="procedure-container"> */}
        {/* <Row wrap={false}>
              {props.msg.map((item, index) => (
                <Col>
                  <Step
                    number={item.id}
                    should={item.description}
                    actual={
                      item.stepOrder === steps[0].step_order
                        ? steps[0].actual_procedure
                        : ""
                    }
                  ></Step>
                </Col>
              ))}
              <Col className="empty-margin"></Col>
            </Row> */}
        <Row>
          {/* <Col>
            <div className="procedure-stream">
              {isCover ? (
                <img
                  src="https://wx2.sinaimg.cn/mw1024/006YrfC3ly1hcandvq9a8j30go0bbq44.jpg"
                  className="tupian"
                ></img>
              ) : (
                <JSMpegCom />
              )}
            </div>
          </Col> */}
          {/* <div className="procedure-steps"> */}
          <Col
          // push={3}
          >
            <Steps
              direction="vertical"
              current={items.current}
              items={items.list}
            />
            {/* </div> */}
          </Col>
        </Row>
        {/* </div> */}
      </Card>
    </>
  );
};
export default Procedure;
