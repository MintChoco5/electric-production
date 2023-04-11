import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Space,
  Tag,
  Table,
  Modal,
  Tooltip,
  Popconfirm,
  Row,
  Col,
  Radio,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { http } from "@/utils";
import Clothing from "../Clothing";
import Device from "../Device";
import Procedure from "../Procedure";
import JSMpegCom from "@/components/JSMpegCom";

let timer = null;
const { Meta } = Card;

const Ongoing = () => {
  // 操作票列表管理 统一管理数据 将来修改给setList传对象
  // const [tickets, setTickets] = useState({
  //   list: [], // 操作票列表
  //   count: 0, //操作票数量
  // });
  // 获取操作柜列表
  const [cabinets, setCabinets] = useState([]);
  useEffect(() => {
    async function fetchCabinets() {
      const res = await http.get("/ticket/cabinet");
      const results = res.data;
      let arrnew = Array.from(results);
      setCabinets(arrnew);
      console.log("cabinets:", arrnew);
    }
    fetchCabinets();
  }, []);
  const [tickets, setTickets] = useState([]);
  // 操作票参数管理 查询 分页
  const [params, setParams] = useState({
    page: 1,
    per_page: 5,
  });
  useEffect(() => {
    async function loadList() {
      // const res = await http.get("/ticket/status/", { params });
      // console.log("res+" + res);
      // const { results, total_count } = res.data;
      // setTickets({
      //   list: results,
      //   count: total_count,
      // });
      if (!(Array.prototype.isPrototypeOf(cabinets) && cabinets.length === 0)) {
        const res = await http.get("/ticket/status/进行中");
        const results = Array.from(res.data);
        console.log("ongoing", res);
        results.forEach((item, index) => {
          console.log(
            "换名字",
            cabinets.find((item2) => item2.id === item.cabinet_id)
          );
          let cabinet_obj = cabinets.find(
            (item2) => item2.id === item.cabinet_id
          );
          Object.assign(item, { cabinet_name: cabinet_obj.cabinetName });
        });
        setTickets(results);
        console.log("tickets", tickets);
      }
    }
    loadList();
  }, [params, cabinets]);
  // 翻页实现
  const pageChange = (page) => {
    setParams({
      ...params,
      page,
    });
  };
  const [currentTicket, setCurrentTicket] = useState(0);
  const [currentRecord, setCurrentRecord] = useState("");
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    onSelect: (record, selected, selectedRows) => {
      console.log("onSelect:", record, selected, selectedRows);
      console.log(record.id);
      if (selected === true) {
        setCurrentTicket(record.id);
        setCurrentRecord(record);
      }
      console.log("currentTicket:", currentTicket);
      //   setSelectedKey(record.id);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  // 删除操作票 删除单张操作票
  const delTicket = async (data) => {
    console.log(data);
    await http.delete(`/ticket/${data.id}`);
    // 刷新一下列表
    setParams({
      ...params,
      page: 1,
    });
  };
  // 列表头
  const columns = [
    {
      title: "工作名称",
      dataIndex: "task_name",
      width: 220,
    },
    {
      title: "操作人",
      dataIndex: "worker_name",
    },
    {
      title: "监督人",
      dataIndex: "supervisor_name",
    },
    {
      title: "开始时间",
      dataIndex: "create_time",
    },
    {
      title: "结束时间",
      dataIndex: "complete_time",
    },
    {
      title: "操作设备",
      // dataIndex: "cabinet_id",
      dataIndex: "cabinet_name",
    },
    // {
    //   title: "工作内容",
    //   dataIndex: "content",
    // },
    // {
    //   title: "操作",
    //   render: (data) => {
    //     return (
    //       <Space size="middle">
    //         <Tooltip title="播放视频">
    //           <Button
    //             type="primary"
    //             shape="circle"
    //             icon={<PlayCircleOutlined />}
    //           />
    //         </Tooltip>
    //         <Tooltip title="查看详情">
    //           <Button type="primary" shape="circle" icon={<EditOutlined />} />
    //         </Tooltip>
    //         <Popconfirm
    //           title="确认删除该条文章吗?"
    //           onConfirm={() => delTicket(data)}
    //           okText="确认"
    //           cancelText="取消"
    //         >
    //           <Button
    //             type="primary"
    //             danger
    //             shape="circle"
    //             icon={<DeleteOutlined />}
    //             //   onClick={() => delTicket(data)}
    //           />
    //         </Popconfirm>
    //       </Space>
    //     );
    //   },
    // },
  ];
  // 获取单张操作票步骤
  const [steps, setSteps] = useState([
    {
      description:
        "将10kV××线***开关的 “远方/就地” 切换开关切换至就地位置，查确己在就地位置",
      id: 37,
      stepOrder: 1,
      switchName: "开关一",
      switchStatus: "就地",
      switchType: "压板",
    },
    {
      description:
        "将10kV××线***开关的 “远方/就地” 切换开关切换至就地位置，查确己在就地位置",
      id: 37,
      stepOrder: 1,
      switchName: "低周减载",
      switchStatus: "无带电",
      switchType: "压板",
    },
    {
      description: "断开 10kV××线***开关。",
      id: 38,
      stepOrder: 2,
    },
  ]);
  useEffect(() => {
    async function fetchSteps() {
      const res = await http.get("/ticket/steps/" + currentTicket.toString());
      const result = res.data;
      setSteps(result);
      console.log("步骤是：", result);
    }
    fetchSteps();
  }, [currentTicket]);
  const [clothingRes, setClothingRes] = useState([]);
  const [deviceRes, setDeviceRes] = useState([]);
  const [stepsRes, setStepsRes] = useState([]);
  // 轮询
  useEffect(() => {
    getStepsData(); //数据查询函数，
    clearTimerFun(); //清空定时器
    setTimerFun(); //创建定时器
  }, [currentTicket]); //监听筛选条件，一旦变化就立即重新查询，并清空已有定时器，创建新的定时器

  useEffect(() => {
    return () => {
      clearTimerFun(); //组件销毁时，清空定时器
    };
  }, []);

  const setTimerFun = () => {
    console.log("创建定时器");
    timer = setInterval(() => {
      getStepsData();
    }, 500);
  };
  const clearTimerFun = () => {
    console.log("清空定时器");
    clearInterval(timer);
  };
  const getStepsData = () => {
    console.log("查询逻辑：");
    //这里自行编写查询逻辑
    // setItems({
    //   list: [{ title: "已完成", description: <div>应操作：开关一:出<br/>实操作：开关一:出</div> },
    //   { title: "已完成", description: <div>应操作：接地保护跳闸:出<br/>实操作：接地保护跳闸:出</div> },
    //   { title: "正在进行", description: <div>应操作：低周减载:出<br/>实操作：</div> },
    //   // { title: "等待中", description: <div>应操作：<br/>实操作：</div> },
    // ],
    //   current: 2,
    // });
    async function fetchResults() {
      console.log("current ticket", currentTicket);
      console.log("/ticket/allstatus?ticketId=" + currentTicket.toString());
      const res = await http.get(
        "/ticket/allstatus?ticketId=" + currentTicket.toString()
      );
      if (res.code === 200) {
        if (res.data.clothing != "暂无服装错误") {
          setClothingRes(res.data.clothing);
        }
        if (res.data.device != "无操作柜选择错误") {
          setDeviceRes(res.data.device);
        }
        if (res.data.steps != "no step error found") {
          setStepsRes(res.data.steps);
        }
      }
      console.log("所有错误", res);
    }
    fetchResults();
  };
  // // 衣装错误
  // useEffect(() => {
  //   async function fetchClothingRes() {
  //     const res = await http.get("/error/uniform/" + currentTicket.toString());
  //     const result = res.data;
  //     setClothingRes(result);
  //     console.log("衣装错误", result);
  //   }
  //   fetchClothingRes();
  // });
  // // 仪器错误
  // useEffect(() => {
  //   async function fetchDeviceRes() {
  //     const res = await http.get("/error/cabinet/" + currentTicket.toString());
  //     const result = res.data;
  //     setDeviceRes(result);
  //     console.log("仪器错误", result);
  //   }
  //   fetchDeviceRes();
  // });
  // // 步骤错误
  // useEffect(() => {
  //   async function fetchStepsRes() {
  //     const res = await http.get(
  //       "/error/operation/" + currentTicket.toString()
  //     );
  //     const result = res.data;
  //     setStepsRes(result);
  //     console.log("步骤错误", result);
  //   }
  //   fetchStepsRes();
  // });
  // 视频流封面
  const [isCover, setIsCover] = useState(false);
  const [value4, setValue4] = useState(0);
  const onChange4 = ({ target: { value } }) => {
    console.log("radio4 checked", value);
    setValue4(value);
  };
  const optionsWithDisabled = [
    {
      label: "远",
      value: 0,
    },
    {
      label: "近",
      value: 1,
    },
  ];
  return (
    <>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>业务中心</Breadcrumb.Item>
            <Breadcrumb.Item>进行中的操作票</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Table
          rowKey="id"
          columns={columns}
          dataSource={tickets}
          // pagination={{
          //   pageSize: params.per_page,
          //   total: tickets.count,
          //   onChange: pageChange,
          // }}
          pagination={{
            // position:['topCenter','none'],
            size: "small",
          }}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          size="middle"
        />
      </Card>
      <Card>
        {/* <Row gutter={16}>
        <Col span={6} xs={24} md={6}>
          <Clothing msg={clothingRes} />
        </Col>
        <Col span={6} xs={24} md={6}>
          <Device msg={deviceRes} />
        </Col>
        <Col span={12} xs={24} md={12}>
          <Procedure msg={stepsRes} should={steps} />
        </Col>
      </Row> */}
        <Row gutter={16}>
          <Col span={10}>
            <Card
              title={
                <div style={{ textAlign: "center" }}>
                  <b>视频流显示</b>
                  {/* <div
                    style={{
                      textAlign: "center",
                      position: "absolute",
                      // bottom: 10,
                      left: 0,
                      right: 0,
                    }}
                  > */}
                  <Radio.Group
                    options={optionsWithDisabled}
                    onChange={onChange4}
                    value={value4}
                    optionType="button"
                    buttonStyle="solid"
                    size="small"
                  />
                  {/* </div> */}
                </div>
              }
              bordered={true}
              style={{ height: 425 }}
              size="small"
            >
              {isCover ? (
                <img src="https://wx2.sinaimg.cn/mw1024/006YrfC3ly1hcandvq9a8j30go0bbq44.jpg"></img>
              ) : (
                <Meta
                  description={<JSMpegCom msg="play" msg2={value4} />}
                  bordered={false}
                />
              )}
              <div style={{ fontSize: "16px" }}>
                工作名称：{currentRecord.task_name}
                <br />
                操作人：{currentRecord.worker_name}
              </div>
            </Card>
          </Col>
          <Col span={6}>
            {/* <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}> */}
            {/* <Card>衣装检测结果</Card> */}
            <Clothing msg={clothingRes} />
            {/* </Row> */}
            {/* <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}> */}
            {/* <Card>仪器检测结果</Card> */}
            <Device msg={deviceRes} />
            {/* </Row> */}
          </Col>
          <Col span={8}>
            {/* <Card>步骤检测结果</Card> */}
            <Procedure msg={stepsRes} should={steps} />
          </Col>
        </Row>
      </Card>
    </>
  );
};
export default Ongoing;
