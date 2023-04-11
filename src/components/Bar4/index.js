// 仪表错误（还没用）
// 封装图表bar组件
// import * as echarts from "echarts";
import ReactECharts from "echarts-for-react";
import { useEffect, useRef,useState } from "react";

function Bar4({title, xData, y1Data, y2Data,y3Data,ycData, style}) {
  // const domRef = useRef();
  // const chartInit = () => {
  //   // 基于准备好的dom，初始化echarts实例
  //   const myChart = echarts.init(domRef.current);
  //   // 绘制图表
  //   myChart.setOption({
  //       tooltip: {
  //         trigger: 'axis',
  //         axisPointer: {
  //           // Use axis to trigger tooltip
  //           type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
  //         }
  //       },
  //       legend: {},
  //       grid: {
  //         left: '3%',
  //         right: '4%',
  //         bottom: '3%',
  //         containLabel: true
  //       },
  //       xAxis: {
  //         type: 'value'
  //       },
  //       yAxis: {
  //         type: 'category',
  //         data: xData
  //       },
  //       series: [
  //         {
  //           name: '步骤1错误数',
  //           type: 'bar',
  //           stack: 'total',
  //           label: {
  //             show: true
  //           },
  //           emphasis: {
  //             focus: 'series'
  //           },
  //           data: y1Data
  //         },
  //         {
  //           name: '步骤2错误数',
  //           type: 'bar',
  //           stack: 'total',
  //           label: {
  //             show: true
  //           },
  //           emphasis: {
  //             focus: 'series'
  //           },
  //           data: y2Data
  //         },
  //         {
  //           name: '步骤3错误数',
  //           type: 'bar',
  //           stack: 'total',
  //           label: {
  //             show: true
  //           },
  //           emphasis: {
  //             focus: 'series'
  //           },
  //           data: y3Data
  //         },
  //         {
  //           name: '操作正确数',
  //           type: 'bar',
  //           stack: 'total',
  //           label: {
  //             show: true
  //           },
  //           emphasis: {
  //             focus: 'series'
  //           },
  //           data: ycData
  //         },
  //       ]
  //     });
  // };
  // useEffect(() => {
  //   chartInit();
  // }, []);
  const DEFAULT_OPTION = {
    title: {
      text: title,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // Use axis to trigger tooltip
        type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
      },
      formatter: (params) => {
        if (!params.length) return ''
        let s = params[0].axisValueLabel + '<br/>'
        for (const iterator of params) {
         // 如果是负数则反转
          let d = iterator.data < 0 ? -iterator.data : iterator.data
          s += iterator.marker + iterator.seriesName + '：' + d  + '<br/>'
        }
        return s
      }
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        formatter: (value) => {
       // 负数取反 显示的就是正数了
          if (value < 0) return -value
         else return value
        }
     }
    },
    yAxis: {
      type: 'category',
      data: xData
    },
    series: [
      {
        name: '步骤1错误数',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: y1Data,
        itemStyle: {
          //柱状颜色和圆角
          color: "#FAAB78",
          // barBorderRadius: [5, 5, 0, 0], // （顺时针左上，右上，右下，左下）
        },
      },
      {
        name: '步骤2错误数',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: y2Data,
        itemStyle: {
          //柱状颜色和圆角
          color: "#FFD495",
          // barBorderRadius: [5, 5, 0, 0], // （顺时针左上，右上，右下，左下）
        },
      },
      {
        name: '步骤3错误数',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: y3Data,
        itemStyle: {
          //柱状颜色和圆角
          color: "#FFFBAC",
          barBorderRadius: [0, 5, 5, 0], // （顺时针左上，右上，右下，左下）
        },
      },
      {
        name: '分配到的操作票总数',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
          formatter: (value) => {
            // 值都是负数的 所以需要取反一下
            return -value.data;
         }
        },
        emphasis: {
          focus: 'series'
        },
        data: ycData,
        itemStyle: {
          //柱状颜色和圆角
          color: "#D7E9B9",
          barBorderRadius: [5, 0, 0, 5], // （顺时针左上，右上，右下，左下）
        },
      },
    ]
  };
  const [option, setOption] = useState(DEFAULT_OPTION);
  function fetchNewData() {
    console.log("xdata", xData);
    console.log("y1data", y1Data);
    console.log("y2data", y2Data);
    const newOption = {
      title: {
        text: title,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // Use axis to trigger tooltip
          type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
        },
        formatter: (params) => {
          if (!params.length) return ''
          let s = params[0].axisValueLabel + '<br/>'
          for (const iterator of params) {
           // 如果是负数则反转
            let d = iterator.data < 0 ? -iterator.data : iterator.data
            s += iterator.marker + iterator.seriesName + '：' + d  + '<br/>'
          }
          return s
        }
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        axisLabel: {
          formatter: (value) => {
         // 负数取反 显示的就是正数了
            if (value < 0) return -value
           else return value
          }
       }
      },
      yAxis: {
        type: 'category',
        data: xData
      },
      series: [
        {
          name: '步骤1错误数',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: y1Data
        },
        {
          name: '步骤2错误数',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: y2Data
        },
        {
          name: '步骤3错误数',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: y3Data
        },
        {
          name: '分配到的操作票总数',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
            formatter: (value) => {
              // 值都是负数的 所以需要取反一下
              return -value.data;
           }
          },
          emphasis: {
            focus: 'series'
          },
          data: ycData
        },
      ]
    };
    setOption(newOption);
    console.log("newoption", newOption);
  }
  useEffect(() => {
    fetchNewData();
  }, [xData, y1Data, y2Data,y3Data,ycData]);
  return (
    // <div>
    //   <div ref={domRef} style={style}></div>
    // </div>
    <ReactECharts option={option} style={style} />
  );
}

export default Bar4;
