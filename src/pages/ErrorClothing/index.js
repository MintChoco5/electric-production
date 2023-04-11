import Bar2 from "@/components/Bar2";
import {
  Select,
  Space,
  DatePicker,
  Form,
  Button,
  Card,
  Breadcrumb,
} from "antd";
import "dayjs/locale/zh-cn";
import locale from "antd/es/date-picker/locale/zh_CN";
import { useState, useEffect } from "react";
import { http } from "@/utils";

const { RangePicker } = DatePicker;
const { Option } = Select;

const ErrorC = () => {
  // 表单相关
  const [form] = Form.useForm();
  // 统计数据 参数管理
  const [params, setParams] = useState({
    month: 12,
  });
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
  // 获取统计数据
  const [arr_total,setArr_total] = useState([]);
  const [arr_error, setArr_error] = useState([]);
  // let arr_helmet = [];
  const [arr_helmet, setArr_helmet] = useState([]);
  // let arr_dress = [];
  const [arr_dress, setArr_dress] = useState([]);
  // let arr_gloves = [];
  const [arr_gloves, setArr_gloves] = useState([]);
  useEffect(() => {
    const loadList = async () => {
      console.log("params", params);
      console.log("{params}", { params });
      console.log(params.workerId);
      console.log(params.month);
      const res = await http.post("/statistics/batch/uniformError", params);
      const results = res.data.List;
      // const results = Array.from(res.data);
      console.log("获得的结果",results);
      // arr_name = [];
      let temp_arr_total = [];
      let temp_arr_error = [];
      let temp_arr_helmet = [];
      let temp_arr_dress = [];
      let temp_arr_gloves = [];
      for (const key in results) {
        temp_arr_total.push(results[key].total_ticket);
        temp_arr_error.push(results[key].total_error);
        temp_arr_helmet.push(results[key].helmet_error);
        temp_arr_dress.push(results[key].uniform_error);
        temp_arr_gloves.push(results[key].cabinet_error);
      }
      setArr_total(temp_arr_total);
      setArr_error(temp_arr_error);
      setArr_helmet(temp_arr_helmet);
      setArr_dress(temp_arr_dress);
      setArr_gloves(temp_arr_gloves);
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
            <Breadcrumb.Item>衣装错误</Breadcrumb.Item>
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
            // rules={[{ required: true, message: "???" }]}
          >
            <Select
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="请选择需要查询的工人"
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
        {/* <Bar
          title={"衣装错误情况"}
          xDate={["张三", "李四"]}
          yDate={[30, 40]}
          style={{ height: 500, width: 400 }}
        /> */}
        <Bar2
          xDate={arr_name}
          y1Data={arr_total}
          yhData={arr_helmet}
          ycData={arr_dress}
          ygData={arr_gloves}
          y2Data={arr_error}

          // xDate={['于云熙','常子韬','陈璐','汪睿']}
          // y1Data={[20,13,24,11]}
          // yhData={[1,3,0,2]}
          // ycData={[2,5,3,1]}
          // ygData={[1,0,3,0]}
          // y2Data={[4,8,6,3]}
          style={{ height: 300, width: 840 }}
        />
      </Card>
    </div>
  );
};
export default ErrorC;
