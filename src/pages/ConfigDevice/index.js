import {
  Col,
  Row,
  Card,
  Breadcrumb,
  Form,
  Button,
  Input,
  Table,
  Select,
} from "antd";
import { useState, useEffect } from "react";
import { http } from "@/utils";

const { Option } = Select;

const ConfigD = () => {
  // 获取全部视频流地址 还没写
  const [streams, setStreams] = useState([]);
  useEffect(() => {
    async function fetchStreams() {
      // const res = await http.get("/ticket/cabinet");
      // const results = res.data;
      // let arrnew = Array.from(results);
      // setCabinets(arrnew);
      // console.log("cabinets:", cabinets);
    }
    fetchStreams();
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
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "操作柜名称",
      dataIndex: "cabinetName",
      // width: 220,
    },
    {
      title: "压板顺序",
      dataIndex: "platenOrder",
    },
    {
      title: "开关顺序",
      dataIndex: "switchOrder",
    },
    {
      title: "指示灯顺序",
      dataIndex: "lightOrder",
    },
    // {
    //   title: "对应视频流",
    //   dataIndex: "vedio_steam",
    // },
    // {
    //   title: "cabinet_order",
    //   dataIndex: "cabinet_order",
    // },
    // {
    //   title: "monitor_id",
    //   dataIndex: "monitor_id",
    // },
    // {
    //   title: "工作状态",
    //   dataIndex: "status",
    //   render: (data) =>{
    //     return(
    //     <Tag color={tagColor[data]}>{tagDescription[data]}</Tag>)
    //   }
    // },
  ];
  const data = [
    {
      id: "123",
      cabinet_name: "221柜",
      platen_order: "1,2,3",
      switch_order: "4,5",
      light_order: "6,7,8",
      vedio_steam: "rtsp:",
      cabinet_order: "?",
      monitor_id: "?",
    },
  ];
  const onFinish = async (fieldsValue) => {
    console.log("Success:", fieldsValue);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>系统管理</Breadcrumb.Item>
            <Breadcrumb.Item>配置仪器</Breadcrumb.Item>
            <Breadcrumb.Item>添加仪器</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form
          //   labelCol={{ span: 4 }}
          //   wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row>
            <Col span={12}>
              <Form.Item
                name="cabinet_name"
                label="操作柜名称"
                rules={[{ required: true, message: "不能为空！" }]}
              >
                <Input
                  placeholder="请输入操作柜名称"
                  style={{ width: 400 }}
                ></Input>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                name="platen_order"
                label="压板顺序"
                rules={[{ required: true, message: "不能为空！" }]}
              >
                <Input
                  placeholder="请输入压板顺序"
                  style={{ width: 170 }}
                ></Input>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                name="switch_order"
                label="开关顺序"
                rules={[{ required: true, message: "不能为空！" }]}
              >
                <Input
                  placeholder="请输入开关顺序"
                  style={{ width: 170 }}
                ></Input>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={6}>
              <Form.Item
                name="light_order"
                label="指示灯顺序"
                rules={[{ required: true, message: "不能为空！" }]}
              >
                <Input
                  placeholder="请输入指示灯顺序"
                  style={{ width: 150 }}
                ></Input>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                name="indicator_order"
                label="指示器顺序"
                rules={[{ required: true, message: "不能为空！" }]}
              >
                <Input
                  placeholder="请输入指示器顺序"
                  style={{ width: 150 }}
                ></Input>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="video_stream"
                label="监控视频地址"
                rules={[{ required: true, message: "不能为空！" }]}
              >
                {streams.map((stream) => (
                  <Option key={stream.id} value={stream.id}>
                    {stream.name}
                  </Option>
                ))}
                <Select placeholder="选择监控视频流">
                  <Option value="压板">压板</Option>
                  <Option value="开关">开关</Option>
                  <Option value="显示器">显示器</Option>
                  <Option value="仪表">其它仪表</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Col span={6}>
            <Form.Item wrapperCol={{ offset: 4 }}>
              <Button size="large" type="primary" htmlType="submit">
                添加操作柜
              </Button>
            </Form.Item>
          </Col>
        </Form>
      </Card>

      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>系统管理</Breadcrumb.Item>
            <Breadcrumb.Item>配置设备</Breadcrumb.Item>
            <Breadcrumb.Item>全部操作柜</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Table
          rowKey="id"
          columns={columns}
          dataSource={cabinets}
          // pagination={{
          //   pageSize: params.per_page,
          //   total: tickets.count,
          //   onChange: pageChange,
          // }}
          // rowSelection={{
          //   type: "checkbox",
          //   ...rowSelection,
          // }}
          size="middle"
        />
      </Card>
    </div>
  );
};
export default ConfigD;
