import { Col, Row, Card, Breadcrumb, Form, Button, Input, Table,Space } from "antd";
import { useState, useEffect } from "react";
import { http } from "@/utils";

const ConfigM = () => {
  // 获取开关列表
//   const [switchs, setSwitchs] = useState([]);
//   useEffect(() => {
//     async function fetchSwitchs() {
//       const res = await http.get("/ticket/switch");
//       const results = res.data;
//       let arrnew = Array.from(results);
//       setSwitchs(arrnew);
//       console.log("获取开关列表，返回信息：", switchs);
//       // setSwitchs(res.data);
//     }
//     fetchSwitchs();
//   }, [switchs]);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "视频流地址",
      dataIndex: "video_address",
      // width: 220,
    },
  ];
  const data = [
    {
      id: "1",
      video_address: "rtsp://127.0.0.1:554/video4",
    },
    {
      id: "2",
      video_address: "rtsp://127.0.0.1:554/video5",
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
            <Breadcrumb.Item>配置监控</Breadcrumb.Item>
            <Breadcrumb.Item>添加监控</Breadcrumb.Item>
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
            <Col>
              <Form.Item
                name="video_address"
                label="视频流地址"
                rules={[{ required: true, message: "不能为空！" }]}
              >
                <Input placeholder="请输入视频流地址" style={{ width: 400 }}></Input>
              </Form.Item>
            </Col>

            <Col>
              <Form.Item wrapperCol={{ offset: 4 }}>
                <Button size="large" type="primary" htmlType="submit">
                  添加新监控
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>系统管理</Breadcrumb.Item>
            <Breadcrumb.Item>配置监控</Breadcrumb.Item>
            <Breadcrumb.Item>全部监控</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Table
          rowKey="id"
          columns={columns}
          dataSource={data}
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
export default ConfigM;
