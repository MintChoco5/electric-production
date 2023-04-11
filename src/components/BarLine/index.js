// 总错误
// 封装图表bar组件
import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";

function BarLine({ title, xData, ycData, ydData, ysData, yokData, style }) {
  // const domRef = useRef();
  // const chartInit = () => {
  //   // 基于准备好的dom，初始化echarts实例
  //   const myChart = echarts.init(domRef.current);
  //   // 绘制图表
  //   myChart.setOption({
  //     title: {
  //       text: title,
  //     },
  //     tooltip: {
  //       trigger: "axis",
  //       axisPointer: {
  //         type: "cross",
  //         label: {
  //           backgroundColor: "#6a7985",
  //         },
  //       },
  //     },
  //     legend: {
  //       data: ["着装错误", "仪器错误", "步骤错误", "正确完成"],
  //     },
  //     toolbox: {
  //       feature: {
  //         saveAsImage: {},
  //       },
  //     },
  //     grid: {
  //       left: "3%",
  //       right: "4%",
  //       bottom: "3%",
  //       containLabel: true,
  //     },
  //     xAxis: [
  //       {
  //         type: "category",
  //         boundaryGap: false,
  //         data: xData,
  //       },
  //     ],
  //     yAxis: [
  //       {
  //         type: "value",
  //       },
  //     ],
  //     series: [
  //       {
  //         name: "着装错误",
  //         type: "line",
  //         stack: "Total",
  //         areaStyle: {},
  //         emphasis: {
  //           focus: "series",
  //         },
  //         data: ycData,
  //       },
  //       {
  //         name: "仪器错误",
  //         type: "line",
  //         stack: "Total",
  //         areaStyle: {},
  //         emphasis: {
  //           focus: "series",
  //         },
  //         data: ydData,
  //       },
  //       {
  //         name: "步骤错误",
  //         type: "line",
  //         stack: "Total",
  //         areaStyle: {},
  //         emphasis: {
  //           focus: "series",
  //         },
  //         data: ysData,
  //       },
  //       {
  //         name: "正确完成",
  //         type: "line",
  //         stack: "Total",
  //         areaStyle: {},
  //         emphasis: {
  //           focus: "series",
  //         },
  //         data: yokData,
  //       },
  //     ],
  //   });
  // };
  // useEffect(() => {
  //   chartInit();
  // }, []);
  const DEFAULT_OPTION = {
    title: {
      text: title,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {
      data: ["着装错误", "仪器错误", "步骤错误", "正确完成"],
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: xData,
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "着装错误",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: ycData,
        itemStyle: {
          //柱状颜色和圆角
          color: "#EE9595",
        },
      },
      {
        name: "仪器错误",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: ydData,
        itemStyle: {
          //柱状颜色和圆角
          color: "#E0C097",
        },
      },
      {
        name: "步骤错误",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: ysData,
        itemStyle: {
          //柱状颜色和圆角
          color: "#FF7878",
        },
      },
      {
        name: "正确完成",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: yokData,
        itemStyle: {
          //柱状颜色和圆角
          color: "#CEE5D0",
        },
      },
    ],
  };
  const [option, setOption] = useState(DEFAULT_OPTION);
  function fetchNewData() {
    const newOption = {
      title: {
        text: title,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
      legend: {
        data: ["着装错误", "仪器错误", "步骤错误", "正确完成"],
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: xData,
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "着装错误",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: ycData,
        },
        {
          name: "仪器错误",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: ydData,
        },
        {
          name: "步骤错误",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: ysData,
        },
        {
          name: "正确完成",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: yokData,
        },
      ],
    };
    setOption(newOption);
    console.log("newoption", newOption);
  }
  useEffect(() => {
    fetchNewData();
  }, [xData, ycData, ydData, ysData, yokData]);
  return (
    // <div>
    //   <div ref={domRef} style={style}></div>
    // </div>
    <ReactECharts option={option} style={style} />
  );
}

export default BarLine;
