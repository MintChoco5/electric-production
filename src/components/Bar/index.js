// 仪表错误（还没用）
// 封装图表bar组件
// import * as echarts from "echarts";
import ReactECharts from "echarts-for-react";
import { useEffect, useRef, useState } from "react";

function Bar({ title, xData, y1Data, y2Data, style }) {
  // const domRef = useRef();
  // // const myChart = echarts.init(domRef.current);
  // const chartInit = () => {
  //   // 基于准备好的dom，初始化echarts实例
  //   const myChart = echarts.init(domRef.current);
  //   // 绘制图表
  //   myChart.setOption({
  //     title: {
  //       text: title,
  //     },
  //     tooltip: {},
  //     xAxis: {
  //       data: xData,
  //     },
  //     yAxis: {},
  //     series: [
  //       {
  //         name: "分配到的操作票总数",
  //         type: "bar",
  //         data: y1Data,
  //       },
  //       {
  //         name: "仪器错误总次数",
  //         type: "bar",
  //         data: y2Data,
  //       },
  //     ],
  //   });
  // };
  // useEffect(() => {
  //   chartInit();
  // }, []);
  const DEFAULT_OPTION = {
    // Echarts图表所需要的数据，请移步看官网实例
    // 这里的数据是初始化的时候的默认的数据
    title: {
      text: title,
    },
    tooltip: {},
    xAxis: {
      data: xData,
    },
    yAxis: {},
    series: [
      {
        name: "分配到的操作票总数",
        type: "bar",
        data: y1Data,
        itemStyle: {
          //柱状颜色和圆角
          color: "#A1C298",
          barBorderRadius: [5, 5, 0, 0], // （顺时针左上，右上，右下，左下）
        },
      },
      {
        name: "仪器错误总次数",
        type: "bar",
        data: y2Data,
        itemStyle: {
          //柱状颜色和圆角
          color: "#FA7070",
          barBorderRadius: [5, 5, 0, 0], // （顺时针左上，右上，右下，左下）
        },
      },
    ],
  };
  const [option, setOption] = useState(DEFAULT_OPTION);
  function fetchNewData() {
    console.log("xdata", xData);
    console.log("y1data", y1Data);
    console.log("y2data", y2Data);
    const newOption = {
      // Echarts图表所需要的数据，请移步看官网实例
      // 这里的数据是初始化的时候的默认的数据
      title: {
        text: title,
      },
      tooltip: { trigger: "axis" },
      xAxis: {
        data: xData,
      },
      yAxis: {},
      series: [
        {
          name: "分配到的操作票总数",
          type: "bar",
          data: y1Data,
          barMinHeight: 2,
        },
        {
          name: "仪器错误总次数",
          type: "bar",
          data: y2Data,
          barMinHeight: 2,
        },
      ],
    };
    setOption(newOption);
    console.log("newoption", newOption);
  }
  useEffect(() => {
    fetchNewData();
    console.log("timer在吗");
  }, [xData, y1Data, y2Data]);
  return (
    // <div>
    //   <div ref={domRef} style={style}></div>
    // </div>
    <ReactECharts option={option} style={style} />
  );
}

export default Bar;
