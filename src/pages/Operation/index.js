import { Link } from "react-router-dom";
import VideoJS from "@/components/VideoJS";
import videojs from "video.js";
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
  Input,
  InputNumber,
  Space,
  Tag,
  Table,
  Modal,
  Row,
  Col,
  Tooltip,
  Popconfirm,
  Steps,
  Divider,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
// import "moment/locale/zh-cn";
import "dayjs/locale/zh-cn";
import locale from "antd/es/date-picker/locale/zh_CN";
import img404 from "@/assets/error.png";
import "./index.scss";
import React, { useEffect, useState, useRef, useContext } from "react";
import { http } from "@/utils";
import { useStore } from "@/store";
import { Context } from "../Home/index";

const { Option } = Select;
const { RangePicker } = DatePicker;

// 新增实现
// reset form fields when modal is form, closed
// const useResetFormOnCloseModal = ({ form, open }) => {
//   const prevOpenRef = useRef();
//   useEffect(() => {
//     prevOpenRef.current = open;
//   }, [open]);
//   const prevOpen = prevOpenRef.current;
//   useEffect(() => {
//     if (!open && prevOpen) {
//       form.resetFields();
//     }
//   }, [form, prevOpen, open]);
// };

const Operation = () => {
  const playerRef = React.useRef(null);
  const [videoAdd, setVideoAddress] = useState("1");
  const videoJsOptions = {
    // 自动播放：为true时，加载完毕自动播放
    autoplay: true,
    // 播放器子控件是否显示：为true时显示暂停、播放速率等按钮
    controls: true,
    // 响应性：为true时，播放视频进度条会自动移动
    responsive: true,
    // 流式布局：为true时尽可能大得填满父标签的剩余空间
    fluid: true,
    flash: {
      swf: "/video-js.swf",
    },
    // 视频源
    sources: [
      {
        // 视频文件的路径，可以是一个前端相对路径、后台视频文件URL、直播源等
        //src: "../assets/video.mp4",
        // 本来是require("../../../src/assets/video.mp4")
        src: require("../../../src/assets/mp4/" + videoAdd + ".mp4"),
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

  // 获取工作内容列表
  const [contents, setContents] = useState([]);
  useEffect(() => {
    async function fetchContents() {
      const res = await http.get("/contents");
      setContents(res.data);
    }
    fetchContents();
  }, []);
  // 获取操作人列表
  const [workers, setWorkers] = useState([]);
  useEffect(() => {
    const fetchWorkers = async () => {
      const res = await http.get("/ticket/worker");
      const results = res.data;
      // console.log(res);
      // console.log("res.data", res.data);
      let arrnew = [];
      for (const key in results) {
        arrnew.push(Object.assign({ id: key, name: results[key] }));
      }
      setWorkers(arrnew);
      console.log("workers:", workers);
    };
    fetchWorkers();
  }, []);
  // 获取监督人列表
  const [supervisors, setSupervisors] = useState([]);
  useEffect(() => {
    async function fetchSupervisors() {
      const res = await http.get("/ticket/supervisor");
      const results = res.data;
      let arrnew = [];
      for (const key in results) {
        arrnew.push(Object.assign({ id: key, name: results[key] }));
      }
      setSupervisors(arrnew);
      console.log("supervisors", supervisors);
    }
    fetchSupervisors();
  }, []);
  // 获取操作柜列表
  const [cabinets, setCabinets] = useState([]);
  useEffect(() => {
    async function fetchCabinets() {
      const res = await http.get("/ticket/cabinet");
      const results = res.data;
      // let arrnew = []
      // for (const key in results){
      //   arrnew.push(Object.assign(results[key]))
      // }
      let arrnew = Array.from(results);
      setCabinets(arrnew);
      console.log("cabinets:", cabinets);
    }
    fetchCabinets();
  }, []);
  // 操作票列表管理 统一管理数据 将来修改给setList传对象
  const [tickets, setTickets] = useState({
    list: [], // 操作票列表
    count: 0, //操作票数量
  });
  // 操作票参数管理 查询 分页
  const [params, setParams] = useState({
    current_page: 0,
    per_page: 10,
  });
  useEffect(() => {
    async function loadList() {
      if (!(Array.prototype.isPrototypeOf(cabinets) && cabinets.length === 0)) {
        let res = await http.get("/ticket/select", { params });
        //const total_count = await http.get("/ticket/amount");
        const total_count = res.count;
        // res = JSON.stringify(res)
        console.log(res, total_count);
        // const { results } = res.ticket_list;
        // const results = res.data.ticket_list;
        const results = res.data.List;
        results.forEach((item, index) => {
          // console.log("换名字",cabinets.find(item2=>item2.id === item.cabinet_id))
          let cabinet_obj = cabinets.find(
            (item2) => item2.id === item.cabinet_id
          );
          Object.assign(item, { cabinet_name: cabinet_obj.cabinetName });
        });
        setTickets({
          list: results,
          count: res.data.count,
        });
      }
    }
    loadList();
  }, [params, cabinets]);

  /* 表单筛选功能实现 */
  const onFinish = (values) => {
    const {
      task_name,
      worker_id,
      work_content,
      cabinet_id,
      supervisor_name,
      // work_period,
      create_time,
      complete_time,
      complete_status,
    } = values;
    console.log("values", values);
    // 数据处理
    const _params = {};
    // 格式化status
    if (complete_status !== -1) {
      _params.complete_status = complete_status;
    } else {
      _params.complete_status = null;
    }
    // 初始化工作名称
    if (task_name) {
      _params.task_name = task_name;
    } else {
      _params.task_name = null;
    }
    // 初始化操作人员
    if (worker_id) {
      _params.worker_id = parseInt(worker_id);
    } else {
      _params.worker_id = null;
    }
    // 初始化监督人员
    if (supervisor_name) {
      _params.supervisor_name = supervisor_name;
    } else {
      _params.supervisor_name = null;
    }
    // 初始化工作内容
    if (work_content) {
      _params.work_content = work_content;
    } else {
      _params.work_content = null;
    }
    // 初始化操作设备
    if (cabinet_id) {
      _params.cabinet_id = cabinet_id;
    } else {
      _params.cabinet_id = null;
    }
    // 初始化时间
    // if (work_period) {
    //   _params.create_time = work_period[0].format("YYYY-MM-DD HH:mm:ss");
    //   _params.complete_time = work_period[1].format("YYYY-MM-DD HH:mm:ss");
    // }
    if (create_time) {
      _params.create_time = create_time.format("YYYY-MM-DD");
    } else {
      _params.create_time = null;
    }
    if (complete_time) {
      _params.complete_time = complete_time.format("YYYY-MM-DD");
      console.log("在if里");
    } else {
      _params.complete_time = null;
      console.log("在else里");
    }
    // 修改params数据 引起接口的重新发送 对象的合并是一个整体覆盖 改了对象的整体引用
    setParams({
      ...params,
      ..._params,
    });
    console.log(params);
  };
  const formRef = React.useRef(null);
  // 重置功能实现
  const onReset = () => {
    formRef.current?.resetFields();
  };
  // 新增实现
  const [open, setOpen] = useState(false);
  // const showUserModal = () => {
  //   setOpen(true);
  // };
  // const hideUserModal = () => {
  //   setOpen(false);
  // };
  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setOpen(false);
  };
  // 翻页实现
  const pageChange = (page) => {
    setParams({
      ...params,
      current_page: page - 1,
    });
  };
  // 删除操作票 删除单张操作票
  const delTicket = async (data) => {
    console.log(data);
    // await http.delete(`/ticket/${data.id}`);
    await http.get(`/ticket/delete/${data.id}`);
    // 刷新一下列表
    setParams({
      ...params,
      page: 1,
    });
  };
  // Modal 对话框
  const [details, setDetails] = useState([
    {
      adminId: 1,
      adminName: "leo",
      completeStatus: "进行中",
      createTime: "2023-01-03 10:22:30",
      id: 1,
      supervisorName: "赵六",
      taskName: "10kV× ×线***开关由运行转检修",
      workerId: 3,
      workerName: "Josh",
    },
  ]);
  const [id4step, setId4step] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = async (data) => {
    setIsModalOpen(true);
    console.log("在modal里：", data.id);
    console.log("tickets.list length", tickets.list.length);
    for (let i = 0; i <= tickets.list.length; i++) {
      // console.log(tickets.list[i]);
      if (tickets.list[i].id === data.id) {
        const result = tickets.list[i];
        let cabinet_obj = cabinets.find(
          (item2) => item2.id === result.cabinet_id
        );
        Object.assign(result, { cabinet_name: cabinet_obj.cabinetName });
        // setDetails(tickets.list[i]);
        setDetails(result);
        console.log(tickets.list[i]);
        setId4step(data.id);
      }
    }
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // 查看详情 查看操作票详情
  const seeDetails = async (data) => {
    console.log(data);
  };
  // const tagDescription = [
  //   "进行中",
  //   "计划中",
  //   "正确完成",
  //   "错误",
  //   "已过期",
  //   "正确完成、超时",
  //   "失去连接、检测无效",
  // ];
  const tagColor = [
    {
      进行中: "green",
      计划中: "lime",
      正确完成: "cyan",
      错误: "red",
      已过期: "volcano",
      "正确完成、超时": "blue",
      "失去连接、检测无效": "magenta",
    },
  ];
  // 列表头
  const columns = [
    {
      title: "工作名称",
      dataIndex: "task_name",
      width: 220,
    },
    {
      title: "工作状态",
      dataIndex: "complete_status",
      render: (data) => {
        const isLongTag = data.length > 4;
        return (
          <Tooltip title={data}>
            <Tag color={tagColor[0][data]}>
              {isLongTag ? `${data.slice(0, 4)}...` : data}
            </Tag>
          </Tooltip>
        );
      },
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
      width: 100,
    },
    {
      title: "结束时间",
      dataIndex: "complete_time",
      width: 100,
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
    {
      title: "操作",
      render: (data) => {
        return (
          <Space size="middle">
            <Tooltip title="播放视频">
              <Button
                type="primary"
                shape="circle"
                icon={<PlayCircleOutlined />}
                onClick={() => showModal2(data)}
              />
            </Tooltip>
            <Tooltip title="查看详情">
              <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                onClick={() => showModal(data)}
              />
            </Tooltip>
            <Popconfirm
              title="确认删除该条文章吗?"
              onConfirm={() => delTicket(data)}
              okText="确认"
              cancelText="取消"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  //操作票假数据
  const ticketData = [
    {
      adminId: 2,
      adminName: "stillopen",
      completeStatus: "未完成",
      createTime: "2023-01-02 10:23:27",
      id: 2,
      supervisorName: "王武",
      taskName: "工作",
      workerId: 4,
      workerName: "张三",
    },
  ];
  const onOk = (value) => {
    console.log("onOk: ", value);
  };
  const [selectedKey, setSelectedKey] = useState(-1);
  // async function changeWid(workerId){
  //   await selectedStore.getClothingInfo({selectedKey});
  // }

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
      // selectedStore.getClothingInfo(record.id);
      //selectedKey = record.id;
      setSelectedKey(record.id);
      // setKey(record.id);
      //console.log("onSelect里的key:", selectedKey);
      // changeWid(record.id);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  // 假数据2
  const data4algorithm = [
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
  // useEffect(() => {
  //   // channlStore.setChannelList()
  //   //console.log("useEffect里的key:", selectedKey);
  //   selectedStore.getClothingInfo({selectedKey});
  //   console.log("有在用吗", selectedKey)
  // }, [selectedKey])
  // 获取操作步骤列表
  const [steps, setSteps] = useState([]);
  // 获取开关列表
  const [switchs, setSwitchs] = useState([]);
  useEffect(() => {
    async function fetchSwitchs() {
      const res = await http.get("/ticket/switch");
      const results = res.data;
      let arrnew = Array.from(results);
      setSwitchs(arrnew);
    }
    fetchSwitchs();
  }, []);
  useEffect(() => {
    async function fetchSteps() {
      const res = await http.get("/ticket/steps/" + id4step.toString());
      const results = res.data;
      //更换id和cabinet_id和cabinets
      results.forEach((item, index) => {
        let switch_obj = switchs.find((item2) => item2.id === item.switch_id);
        Object.assign(item, { switch_name: switch_obj.switchName });
      });
      setSteps(results);
    }
    fetchSteps();
  }, [details]);
  const description = "This is a description.";
  const columns2 = [
    {
      title: "序号",
      dataIndex: "step_order",
      // width: 220,
    },
    {
      title: "描述",
      dataIndex: "description",
      // render: (data) =>{
      //   return(
      //   <Tag color={tagColor[data]}>{tagDescription[data]}</Tag>)
      // }
    },
    { title: "仪表名称", dataIndex: "switch_name" },
    {
      title: "仪表结束状态",
      dataIndex: "switch_status",
    },
    {
      title: "完成状态",
      dataIndex: "complete_status",
    },
  ];
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const showModal2 = (data) => {
    const player = playerRef.current;
    setIsModalOpen2(true);
    setVideoAddress(data.id.toString());
  };
  const handleOk2 = () => {
    setIsModalOpen2(false);
    const player = playerRef.current;
    // player.src = require("../../../src/assets/mp4/"+videoAdd+".mp4");
  };
  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };
  return (
    <div>
      <Modal
        title="查看视频"
        open={isModalOpen2}
        onOk={handleOk2}
        onCancel={handleCancel2}
        width={850}
        okText="确认"
        cancelText="取消"
      >
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      </Modal>
      <Modal
        title="操作票详情"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {/* <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p> */}
        <p>工作名称：{details.task_name}</p>
        {/* 以下未修改 */}
        <p>操作人名称：{details.worker_name}</p>
        <p>监督人名称：{details.supervisor_name}</p>
        <p>开始时间：{details.create_time}</p>
        <p>结束时间：{details.complete_time}</p>
        <p>操作柜名称：{details.cabinet_name}</p>
        {/* <Steps
          direction="vertical"
          size="small"
          status="error"
          current={1}
          items={[
            {
              title: "Finished",
              description,
            },
            {
              title: "In Progress",
              description,
            },
            {
              title: "Waiting",
              description,
            },
          ]}
        /> */}
        步骤：
        <Table columns={columns2} dataSource={steps} size="small" />
      </Modal>
      {/* 查询重置区域 */}
      {/* <Breadcrumb separator=">">
          <Breadcrumb.Item>业务中心</Breadcrumb.Item>
          <Breadcrumb.Item>查看全部操作票</Breadcrumb.Item>
        </Breadcrumb> */}
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>业务中心</Breadcrumb.Item>
            <Breadcrumb.Item>查看全部操作票</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form.Provider
          onFormFinish={(name, { values, forms }) => {
            if (name === "addForm") {
              const { basicForm } = forms;
              const users = basicForm.getFieldValue("users") || [];
              basicForm.setFieldsValue({
                users: [...users, values],
              });
              setOpen(false);
            }
          }}
        >
          <Form
            onFinish={onFinish}
            initialValues={{ complete_status: -1 }}
            ref={formRef}
          >
            <Form.Item label="状态" name="complete_status">
              <Radio.Group>
                <Radio value={-1}>全部</Radio>
                <Radio value="进行中">进行中</Radio>
                <Radio value="计划中">计划中</Radio>
                <Radio value="正确完成">正确完成</Radio>
                <Radio value="错误">错误</Radio>
                <Radio value="已过期">已过期</Radio>
                <Radio value="正确完成、超时">正确完成、超时</Radio>
                <Radio value="失去连接、检测无效">失去连接、检测无效</Radio>
              </Radio.Group>
            </Form.Item>

            <Row>
              <Col span={7}>
                <Form.Item label="工作名称" name="task_name">
                  <Input
                    placeholder="请输入工作名称"
                    style={{ width: 200 }}
                  ></Input>
                </Form.Item>
              </Col>

              <Col span={7}>
                <Form.Item label="工作操作人" name="worker_id">
                  <Select
                    placeholder="请选择工作操作人"
                    style={{ width: 200 }}
                    allowClear
                  >
                    {workers.map((worker) => (
                      <Option key={worker.id} value={worker.id}>
                        {worker.name}
                      </Option>
                    ))}
                    {/* <Option key={555} value={"555,王test"}>
                      王test
                    </Option> */}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={7}>
                <Form.Item label="工作内容" name="work_content">
                  <Select
                    placeholder="请选择工作内容"
                    style={{ width: 200 }}
                    allowClear
                  >
                    <Option value="运行转检修">运行转检修</Option>
                    <Option value="检修转运行">检修转运行</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={7}>
                <Form.Item label="操作设备" name="cabinet_id">
                  <Select
                    placeholder="请选择操作设备"
                    style={{ width: 200 }}
                    allowClear
                  >
                    {cabinets.map((cabinet) => (
                      <Option key={cabinet.id} value={cabinet.id}>
                        {cabinet.cabinetName}
                      </Option>
                    ))}
                    {/* <Option value="221柜">221柜</Option>
                    <Option value="222柜">222柜</Option> */}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={7}>
                <Form.Item label="工作监督人" name="supervisor_name">
                  <Select
                    placeholder="请选择工作监督人"
                    style={{ width: 200 }}
                    allowClear
                  >
                    {supervisors.map((supervisor) => (
                      <Option key={supervisor.id} value={supervisor.name}>
                        {supervisor.name}
                      </Option>
                    ))}
                    {/* <Option key={555} value={"555,赵test"}>
                      赵test
                    </Option> */}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={5}>
                <Form.Item label="开始时间" name="create_time">
                  {/* <Space direction="vertical" size={12}> */}
                  <DatePicker
                    locale={locale}
                    onOk={onOk}
                    style={{ width: 130 }}
                  />
                  {/* </Space> */}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label="结束时间" name="complete_time">
                  {/* <Space direction="vertical" size={12}> */}
                  <DatePicker
                    locale={locale}
                    onOk={onOk}
                    style={{ width: 130 }}
                  />
                  {/* </Space> */}
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginLeft: 70 }}
                  >
                    查询
                  </Button>
                  <Button
                    type="primary"
                    htmlType="button"
                    onClick={onReset}
                    style={{ marginLeft: 70 }}
                  >
                    重置
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginLeft: 80 }}
                  >
                    删除
                  </Button>
                </Form.Item>
              </Col>

              {/* <Col span={12}> */}
              {/* <Form.Item> */}
              {/* <Button
                      htmlType="button"
                      // style={{
                      //   margin: "0 8px",
                      // }}
                      style={{ marginLeft: 80 }}
                      onClick={() => {
                        setOpen(true);
                      }}
                    >
                      新增
                    </Button> */}

              {/* <Button
                      type="primary"
                      htmlType="submit"
                      style={{ marginLeft: 80 }}
                    >
                      删除
                    </Button> */}
              {/* </Form.Item> */}
              {/* </Col> */}
            </Row>
          </Form>
          {/* <CollectionCreateForm
              open={open}
              onCreate={onCreate}
              onCancel={() => {
                setOpen(false);
              }}
            /> */}
        </Form.Provider>
      </Card>
      {/* 操作票列表区域 */}
      <Card title={`根据筛选条件共查询到 ${tickets.count} 条结果：`}>
        <Table
          rowKey="ticket_id"
          columns={columns}
          dataSource={tickets.list}
          pagination={{
            pageSize: 5,
            total: tickets.count,
            onChange: pageChange,
          }}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          size="middle"
        />
      </Card>
    </div>
  );
};

export default Operation;
