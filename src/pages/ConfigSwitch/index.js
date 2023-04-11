import { Col, Row, Card, Breadcrumb, Form, Button, Input, Table, Select } from "antd";
import { useState, useEffect } from "react";
import { http } from "@/utils";

const { Option } = Select;

const ConfigS = () => {
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
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "开关名称",
      dataIndex: "switchName",
      // width: 220,
    },
    {
      title: "开关类型",
      dataIndex: "switchType",
    },
  ];
  const data = [
    {
      id: "1",
      switch_name: "开关一",
      switch_type: "压板",
    },
    {
      id: "2",
      switch_name: "低周减载",
      switch_type: "压板",
    },
  ];
  const onFinish = async (fieldsValue) => {
    console.log("Success:", fieldsValue);
    // await http.post("")
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
            <Breadcrumb.Item>配置仪表</Breadcrumb.Item>
            <Breadcrumb.Item>添加仪表</Breadcrumb.Item>
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
                name="switch_name"
                label="仪表名称"
                rules={[{ required: true, message: "不能为空！" }]}
              >
                <Input
                  placeholder="请输入仪表名称"
                  style={{ width: 400 }}
                ></Input>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                name="switch_type"
                label="仪表类型"
                rules={[{ required: true, message: "不能为空！" }]}
              >
                <Select placeholder="选择仪表类型">
                  <Option value="压板">压板</Option>
                  <Option value="开关">开关</Option>
                  <Option value="显示器">显示器</Option>
                  <Option value="仪表">其它仪表</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item wrapperCol={{ offset: 4 }}>
                <Button size="large" type="primary" htmlType="submit">
                  添加新仪表
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
            <Breadcrumb.Item>配置仪表</Breadcrumb.Item>
            <Breadcrumb.Item>全部仪表</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Table
          rowKey="id"
          columns={columns}
          dataSource={switchs}
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
export default ConfigS;
