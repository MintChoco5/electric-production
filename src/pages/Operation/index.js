import { Link } from "react-router-dom";
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
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import "moment/locale/zh-cn";
import locale from "antd/es/date-picker/locale/zh_CN";
import img404 from "@/assets/error.png";
import "./index.scss";
import React, { useEffect, useState, useRef, useContext } from "react";
import { http } from "@/utils";
import { useStore } from "@/store";
import { Context } from "../Home/index";
import { ConfigProvider, theme } from "antd";

const { Option } = Select;
const { RangePicker } = DatePicker;

// 新增实现
// reset form fields when modal is form, closed
const useResetFormOnCloseModal = ({ form, open }) => {
  const prevOpenRef = useRef();
  useEffect(() => {
    prevOpenRef.current = open;
  }, [open]);
  const prevOpen = prevOpenRef.current;
  useEffect(() => {
    if (!open && prevOpen) {
      form.resetFields();
    }
  }, [form, prevOpen, open]);
};
// 修改成新增操作票需要改的信息
// 新增的表单
const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  useResetFormOnCloseModal({
    form,
    open,
  });
  // const onOk = () => {
  //   form.submit();
  // };
  const onChangeTime = () => {};
  const onOkTime = (value) => {
    {
      value.map((val) => {
        console.log("onOkTime:", val.format("YYYY-MM-DD hh:mm:ss"));
      });
    }
  };
  // 获取操作人列表
  const [workers, setWorkers] = useState([]);
  useEffect(() => {
    async function fetchWorkers() {
      const res = await http.get("/ticket/worker");
      //console.log('查看res.data是啥：', res.data);
      setWorkers(res.data);
      //console.log(typeof res.data);
      //console.log('workers是啥：',workers);
    }
    fetchWorkers();
  }, [workers]);
  // 获取监督人列表
  const [supervisors, setSupervisors] = useState([]);
  useEffect(() => {
    async function fetchSupervisors() {
      const res = await http.get("/ticket/supervisor");
      setSupervisors(res.data);
    }
    fetchSupervisors();
  }, [supervisors]);
  // 获取操作柜列表
  const [cabinets, setCabinets] = useState([]);
  useEffect(() => {
    async function fetchCabinets() {
      const res = await http.get("/ticket/cabinet");
      setCabinets(res.data.devices);
    }
    fetchCabinets();
  }, [cabinets]);
  // 获取开关列表
  const [switchs, setSwitchs] = useState([]);
  useEffect(() => {
    async function fetchSwitchs() {
      const res = await http.get("/ticket/switch");
      //console.log("获取开关列表，返回信息：", res.data);
      setSwitchs(res.data);
    }
    fetchSwitchs();
  }, [switchs]);
  return (
    <Modal
      open={open}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((fieldsValue) => {
            form.resetFields();
            console.log("fieldsValue:", fieldsValue);
            const rangeTimeValue = fieldsValue["range-time-picker"];
            console.log("rangeTimeValue:", rangeTimeValue);
            const values = {
              ...fieldsValue,
              "range-time-picker": [
                rangeTimeValue[0].format("YYYY-MM-DD HH:mm:ss"),
                rangeTimeValue[1].format("YYYY-MM-DD HH:mm:ss"),
              ],
              createTime: rangeTimeValue[0].format("YYYY-MM-DD HH:mm:ss"),
              completeTime: rangeTimeValue[1].format("YYYY-MM-DD HH:mm:ss"),
            };
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="taskName"
          label="工作名称"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        {/* 管理员id */}
        <Form.Item
          name="adminId"
          label="管理员id"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber />
          {/* 更換成後端獲取的管理員 */}
          {/* <Select placeholder="Select 管理员名称">
              <Option value="Zhejiang">张三</Option>
              <Option value="Jiangsu">李四</Option>
            </Select> */}
        </Form.Item>
        <Form.Item
          name="adminName"
          label="管理员名称"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
          {/* 更換成後端獲取的管理員 */}
          {/* <Select placeholder="Select 管理员名称">
              <Option value="Zhejiang">张三</Option>
              <Option value="Jiangsu">李四</Option>
            </Select> */}
        </Form.Item>
        <Form.Item
          name="workerName"
          label="操作人名称"
          rules={[
            {
              required: true,
            },
          ]}
        >
          {/* <Input /> */}
          {/* 更換成後端獲取的操作人 */}
          <Select placeholder="Select 操作员名称">
            {/* {workers.map((worker) => {
              <Option key={worker.id} value={worker.id}>
                {worker.name}
              </Option>;
            })} */}
            {/* <Option value="王五">王五</Option> */}
          </Select>
        </Form.Item>
        <Form.Item
          name="supervisorName"
          label="监督人名称"
          rules={[
            {
              required: true,
            },
          ]}
        >
          {/* <Input /> */}
          {/* 更換成后端獲取的监督人 */}
          <Select placeholder="Select 监督人名称">
            {/* {supervisors.map((supervisor) => {
              <Option key={supervisor.id} value={supervisor.id}>
                {supervisor.name}
              </Option>;
            })} */}
            {/* <Option value="赵六">赵六</Option> */}
          </Select>
        </Form.Item>
        {/* <Form.Item
          name="age"
          label="User Age"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber />
        </Form.Item> */}
        <Form.Item label="起止时间" name="range-time-picker">
          {/* <Space direction="vertical" size={12}> */}
          {/* <DatePicker showTime onChange={onChange} onOk={onOk} /> */}
          <RangePicker
            locale={locale}
            showTime
            onChange={onChangeTime}
            onOk={onOkTime}
          />
          {/* </Space> */}
        </Form.Item>
        <Form.Item
          name="cabinetId"
          label="操作柜名称"
          rules={[
            {
              required: true,
            },
          ]}
        >
          {/* 更換成後端獲取的操作人 */}
          <Select placeholder="Select 操作柜名称">
            {/* {workers.map((worker) => {
              <Option key={worker.id} value={worker.id}>
                {worker.name}
              </Option>;
            })} */}
            {/* <Option value="221号柜">221号柜</Option> */}
          </Select>
        </Form.Item>
        {/* 添加步骤 */}
        <Form.List name="steps">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: "flex",
                    marginBottom: 8,
                  }}
                  align="baseline"
                >
                  {/* 輸入步驟名稱 */}
                  <Form.Item
                    {...restField}
                    name={[name, "step"]}
                    rules={[
                      {
                        required: true,
                        message: "Missing name",
                      },
                    ]}
                  >
                    <Input placeholder="步驟名稱" />
                  </Form.Item>
                  {/* 选择开关 */}
                  <Form.Item
                    {...restField}
                    name={[name, "switch"]}
                    rules={[
                      {
                        required: true,
                        message: "Missing switch",
                      },
                    ]}
                  >
                    {/* 更換成從後端獲取的開關 */}
                    <Select placeholder="Select switch">
                      {switchs.map((kaiguan) => {
                        <Option key={kaiguan.id} value={kaiguan.id}>
                          {kaiguan.name}
                        </Option>;
                      })}
                      {/* {supervisors.map((supervisor) => {
              <Option key={supervisor.id} value={supervisor.id}>
                {supervisor.name}
              </Option>;
            })} */}
                      {/* <Option value="Zhejiang">Zhejiang</Option>
                      <Option value="Jiangsu">Jiangsu</Option> */}
                    </Select>
                  </Form.Item>
                  {/* 開關狀態 */}
                  <Form.Item
                    {...restField}
                    name={[name, "status"]}
                    rules={[
                      {
                        required: true,
                        message: "Missing status",
                      },
                    ]}
                  >
                    {/* 更換成從後端獲取的開關 */}
                    <Select placeholder="Select status">
                      <Option value="running">运行</Option>
                      <Option value="overhaul">检修</Option>
                    </Select>
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  添加步驟
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};
const Operation = () => {
  // Context
  const [key, setKey] = useContext(Context);
  // Store
  const { selectedStore } = useStore();
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
    async function fetchWorkers() {
      const res = await http.get("/ticket/worker");
      // console.log("res.data", res.data);
      setWorkers(res.data);
      //console.log('workers:', workers)
    }
    fetchWorkers();
  }, [workers]);
  // 获取监督人列表
  const [supervisors, setSupervisors] = useState([]);
  useEffect(() => {
    async function fetchSupervisors() {
      const res = await http.get("/ticket/supervisor");
      setSupervisors(res.data);
      //console.log('在执行吗？', supervisors)
    }
    fetchSupervisors();
  }, [supervisors]);
  // 获取操作柜列表
  const [cabinets, setCabinets] = useState([]);
  useEffect(() => {
    async function fetchCabinets() {
      const res = await http.get("/ticket/cabinet");
      setCabinets(res.data);
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
    page: 1,
    per_page: 5,
  });
  useEffect(() => {
    async function loadList() {
      const res = await http.get("/mp/articles", { params });
      console.log("res+" + res);
      const { results, total_count } = res.data;
      setTickets({
        list: results,
        count: total_count,
      });
    }
    loadList();
  }, [params]);

  /* 表单筛选功能实现 */
  const onFinish = (values) => {
    const {
      task_name,
      worker_name,
      supervisor_name,
      work_period,
      work_content,
      cabinet_id,
      status,
    } = values;
    // 数据处理
    const _params = {};
    // 格式化status
    if (status !== -1) {
      _params.status = status;
    }
    // 初始化工作名称
    if (task_name) {
      _params.task_name = task_name;
    }
    // 初始化操作人员
    if (worker_name) {
      _params.worker_name = worker_name;
    }
    // 初始化监督人员
    if (supervisor_name) {
      _params.supervisor_name = supervisor_name;
    }
    // 初始化工作内容
    if (work_content) {
      _params.work_content = work_content;
    }
    // 初始化操作设备
    if (cabinet_id) {
      _params.cabinet_id = cabinet_id;
    }
    // 初始化时间
    if (work_period) {
      _params.create_time = work_period[0].format("YYYY-MM-DD HH:mm:ss");
      _params.complete_time = work_period[1].format("YYYY-MM-DD HH:mm:ss");
    }
    // 修改params数据 引起接口的重新发送 对象的合并是一个整体覆盖 改了对象的整体引用
    setParams({
      ...params,
      ..._params,
    });
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
      page,
    });
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
      dataIndex: "title",
      width: 220,
    },
    {
      title: "工作状态",
      dataIndex: "status",
      render: (data) => <Tag color="green">进行中</Tag>,
    },
    {
      title: "工作负责人",
      dataIndex: "person",
    },
    {
      title: "开始时间",
      dataIndex: "startdate",
    },
    {
      title: "结束时间",
      dataIndex: "enddate",
    },
    {
      title: "操作设备",
      dataIndex: "device",
    },
    {
      title: "工作内容",
      dataIndex: "content",
    },
    {
      title: "操作",
      render: (data) => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => delTicket(data)}
            />
          </Space>
        );
      },
    },
  ];
  // 假数据
  const data = [
    {
      id: "8218",
      startdate: "2019-03-11 09:00:00",
      enddate: "2022-01-01 01:00:00",
      person: "张三",
      personid: 123,
      status: 2,
      device: "211柜",
      content: "运行转检修",
      title: "啊啊啊啊啊啊啊啊啊啊啊",
    },
    {
      id: "8219",
      startdate: "2019-03-11 09:00:00",
      enddate: "2022-01-01 01:00:00",
      person: "张三",
      status: 2,
      device: "211柜",
      content: "运行转检修",
      title: "2",
    },
    {
      id: "8210",
      startdate: "2019-03-11 09:00:00",
      enddate: "2022-01-01 01:00:00",
      person: "张三",
      status: 2,
      device: "211柜",
      content: "运行转检修",
      title: "3",
    },
    {
      id: "8211",
      startdate: "2019-03-11 09:00:00",
      enddate: "2022-01-01 01:00:00",
      person: "张三",
      status: 2,
      device: "211柜",
      content: "运行转检修",
      title: "4",
    },
    {
      id: "8212",
      startdate: "2019-03-11 09:00:00",
      enddate: "2022-01-01 01:00:00",
      person: "张三",
      status: 2,
      device: "211柜",
      content: "运行转检修",
      title: "5",
    },
    {
      id: "8213",
      startdate: "2019-03-11 09:00:00",
      enddate: "2022-01-01 01:00:00",
      person: "张三",
      status: 2,
      device: "211柜",
      content: "运行转检修",
      title: "6",
    },
    {
      id: "8214",
      startdate: "2019-03-11 09:00:00",
      enddate: "2022-01-01 01:00:00",
      person: "张三",
      status: 2,
      device: "211柜",
      content: "运行转检修",
      title: "7",
    },
    {
      id: "8215",
      startdate: "2019-03-11 09:00:00",
      enddate: "2022-01-01 01:00:00",
      person: "张三",
      status: 2,
      device: "211柜",
      content: "运行转检修",
      title: "8",
    },
    {
      id: "8216",
      startdate: "2019-03-11 09:00:00",
      enddate: "2022-01-01 01:00:00",
      person: "张三",
      status: 2,
      device: "211柜",
      content: "运行转检修",
      title: "9",
    },
    {
      id: "8217",
      startdate: "2019-03-11 09:00:00",
      enddate: "2022-01-01 01:00:00",
      person: "张三",
      status: 2,
      device: "211柜",
      content: "运行转检修",
      title: "10",
    },
    {
      id: "8220",
      startdate: "2019-03-11 09:00:00",
      enddate: "2022-01-01 01:00:00",
      person: "张三",
      status: 2,
      device: "211柜",
      content: "运行转检修",
      title: "11",
    },
    {
      id: "8221",
      startdate: "2019-03-11 09:00:00",
      enddate: "2022-01-01 01:00:00",
      person: "张三",
      status: 2,
      device: "211柜",
      content: "运行转检修",
      title: "12",
    },
    {
      id: "8222",
      startdate: "2019-03-11 09:00:00",
      enddate: "2022-01-01 01:00:00",
      person: "张三",
      status: 2,
      device: "211柜",
      content: "运行转检修",
      title: "13",
    },
  ];
  const onChange = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };
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
      setKey(record.id);
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
  return (
    <div>
      {/* 查询重置区域 */}
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
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
            initialValues={{ status: -1 }}
            ref={formRef}
          >
            <Form.Item label="状态" name="status">
              <Radio.Group>
                <Radio value={-1}>全部</Radio>
                <Radio value={0}>进行中</Radio>
                <Radio value={1}>计划中</Radio>
                <Radio value={2}>正确完成</Radio>
                <Radio value={3}>错误</Radio>
                <Radio value={4}>已过期</Radio>
                <Radio value={5}>正确完成、超时</Radio>
                <Radio value={6}>失去连接、检测无效</Radio>
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
                <Form.Item label="工作操作人" name="worker_name">
                  {/* <Input
                placeholder="请输入工作操作人"
                style={{ width: 200 }}
              ></Input> */}
                  <Select placeholder="请选择工作操作人" style={{ width: 200 }}>
                    {/* {workers.map((worker) => (
                      <Option key={worker.id} value={worker.id}>
                        {worker.name}
                      </Option>
                    ))} */}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={7}>
                <Form.Item label="工作内容" name="supervisor_name">
                  <Select placeholder="请选择工作内容" style={{ width: 200 }}>
                    {contents.map((content) => (
                      <Option key={content.id} value={content.id}>
                        {content.name}
                      </Option>
                    ))}
                    {/* <Option value="运行转检修">运行转检修</Option>
              <Option value="检修转运行">检修转运行</Option> */}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <ConfigProvider
              theme={{
                algorithm: theme.darkAlgorithm,
              }}
            >
              <Button >????????????</Button>
            </ConfigProvider>

            <Form.Item label="操作设备" name="operate_device">
              <Select placeholder="请选择操作设备" style={{ width: 200 }}>
                {cabinets.map((cabinet) => (
                  <Option key={cabinet.id} value={cabinet.id}>
                    {cabinet.name}
                  </Option>
                ))}
                {/* <Option value="221柜">221柜</Option>
                <Option value="222柜">222柜</Option> */}
              </Select>
            </Form.Item>

            <Form.Item label="工作监督人" name="supervisorName">
              {/* <Input
                placeholder="请输入工作监督人"
                style={{ width: 200 }}
              ></Input> */}
              <Select placeholder="请选择工作监督人" style={{ width: 200 }}>
                {/* {supervisors.map((supervisor) => (
                  <Option key={supervisor.id} value={supervisor.id}>
                    {supervisor.name}
                  </Option>
                ))} */}
              </Select>
            </Form.Item>

            <Form.Item label="起止时间" name="work_period">
              <Space direction="vertical" size={12}>
                {/* <DatePicker showTime onChange={onChange} onOk={onOk} /> */}
                <RangePicker
                  locale={locale}
                  showTime
                  onChange={onChange}
                  onOk={onOk}
                />
              </Space>
            </Form.Item>

            {/* <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              defaultValue="lucy"
              style={{ width: 200 }}
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            <RangePicker locale={locale}></RangePicker>
          </Form.Item> */}
            {/* 传入locale属性 控制中文显示*/}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginLeft: 80 }}
              >
                查询
              </Button>
              <Button
                type="primary"
                htmlType="button"
                onClick={onReset}
                style={{ marginLeft: 80 }}
              >
                重置
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="button"
                style={{
                  margin: "0 8px",
                }}
                onClick={() => {
                  setOpen(true);
                }}
              >
                新增
              </Button>

              <Button
                type="primary"
                htmlType="submit"
                style={{ marginLeft: 80 }}
              >
                删除
              </Button>
            </Form.Item>
          </Form>
          <CollectionCreateForm
            open={open}
            onCreate={onCreate}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </Form.Provider>
      </Card>
      {/* 操作票列表区域 */}
      {/* dataSource={tickets.list} */}
      <Card title={`根据筛选条件共查询到 ${tickets.count} 条结果：`}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: params.per_page,
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
