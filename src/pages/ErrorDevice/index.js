import Bar from "@/components/Bar";
import {
  Select,
  Space,
  DatePicker,
  Form,
  Button,
  Card,
  Breadcrumb,
} from "antd";
import { useState, useEffect } from "react";
import { http } from "@/utils";
import "dayjs/locale/zh-cn";
import locale from "antd/es/date-picker/locale/zh_CN";

const { RangePicker } = DatePicker;
const { Option } = Select;

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const ErrorD = () => {
  // 表单相关
  const [form] = Form.useForm();
  // 统计数据 参数管理
  const [params, setParams] = useState({
    month: 12,
  });
  // let arr_name = [];
  const [arr_name, setArr_name] = useState([]);
  const onFinish = (fieldsValue) => {
    console.log("Success:", fieldsValue);
    console.log("fieldsValue:", fieldsValue);
    const { workerId, month } = fieldsValue;
    const _params = {};
    let temp_arr_name = [];
    if (workerId) {
      _params.workerId = workerId;
      for (const i in workerId) {
        for (const key in workers) {
          console.log("i worker[key].id",i,workers[key].id)
          if (workerId[i] === workers[key].id) {
            temp_arr_name.push(workers[key].name);
          }
        }
      }
      setArr_name(temp_arr_name);
    }
    if (month) {
      _params.month = month;
    }
    setParams({
      ...params,
      ..._params,
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // 获取工人列表
  // 连接口时启用
  const options2 = [];
  const [workers, setWorkers] = useState([]);
  useEffect(() => {
    const fetchWorkers = async () => {
      const res = await http.get("/ticket/worker");
      const results = res.data;
      // console.log(res);
      // console.log("res.data", res.data);
      let arrnew = [];
      let temp_arr_name = [];
      let id_list = [];
      for (const key in results) {
        arrnew.push(Object.assign({ id: key, name: results[key] }));
        id_list.push(key);
        temp_arr_name.push(results[key]);
      }
      setWorkers(arrnew);
      setArr_name(temp_arr_name);
      setParams({
        ...params,
        workerId: id_list,
      });
      console.log("workers:", workers);
    };
    fetchWorkers();
  }, []);
  for (let i = 0; i < workers.length; i++) {
    options2.push({
      label: workers[i].name,
      value: workers[i].id,
    });
  }
  console.log("option2", options2);
  // 获取统计数据
  const [arr_total,setArr_total] = useState([]);
  const [arr_error, setArr_error] = useState([]);
  const [arr_percent, setArr_percent] = useState([]);
  useEffect(() => {
    const loadList = async () => {
      console.log("params", params);
      console.log("{params}", { params });
      console.log(params.workerId);
      console.log(params.month);
      const res = await http.post("/statistics/batch/cabinetError", params);
      const results = res.data.List;
      // const results = Array.from(res.data);
      console.log("获得的结果", results);
      // arr_name = [];
      let temp_arr_total = [];
      let temp_arr_error = [];
      let temp_arr_percent = [];
      for (const key in results) {
        temp_arr_total.push(results[key].ticket_amount);
        temp_arr_error.push(results[key].cabinet_error_amount);
        const num1 = results[key].cabinet_error_amount;
        const num2 = results[key].ticket_amount;
        temp_arr_percent.push(Math.round((num1 / num2) * 10000) / 100 + "%");
      }
      setArr_total(temp_arr_total);
      setArr_error(temp_arr_error);
    };
    loadList();
  }, [params]);
  return (
    <div>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>业务中心</Breadcrumb.Item>
            <Breadcrumb.Item>操作管理</Breadcrumb.Item>
            <Breadcrumb.Item>仪器错误</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form
          form={form}
          // labelCol={{ span: 4 }}
          // wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="查询工人"
            name="workerId"
            // rules={[{ required: true, message: "请选择起止时间" }]}
          >
            <Select
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="请选择需要查询的工人"
              // defaultValue={["a10", "c12"]}
              onChange={handleChange}
              options={options2}
            />
          </Form.Item>
          <Space>
            {/* <Form.Item
              label="起止时间"
              name="range-time-picker"
              // rules={[{ required: true, message: "请选择起止时间" }]}
            >
              <RangePicker
                locale={locale}
                showTime
                // onChange={onChangeTime}
                // onOk={onOkTime}
              />
            </Form.Item> */}
            <Form.Item label="最近时间" name="month">
              <Select placeholder="请选择时间长短" style={{ width: 200 }}>
                <Option key={1} value={1}>
                  最近一月
                </Option>
                <Option key={3} value={3}>
                  最近季度
                </Option>
                <Option key={6} value={6}>
                  最近半年
                </Option>
                <Option key={12} value={12}>
                  最近一年
                </Option>
              </Select>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4 }}>
              <Button size="large" type="primary" htmlType="submit">
                查询
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </Card>
      <Card>
        <Bar
          title={"仪器错误情况"}
          xData={arr_name}
          y1Data={arr_total}
          y2Data={arr_error}
          style={{ height: 300, width: 840 }}
        />
      </Card>
    </div>
  );
};
export default ErrorD;
