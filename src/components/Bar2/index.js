// 衣装错误
// 封装图表bar组件
import ReactECharts from "echarts-for-react";
import { useEffect, useRef, useState } from "react";

function Bar2({xDate, y1Data,yhData,ycData,ygData,y2Data, style}) {
  // const domRef = useRef();
  // const chartInit = () => {
  //   // 基于准备好的dom，初始化echarts实例
  //   const myChart = echarts.init(domRef.current);
  //   // 绘制图表
  //   myChart.setOption({
  //     tooltip: {
  //       trigger: 'axis',
  //       axisPointer: {
  //         type: 'shadow'
  //       }
  //     },
  //     legend: {},
  //     grid: {
  //       left: '3%',
  //       right: '4%',
  //       bottom: '3%',
  //       containLabel: true
  //     },
  //     xAxis: [
  //       {
  //         type: 'category',
  //         data: xDate
  //       }
  //     ],
  //     yAxis: [
  //       {
  //         type: 'value'
  //       }
  //     ],
  //     series: [
  //       {
  //         name: '分配到的操作票总数',
  //         type: 'bar',
  //         emphasis: {
  //           focus: 'series'
  //         },
  //         data: y1Data
  //       },
  //       {
  //         name: '安全帽错误',
  //         type: 'bar',
  //         stack: 'Ad',
  //         emphasis: {
  //           focus: 'series'
  //         },
  //         data: yhData
  //       },
  //       {
  //         name: '工作服错误',
  //         type: 'bar',
  //         stack: 'Ad',
  //         emphasis: {
  //           focus: 'series'
  //         },
  //         data: ycData
  //       },
  //       {
  //         name: '绝缘手套错误',
  //         type: 'bar',
  //         stack: 'Ad',
  //         emphasis: {
  //           focus: 'series'
  //         },
  //         data: ygData
  //       },
  //       {
  //         name: '着装错误总次数',
  //         type: 'bar',
  //         barWidth: 5,
  //         stack: 'Search Engine',
  //         emphasis: {
  //           focus: 'series'
  //         },
  //         data: y2Data
  //       },
  //     ]
  //   });
  // };
  // useEffect(() => {
  //   chartInit();
  // }, []);
  const DEFAULT_OPTION = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: xDate
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '分配到的操作票总数',
          type: 'bar',
          emphasis: {
            focus: 'series'
          },
          data: y1Data
        },
        {
          name: '安全帽错误',
          type: 'bar',
          stack: 'Ad',
          emphasis: {
            focus: 'series'
          },
          data: yhData
        },
        {
          name: '工作服错误',
          type: 'bar',
          stack: 'Ad',
          emphasis: {
            focus: 'series'
          },
          data: ycData
        },
        {
          name: '绝缘手套错误',
          type: 'bar',
          stack: 'Ad',
          emphasis: {
            focus: 'series'
          },
          data: ygData
        },
        {
          name: '着装错误总次数',
          type: 'bar',
          barWidth: 5,
          stack: 'Search Engine',
          emphasis: {
            focus: 'series'
          },
          data: y2Data
        },
      ]
    };
  const [option, setOption] = useState(DEFAULT_OPTION);
  function fetchNewData() {
    const newOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: xDate
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '分配到的操作票总数',
          type: 'bar',
          emphasis: {
            focus: 'series'
          },
          data: y1Data,
          itemStyle: {
            //柱状颜色和圆角
            color: "#74C7B8",
            barBorderRadius: [5, 5, 0, 0], // （顺时针左上，右上，右下，左下）
          },
        },
        {
          name: '安全帽错误',
          type: 'bar',
          stack: 'Ad',
          emphasis: {
            focus: 'series'
          },
          data: yhData,
          itemStyle: {
            //柱状颜色和圆角
            color: "#EF4F4F",
            // barBorderRadius: [5, 5, 0, 0], // （顺时针左上，右上，右下，左下）
          },
        },
        {
          name: '工作服错误',
          type: 'bar',
          stack: 'Ad',
          emphasis: {
            focus: 'series'
          },
          data: ycData,
          itemStyle: {
            //柱状颜色和圆角
            color: "#EE9595",
            // barBorderRadius: [5, 5, 0, 0], // （顺时针左上，右上，右下，左下）
          },
        },
        {
          name: '绝缘手套错误',
          type: 'bar',
          stack: 'Ad',
          emphasis: {
            focus: 'series'
          },
          data: ygData,
          itemStyle: {
            //柱状颜色和圆角
            color: "#FFCDA3",
            barBorderRadius: [5, 5, 0, 0], // （顺时针左上，右上，右下，左下）
          },
        },
        {
          name: '着装错误总次数',
          type: 'bar',
          barWidth: 5,
          stack: 'Search Engine',
          emphasis: {
            focus: 'series'
          },
          data: y2Data,
          itemStyle: {
            //柱状颜色和圆角
            color: "#D72323",
            barBorderRadius: [5, 5, 0, 0], // （顺时针左上，右上，右下，左下）
          },
        },
      ]
    };
    setOption(newOption);
    console.log("newoption", newOption);
  }
  useEffect(() => {
    fetchNewData();
  }, [xDate, y1Data,yhData,ycData,ygData,y2Data]);
  return (
    // <div>
    //   <div ref={domRef} style={style}></div>
    // </div>
    <ReactECharts option={option} style={style} />
  );
}

export default Bar2;
