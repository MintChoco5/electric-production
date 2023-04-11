import VideoJS from "@/components/VideoJS";
import videojs from "video.js";
import React, { useEffect, useState, useContext, useMemo } from "react";
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
import JSMpegCom from "@/components/JSMpegCom";
import "./index.scss";

const { Meta } = Card;

const Clothing = (props) => {
  const { selectedStore } = useStore();
  const playerRef = React.useRef(null);
  // const [key] = useContext(Context);

  // console.log("clothing output key:", key);
  // console.log("after setKey: clothing output key:", key);
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

  // const videoJsOptions = {
  //   // 自动播放：为true时，加载完毕自动播放
  //   autoplay: true,
  //   // 播放器子控件是否显示：为true时显示暂停、播放速率等按钮
  //   controls: true,
  //   // 响应性：为true时，播放视频进度条会自动移动
  //   responsive: true,
  //   // 流式布局：为true时尽可能大得填满父标签的剩余空间
  //   fluid: true,
  //   flash: {
  //     swf: "/video-js.swf",
  //   },
  //   // 视频源
  //   sources: [
  //     {
  //       // 视频文件的路径，可以是一个前端相对路径、后台视频文件URL、直播源等
  //       //src: "../assets/video.mp4",
  //       src: require("../../../src/assets/video.mp4"),
  //       // 视频源类型
  //       type: "video/mp4",
  //     },
  //   ],
  // };
  
  // // 改前的
  // // {
  // //   // 视频文件的路径，可以是一个前端相对路径、后台视频文件URL、直播源等
  // //   //src: "../assets/video.mp4",
  // //   src: require("../../../src/assets/video.mp4"),
  // //   // 视频源类型
  // //   type: "video/mp4",
  // // },

  // src: "rtmp://mobliestream.c3tv.com:554/live/goodtv.sdp",
  //       // 视频源类型
  //       type: "rtmp/flv",

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
  const [clothings, setClothings] = useState(
    {
      code: 200,
      msg: "write uniform error success",
      result: "Unknown",
      helmet: "Unknown",
      gloves: "Unknown",
      uniform: "Unknown",
      img: "1_uniform.jpg",
    }
  );
  const [isCover, setIsCover] = useState(false);
  const [hasTicket, setHasTicket] = useState(false);
  useEffect(() => {
    async function fetchClothings() {
      if(!(Array.prototype.isPrototypeOf(props.msg) && props.msg.length === 0)){
        console.log("进判断了")
        setClothings(props.msg);
      }
      console.log("props.msg",props.msg);
    }
    fetchClothings();
  }, [props.msg]);

  // 假数据
  const data = 
    {
      code: 200,
      msg: "write uniform error success",
      result: "False",
      helmet: "True",
      gloves: "True",
      uniform: "True",
      img: "1_uniform.jpg",
    }
  ;
  // setClothings( );
  console.log("this is console log:", clothings[0]);
  // console.log("this is console log:",clothings[0].helmet);
  const judge = async () => {
    const res = await axios.post("http://localhost:5000/dress", {
      workerId: 3,
    });
    // console.log("KEY=3 flask", res);
    setClothings(res.data);
  };

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
        style={{ height: 208 }}
        size="small"
      >
        {/* <VideoJS options={videoJsOptions} onReady={handlePlayerReady} /> */}
        {/* <div className="stream-clothing"> */}
        {/* {isCover ? (
          <img src="https://wx2.sinaimg.cn/mw1024/006YrfC3ly1hcandvq9a8j30go0bbq44.jpg"></img>
        ) : (
          <Meta description={<JSMpegCom />} bordered={false} />
        )} */}

        {/* <img
            alt="example"
            src={clothings[0].img}
          /> */}

        {/* 测试用的 */}
        {clothings.helmet === "True" && (
          <div style={{fontSize:16}}>
            <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: '16px' }}/>
            佩戴安全帽
          </div>
        )}
        {clothings.helmet === "Unknown" && (
          <div style={{fontSize:16}}>
            <QuestionCircleTwoTone twoToneColor="#ffa940" style={{ fontSize: '16px' }}/>
            不明确是否佩戴安全帽
          </div>
        )}
        {clothings.helmet === "False" && (
          <div style={{fontSize:16}}>
            <CloseCircleTwoTone twoToneColor="#f5222d" style={{ fontSize: '16px' }}/>
            未佩戴安全帽
          </div>
        )}
        {clothings.gloves === "True" && (
          <div style={{fontSize:16}}>
            <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: '16px' }}/>
            佩戴绝缘手套
          </div>
        )}
        {clothings.gloves === "Unknown" && (
          <div style={{fontSize:16}}>
            <QuestionCircleTwoTone twoToneColor="#ffa940" style={{ fontSize: '16px' }}/>
            不明确是否佩戴绝缘手套
          </div>
        )}
        {clothings.gloves === "False" && (
          <div style={{fontSize:16}}>
            <CloseCircleTwoTone twoToneColor="#f5222d" style={{ fontSize: '16px' }}/>
            未佩戴绝缘手套
          </div>
        )}
        {clothings.uniform === "True" && (
          <div style={{fontSize:16}}>
            <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: '16px' }}/>
            穿着工作服
          </div>
        )}
        {clothings.uniform === "Unknown" && (
          <div style={{fontSize:16}}>
            <QuestionCircleTwoTone twoToneColor="#ffa940" style={{ fontSize: '16px' }}/>
            不明确是否穿着工作服
          </div>
        )}
        {clothings.uniform === "False" && (
          <div style={{fontSize:16}}>
            <CloseCircleTwoTone twoToneColor="#f5222d" style={{ fontSize: '16px' }}/>
            未穿着工作服
          </div>
        )}

        {/* 图片显示 */}

        {/* <Button
            htmlType="button"
            style={{
              margin: "0 8px",
            }}
            // onClick={() => judge()}
            onClick={judge}
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
          {clothings.result === "True" && <font style={{color:"#52c41a"}}>着装正确</font>}
          {clothings.result === "False" && <font style={{color:"#f5222d"}}>着装错误</font>}
          {clothings.result === "Unknown" && <font style={{color:"#ffa940"}}>着装未开始检测</font>}
          {/* {clothings.result? <font style={{color:"#52c41a"}}>着装正确</font>: <font style={{color:"#f5222d"}}>着装错误</font>} */}
        </div>
      </Card>
      {/* </div> */}
    </>
  );
};

export default Clothing;
