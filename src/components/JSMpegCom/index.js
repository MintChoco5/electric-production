import React, { useEffect, useState } from "react";
import JSMpeg from "./jsmpeg.min.js";

const JSMpegCom = (props) => {
  useEffect(() => {
    const video = document.getElementById("video");
    // const url = "ws://" + document.location.hostname + ":9998/";
    let url = "ws://" + document.location.hostname + ":9998/";
    const url2 = "ws://" + document.location.hostname + ":9997/";
    if(props.msg2 === 1){
      url = url2;
      console.log("inner url",url)
    }
    // console.log(url);
    const player = new JSMpeg.Player(url, {
      canvas: video,
      disableWebAssembly: true,
      disableGl: true,
      autoplay: true,
      loop: true,
    });
    console.log(player);
    player.play();
    return ()=>{
      player.destroy();
    };
  }, [props.msg2]);

  return (
    <>
      <div className={"containers"} 
      style={{ width: 450, height: 320 }}
      >
        {/* <h1>视频直播</h1> */}
        <canvas id="video" className={"video"} 
        // width={450} 
        // height={320}
        style={{ width: 450, height: 300 }}
        >
          事实上
        </canvas>
      </div>
    </>
  );
};

export default JSMpegCom;
