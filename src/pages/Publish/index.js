import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  DatePicker,
  Row,
  Col,
  Tooltip,
  Typography,
  message,
} from "antd";
import {
  PlusOutlined,
  MinusCircleOutlined,
  QuestionCircleTwoTone,
} from "@ant-design/icons";
import "dayjs/locale/zh-cn";
import locale from "antd/es/date-picker/locale/zh_CN";
import "./index.scss";
import { useState, useEffect } from "react";
import { http } from "@/utils";

const { Option } = Select;
const { RangePicker } = DatePicker;

const Publish = () => {
  const [form] = Form.useForm();
  // 时间选择
  const onChangeTime = () => {};
  // const onOkTime = (value) => {
  //   {
  //     value.map((val) => {
  //       console.log("onOkTime:", val.format("YYYY-MM-DD hh:mm:ss"));
  //     });
  //   }
  // };
  // 步骤form.list
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 4,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 20,
      },
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 20,
        offset: 4,
      },
    },
  };
  // 表单提交 成功 失败
  const onFinish = async (fieldsValue) => {
    console.log("Success:", fieldsValue);
    // 以下新添加
    // form.resetFields();
    // console.log("fieldsValue:", fieldsValue);
    const rangeTimeValue = fieldsValue["range-time-picker"];
    console.log("fieldsValue[workerName]", fieldsValue["workerName"]);
    const workerInfo = fieldsValue["workerName"].split(",");
    const stepValue = fieldsValue["stepSwitch"];
    // const [first] = stepValue.ste;
    let arrnew = stepValue
      .map((obj, index) => {
        return obj.stepname;
      })
      .join(",")
      .split(",");
    console.log("stepValue:", stepValue);
    let arrnew2 = [];
    stepValue.map((item, index) => {
      item["switchId"] = parseInt(item["switchId"]);
      // console.log(item);
      arrnew2.push(Object.assign(item, { stepOrder: index }));
    });
    // console.log("rangeTimeValue:", rangeTimeValue);
    const values = {
      ...fieldsValue,
      "range-time-picker": [
        rangeTimeValue[0].format("YYYY-MM-DD HH:mm:ss"),
        rangeTimeValue[1].format("YYYY-MM-DD HH:mm:ss"),
      ],
      createTime: rangeTimeValue[0].format("YYYY-MM-DD HH:mm:ss"),
      completeTime: rangeTimeValue[1].format("YYYY-MM-DD HH:mm:ss"),
      workerId: parseInt(workerInfo[0]),
      workerName: workerInfo[1],
      // steps: arrnew,
      steps: arrnew2,
      adminId: 7,
      adminName: "梁云熙",
    };
    // onCreate(values);
    console.log("after changing:", values);
    try {
      await http.post("/ticket", values);
      message.success("添加操作票成功");
      form.resetFields();
    } catch {
      console.log("有异常")
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onSelect = async (fieldsValue) => {
    console.log("观察时刻");
    console.log(fieldsValue);
    let temp_switchs = [];
    for (const key in cabinets) {
      if (fieldsValue === cabinets[key].id) {
        temp_switchs = cabinets[key].switchOrder;
        break;
      }
    }
    let res = temp_switchs.split(",");
    for (const key in switchs) {
      if (res.indexOf(switchs[key].switchId) != -1) {
        switchs[key].disabled = "disabled";
      }
    }
  };
  // 获取开关列表
  const [switchs, setSwitchs] = useState([]);
  useEffect(() => {
    async function fetchSwitchs() {
      const res = await http.get("/ticket/switch");
      const results = res.data;
      let arrnew = Array.from(results);
      setSwitchs(arrnew);
      console.log("获取开关列表，返回信息：", switchs);
      // setSwitchs(res.data);
    }
    fetchSwitchs();
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
      let arrnew = Array.from(results);
      setCabinets(arrnew);
      console.log("cabinets:", cabinets);
    }
    fetchCabinets();
  }, []);
  // 联动
  const typeData = {
    压板: ["出", "入"],
    开关: ["左", "右"],
    仪表: ["绿", "红", "灭"],
    显示器: ["亮", "灭"],
  };
  const [statuss, setStatuss] = useState([]);
  const handleSwitchChange = (value) => {
    // setCities(cityData[value]);
    // setSecondCity(cityData[value][0]);
    let type = "";
    console.log(switchs);
    for (const key in switchs) {
      if (value === switchs[key].id.toString()) {
        type = switchs[key].switchType;
        console.log("type", type);
      }
    }
    console.log(typeData[type]);
    setStatuss(typeData[type]);
  };
  // 自动填充
  const onFill = () => {
    // const values = form.getFieldValue();
    const content = form.getFieldValue("work_content");
    const deviceId = form.getFieldValue("cabinetId");
    if (!content || !deviceId) {
      message.error("请输入要求内容");
    } else {
      const deviceName = cabinets.find(
        (item2) => item2.id === deviceId
      ).cabinetName;
      form.setFieldsValue({
        // note: "Hello world!",
        // gender: "male",
        taskName: deviceName + content,
      });
    }
  };
  return (
    <div className="publish">
      {/* <Breadcrumb separator=">">
        <Breadcrumb.Item>业务中心</Breadcrumb.Item>
        <Breadcrumb.Item>开具操作票</Breadcrumb.Item>
      </Breadcrumb> */}
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>业务中心</Breadcrumb.Item>
            <Breadcrumb.Item>开具操作票</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        {/* <Modal
          open={open}
          title="新建操作票"
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
        > */}
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="taskName"
            label="工作名称"
            rules={[{ required: true, message: "请输入工作名称" }]}
          >
            <Input placeholder="请输入工作名称" style={{ width: 400 }} />
          </Form.Item>

          <Form.Item label="工作内容">
            <Space>
              <Form.Item
                name="work_content"
                noStyle
                // rules={[
                //   {
                //     required: true,
                //     message: "Username is required",
                //   },
                // ]}
              >
                {/* <Input
                  style={{
                    width: 160,
                  }}
                  placeholder="Please input"
                /> */}
                <Select
                  placeholder="请选择工作内容"
                  style={{ width: 200 }}
                  allowClear
                >
                  <Option value="运行转检修">运行转检修</Option>
                  <Option value="检修转运行">检修转运行</Option>
                  <Option value="检修转热备用">检修转热备用</Option>
                  <Option value="检修转冷备用">检修转冷备用</Option>
                </Select>
              </Form.Item>
              {/* <Tooltip title="Useful information">
                <Typography.Link href="#API">Need Help?</Typography.Link>
              </Tooltip> */}
              <Button type="link" htmlType="button" onClick={onFill}>
                {/* 根据操作柜名称和工作内容 */}
                自动填写工作名称
              </Button>
              <Tooltip title="根据操作柜名称和工作内容">
                <QuestionCircleTwoTone />
              </Tooltip>
            </Space>
          </Form.Item>

          <Form.Item
            name="workerName"
            label="操作人名称"
            rules={[{ required: true, message: "请选择操作人名称" }]}
          >
            <Select placeholder="选择操作员名称">
              {workers.map((worker) => (
                <Option key={worker.id} value={worker.id + "," + worker.name}>
                  {worker.name}
                </Option>
              ))}
              {/* <Option key={5} value={"555,王test"}>
                王test
              </Option> */}
            </Select>
          </Form.Item>

          <Form.Item
            name="supervisorName"
            label="监督人名称"
            rules={[{ required: true, message: "请选择监督人名称" }]}
          >
            {/* 更換成后端獲取的监督人 */}
            <Select placeholder="选择监督人名称">
              {supervisors.map((supervisor) => (
                <Option key={supervisor.id} value={supervisor.name}>
                  {supervisor.name}
                </Option>
              ))}
              {/* <Option value="赵test">赵test</Option> */}
            </Select>
          </Form.Item>

          <Form.Item
            label="起止时间"
            name="range-time-picker"
            rules={[{ required: true, message: "请选择起止时间" }]}
          >
            {/* <Space direction="vertical" size={12}> */}
            {/* <DatePicker showTime onChange={onChange} onOk={onOk} /> */}
            <RangePicker
              locale={locale}
              showTime
              onChange={onChangeTime}
              // onOk={onOkTime}
            />
            {/* </Space> */}
          </Form.Item>

          <Form.Item
            name="cabinetId"
            label="操作柜名称"
            rules={[{ required: true, message: "请选择操作柜名称" }]}
          >
            {/* 更換成後端獲取的操作人 */}
            <Select placeholder="选择操作柜名称" onSelect={onSelect}>
              {cabinets.map((cabinet) => (
                <Option key={cabinet.id} value={cabinet.id}>
                  {cabinet.cabinetName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.List name="stepSwitch">
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((key, name, ...restField) => (
                  <Form.Item
                    {...(restField.index === 0
                      ? formItemLayout
                      : formItemLayoutWithOutLabel)}
                    label={restField.index === 0 ? "操作步骤" : ""}
                    required={false}
                    // key={field.key}
                  >
                    <Space.Compact
                      // block
                      style={{
                        width: "90%",
                      }}
                      key={key}
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "description"]}
                        // validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: "请输入步骤名称或删除该域",
                          },
                        ]}
                        noStyle
                      >
                        <Input
                          placeholder="步骤描述"
                          style={{
                            width: "60%",
                          }}
                        />
                      </Form.Item>
                      {/* </Col> */}

                      {/* second */}
                      {/* <Col span={6}> */}
                      <Form.Item
                        {...restField}
                        name={[name, "switchId"]}
                        // validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            // message:
                            //   "Please input passenger's name or delete this field.",
                          },
                        ]}
                        noStyle
                      >
                        <Select
                          placeholder="选择开关"
                          style={{
                            width: "20%",
                          }}
                          // disabled={}
                          onChange={handleSwitchChange}
                        >
                          {switchs.map((oneswitch) => (
                            <Option
                              key={oneswitch.id.toString()}
                              value={oneswitch.id.toString()}
                            >
                              {oneswitch.switchName}
                            </Option>
                          ))}
                          {/* <Option key="woshikaiguan1">开关1</Option> */}
                        </Select>
                      </Form.Item>
                      {/* </Col> */}

                      {/* third */}
                      <Form.Item
                        {...restField}
                        name={[name, "switchStatus"]}
                        // validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            // message:
                            //   "Please input passenger's name or delete this field.",
                          },
                        ]}
                        noStyle
                      >
                        <Select
                          placeholder="仪表结束状态"
                          style={{
                            width: "20%",
                          }}
                          options={statuss.map((status) => ({
                            label: status,
                            value: status,
                          }))}
                        >
                          {/* <Option key="woshiSTATUS1">状态1</Option> */}
                        </Select>
                      </Form.Item>
                    </Space.Compact>

                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(name)}
                      />
                    ) : null}
                    {/* </Col> */}
                    {/* </Space> */}
                    {/* </Row> */}
                  </Form.Item>
                ))}
                <Form.Item {...formItemLayoutWithOutLabel}>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    style={{
                      width: "60%",
                    }}
                    icon={<PlusOutlined />}
                  >
                    添加步骤
                  </Button>
                  {/* <Button
                    type="dashed"
                    onClick={() => {
                      add("The head item", 0);
                    }}
                    style={{
                      width: "60%",
                      marginTop: "20px",
                    }}
                    icon={<PlusOutlined />}
                  >
                    Add field at head
                  </Button>
                  <Form.ErrorList errors={errors} /> */}
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布操作票
              </Button>
            </Space>
          </Form.Item>
        </Form>
        {/* </Modal> */}
      </Card>
    </div>
  );
};

export default Publish;
