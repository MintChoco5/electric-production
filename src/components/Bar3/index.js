// 总数据统计
// 封装图表bar组件
import * as echarts from "echarts";
import { useEffect, useRef } from "react";

function Bar2({xDate, y1Data,yhData,ycData,ygData,y2Data, style}) {
  const domRef = useRef();
  const chartInit = () => {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(domRef.current);
    // 绘制图表
    myChart.setOption({
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
          name: '着装错误',
          type: 'bar',
          stack: 'Ad',
          emphasis: {
            focus: 'series'
          },
          data: yhData
        },
        {
          name: '仪器错误',
          type: 'bar',
          stack: 'Ad',
          emphasis: {
            focus: 'series'
          },
          data: ycData
        },
        {
          name: '步骤错误',
          type: 'bar',
          stack: 'Ad',
          emphasis: {
            focus: 'series'
          },
          data: ygData
        },
        // {
        //   name: 'Search Engine',
        //   type: 'bar',
        //   data: [862, 1018, 964, 1026, 1679, 1600, 1570],
        //   emphasis: {
        //     focus: 'series'
        //   },
        //   markLine: {
        //     lineStyle: {
        //       type: 'dashed'
        //     },
        //     data: [[{ type: 'min' }, { type: 'max' }]]
        //   }
        // },
        {
          name: '错误总次数',
          type: 'bar',
          barWidth: 5,
          stack: 'Search Engine',
          emphasis: {
            focus: 'series'
          },
          data: y2Data
        },
        // {
        //   name: 'Google',
        //   type: 'bar',
        //   stack: 'Search Engine',
        //   emphasis: {
        //     focus: 'series'
        //   },
        //   data: [120, 132, 101, 134, 290, 230, 220]
        // },
        // {
        //   name: 'Bing',
        //   type: 'bar',
        //   stack: 'Search Engine',
        //   emphasis: {
        //     focus: 'series'
        //   },
        //   data: [60, 72, 71, 74, 190, 130, 110]
        // },
        // {
        //   name: 'Others',
        //   type: 'bar',
        //   stack: 'Search Engine',
        //   emphasis: {
        //     focus: 'series'
        //   },
        //   data: [62, 82, 91, 84, 109, 110, 120]
        // }
      ]
    });
  };
  useEffect(() => {
    chartInit();
  }, []);
  return (
    <div>
      <div ref={domRef} style={style}></div>
    </div>
  );
}

export default Bar2;
