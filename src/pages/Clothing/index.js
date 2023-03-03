import VideoJS from "@/components/VideoJS";
import React, { useEffect, useState, useContext } from "react";
// import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  QuestionCircleTwoTone,
} from "@ant-design/icons";
import { Card, Button } from "antd";
import "./index.scss";
import { algorithm } from "@/utils";
import { useStore } from "@/store";
import { Context } from "../Home/index";
import axios from "axios";

const Clothing = () => {
  const { selectedStore } = useStore();
  const playerRef = React.useRef(null);
  const [key] = useContext(Context);

  console.log("clothing output key:", key);
  console.log("after setKey: clothing output key:", key);
  // 参考
  // 获取操作柜列表
  // const [cabinets, setCabinets] = useState([]);
  // useEffect(() => {
  //   async function fetchCabinets() {
  //     const res = await http.get("/ticket/cabinet");
  //     setCabinets(res.data.devices);
  //   }
  //   fetchCabinets();
  // }, []);

  const videoJsOptions = {
    // 自动播放：为true时，加载完毕自动播放
    autoplay: true,
    // 播放器子控件是否显示：为true时显示暂停、播放速率等按钮
    controls: true,
    // 响应性：为true时，播放视频进度条会自动移动
    responsive: true,
    // 流式布局：为true时尽可能大得填满父标签的剩余空间
    fluid: true,
    // 视频源
    sources: [
      {
        // 视频文件的路径，可以是一个前端相对路径、后台视频文件URL、直播源等
        //src: "../assets/video.mp4",
        src: require("../../../src/assets/video.mp4"),
        // 视频源类型
        type: "video/mp4",
      },
    ],
  };

  // 播放器实例化完成后的事件动作，注意！不是视频加载成功
  const handlePlayerReady = (player) => {
    playerRef.current = player;
    // 播放器的子事件在这里定义

    player.on("canplaythrough", () => {
      console.log("视频加载完成！");
    });

    player.on("error", () => {
      console.log(`视频文件加载失败，请稍后重试！`);
    });

    player.on("stalled", () => {
      console.log(`网络异常，请稍后重试！`);
    });
  };

  // 获取着装诊断结果列表
  const [clothings, setClothings] = useState([]);
  useEffect(() => {
    async function fetchClothings() {
      // console.log("key in useEffect:", key);
      const payload = {
        workerId: 1,
      };
      // const res = await algorithm.post("/dress",{
      //   workerId:4,
      // });
      const res = await axios.post("http://localhost:5000/dress",{
        workerId: 1
      })
      console.log("KEY=3 flask", res);
      setClothings(res.data);
    }
    fetchClothings();
  }, [key, clothings]);

  // 假数据
  const data = [
    {
      code: 200,
      msg: "write uniform error success",
      result: "False",
      helmet: "True",
      gloves: "Unknown",
      uniform: "True",
      img: "1_uniform.jpg",
    },
  ];
  return (
    <>
      {/* <div style={{width:100, height:200}}> */}
      {/* <div className="clothing-c"> */}
      <Card
        title={
          <div style={{ textAlign: "center" }}>
            <b>着装诊断</b>
          </div>
        }
        bordered={true}
        style={{ height: 425 }}
      >
        {/* <VideoJS options={videoJsOptions} onReady={handlePlayerReady} /> */}
        <br />
        总结果
        {clothings["result"]}
        {/* {JSON.stringify(selectedStore.clothingInfo["result"])} */}
        <br />
        安全帽
        {clothings["helmet"]}
        {data[0].helmet}
        {data[0].helmet === "True" && (
          <div>
            <CheckCircleTwoTone twoToneColor="#52c41a" />
            佩戴安全帽
          </div>
        )}
        {data[0].helmet === "Unknown" && (
          <div>
            <QuestionCircleTwoTone twoToneColor="#ffa940" />
            不明确是否佩戴安全帽
          </div>
        )}
        {data[0].helmet === "False" && (
          <div>
            <CloseCircleTwoTone twoToneColor="#eb2f96" />
            未佩戴安全帽
          </div>
        )}
        手套
        {clothings["gloves"]}
        {data[0].gloves}
        {data[0].gloves === "True" && (
          <div>
            <CheckCircleTwoTone twoToneColor="#52c41a" />
            佩戴绝缘手套
          </div>
        )}
        {data[0].gloves === "Unknown" && (
          <div>
            <QuestionCircleTwoTone twoToneColor="#ffa940" />
            不明确是否佩戴绝缘手套
          </div>
        )}
        {data[0].gloves === "False" && (
          <div>
            <CloseCircleTwoTone twoToneColor="#eb2f96" />
            未佩戴绝缘手套
          </div>
        )}
        工作服
        {clothings["uniform"]}
        {data[0].uniform}
        {data[0].uniform === "True" && (
          <div>
            <CheckCircleTwoTone twoToneColor="#52c41a" />
            穿着工作服
          </div>
        )}
        {data[0].uniform === "Unknown" && (
          <div>
            <QuestionCircleTwoTone twoToneColor="#ffa940" />
            不明确是否穿着工作服
          </div>
        )}
        {data[0].uniform === "False" && (
          <div>
            <CloseCircleTwoTone twoToneColor="#eb2f96" />
            未穿着工作服
          </div>
        )}
        图片显示
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
        <div
          className="totalclothing"
          style={{
            textAlign: "center",
            position: "absolute",
            bottom: 10,
            left: 0,
            right: 0,
          }}
        >
          着装正确
        </div>
      </Card>
      {/* </div> */}
    </>
  );
};

export default Clothing;
