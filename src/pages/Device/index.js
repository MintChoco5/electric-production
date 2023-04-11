import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  QuestionCircleTwoTone,
} from "@ant-design/icons";
import React, { useState, useContext, useEffect } from "react";
import { Card, Button } from "antd";
import "./index.scss";
import { http, algorithm } from "@/utils";
import { Context } from "../Home/index";
import VideoJS from "@/components/VideoJS";
import axios from "axios";
import JSMpegCom from "@/components/JSMpegCom";

const { Meta } = Card;

const Device = (props) => {
  // const [key] = useContext(Context);
  // console.log("device output key:", key);
  const playerRef = React.useRef(null);

  // 获取设备检测结果列表
  const [device, setDevice] = useState(
    {
      code: 200,
      msg: "write cabinet error success",
      result: "Unknown",
      ticketId: 1,
      need_cabinet: "还未开始检测",
      actual_cabinet: "还未开始检测",
      img: "1_cabinet.jpg",
    }
  );
  // useEffect(() => {
  //   async function fetchDevice() {
  //     // console.log("key in device useEffect:", key);
  //     // const res = await algorithm.post("/cabinet", key);
  //     // setDevice(res.data);
  //   }
  //   fetchDevice();
  // }, [device]);
  useEffect(() => {
    async function fetchDevice() {
      if(!(Array.prototype.isPrototypeOf(props.msg) && props.msg.length === 0)){
        console.log("进判断了")
        setDevice(props.msg);
      }
      // setDevice(props.msg);
      console.log("props.msg in device com");
    }
    fetchDevice();
  }, [props.msg]);

  const judge = async () => {
    const res = await axios.post("http://localhost:5000/device", {
      workerId: 3,
    });
    setDevice(res.data);
  };

  // VideoJS配置
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
        src: "rtsp://127.0.0.1:554/video2",
        // 视频源类型
        type: "rtmp/flv",
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

  // 假数据
  // const data = [
  //   {
  //     code: 200,
  //     msg: "write cabinet error success",
  //     result: "True",
  //     ticketId: 1,
  //     needCabinet: "10kV安居2线611开关柜",
  //     actualCabinet: "10kV安居2线611开关柜",
  //     img: "1_cabinet.jpg",
  //   },
  // ];
  const [isCover, setIsCover] = useState(true);
  const [hasTicket, setHasTicket] = useState(false);
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
          style={{ height: 208, top:9 }}
          size="small"
        >
          {/* <VideoJS options={videoJsOptions} onReady={handlePlayerReady} /> */}
          {/* <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          /> */}
          {/* <img
            alt="example"
            src={"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"}
          /> */}

          {/* {isCover ? (
            <img src="https://wx2.sinaimg.cn/mw1024/006YrfC3ly1hcandvq9a8j30go0bbq44.jpg"></img>
          ) : (
            <Meta description={<JSMpegCom />} bordered={false} />
          )} */}

          <li className="col">
            <div className="label-icon">
              {device.result === "True" && (
                <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: '16px' }}/>
              )}
              {device.result === "Unknown" && (
                <QuestionCircleTwoTone twoToneColor="#ffa940" style={{ fontSize: '16px' }}/>
              )}
              {device.result === "False" && (
                <CloseCircleTwoTone twoToneColor="#f5222d" style={{ fontSize: '16px' }}/>
              )}
            </div>
            <div className="val" style={{ fontSize: '16px' }}>
              应操作设备：<br />{device.need_cabinet}
              <br />
              实操作设备：<br />{device.actual_cabinet}
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
            style={{
              textAlign: "center",
              position: "absolute",
              bottom: 10,
              left: 0,
              right: 0,
              fontSize: 22
            }}
          >
            {device.result === "True" && <font style={{color:"#52c41a"}}>设备正确</font>}
            {device.result === "Unknown" && <font style={{color:"#ffa940"}}>设备未开始检测</font>}
            {device.result === "False" && <font style={{color:"#f5222d"}}>设备错误</font>}
            {/* {device.result? <font style={{color:"#52c41a"}}>设备正确</font>: <font style={{color:"#f5222d"}}>设备错误</font>} */}
          </div>
        </Card>
      </div>
    </>
  );
};
export default Device;
