import { Col, Row, Card, Breadcrumb, Form, Button, Input, Table } from "antd";
import { useEffect, useState } from "react";
import { http } from "@/utils";

const UserM = () => {
  // 工人参数管理 查询 分页
  const [params, setParams] = useState({
    // page: 1,
    // per_page: 10,
    region: 0
  });
  // 获取工人列表
  // const [workers, setWorkers] = useState([]);
  // useEffect(() => {
  //   async function fetchWorkers() {
  //     const res = await http.get("/ticket/worker");
  //     const result = Array.from(res.data)
  //     console.log("res.data", res.data);
  //     console.log("result",result)
  //     setWorkers(result);
  //     //console.log('workers:', workers)
  //   }
  //   fetchWorkers();
  // }, [params]);

  // 获取工人列表2
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
      setWorkers(Array.from(arrnew));
      console.log("workers:", workers);
    };
    fetchWorkers();
  }, []);

  const onFinish = async (values) => {
    console.log(values);
    await http.get("/user/add", values);
    // 刷新一下列表
    setParams({
      ...params,
      page: 1,
    });
  };

  const onFinish2 = async (values) => {
    console.log(values);
    const {
      worker_id,
      worker_name
    }=values;
    const _params = {};
    if (worker_id){
      _params.worker_id = worker_id;
    }
    if (worker_name){
      _params.worker_name = worker_name;
    }
    setParams({
      ...params,
      ..._params,
    })
    console.log(params);
    await http.get("/user/alluser",{params});
  };
  // 翻页实现
  // const pageChange = (page) => {
  //   setParams({
  //     ...params,
  //     page,
  //   });
  // };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "工人姓名",
      dataIndex: "name",
      // width: 220,
    },
    // {
    //   title: "工作状态",
    //   dataIndex: "status",
    //   render: (data) =>{
    //     return(
    //     <Tag color={tagColor[data]}>{tagDescription[data]}</Tag>)
    //   }
    // },
    // {
    //   title: "地区",
    //   dataIndex: "region",
    // },
  ];
  const data = [
    {
      worker_id: "123",
      worker_name: "张三",
      region: "xx配电站",
    },
  ];
  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Card
            title={
              <Breadcrumb separator=">">
                <Breadcrumb.Item>系统管理</Breadcrumb.Item>
                <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                <Breadcrumb.Item>添加工人</Breadcrumb.Item>
              </Breadcrumb>
            }
            style={{ marginBottom: 20 }}
            bordered={true}
          >
            <Form
              onFinish={onFinish}
              // initialValues={{ status: -1 }}
              // ref={formRef}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 2 }}
            >
              {/* <Row>
            <Col span={8}> */}
              <Form.Item label="工人姓名" name="worker_name">
                <Input
                  placeholder="请输入工人姓名"
                  style={{ width: 250 }}
                ></Input>
              </Form.Item>
              {/* </Col>
            <Col span={8}> */}
              <Form.Item label="地区" name="region">
                <Input placeholder={"请输入地区"} style={{ width: 250 }}></Input>
              </Form.Item>
              {/* </Col>
            <Col span={8}> */}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: 120 }}
                >
                  添加
                </Button>
              </Form.Item>
              {/* </Col>
          </Row> */}
            </Form>
          </Card>
        </Col>

        <Col span={12}>
          <Card
            title={
              <Breadcrumb separator=">">
                <Breadcrumb.Item>系统管理</Breadcrumb.Item>
                <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                <Breadcrumb.Item>查询工人</Breadcrumb.Item>
              </Breadcrumb>
            }
            style={{ marginBottom: 20 }}
            bordered={true}
          >
            <Form
              onFinish={onFinish2}
              // initialValues={{ status: -1 }}
              // ref={formRef}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 2 }}
            >
              {/* <Row>
            <Col span={8}> */}
              <Form.Item label="工人ID" name="worker_id">
                <Input
                  placeholder="请输入工人ID"
                  style={{ width: 250 }}
                ></Input>
              </Form.Item>
              {/* </Col>
            <Col span={8}> */}
              <Form.Item label="工人姓名" name="worker_name">
                <Input
                  placeholder="请输入工人姓名"
                  style={{ width: 250 }}
                ></Input>
              </Form.Item>
              {/* </Col>
            <Col span={8}> */}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: 120 }}
                >
                  查询
                </Button>
              </Form.Item>
              {/* </Col>
          </Row> */}
            </Form>
          </Card>
        </Col>
      </Row>

      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>系统管理</Breadcrumb.Item>
            <Breadcrumb.Item>用户管理</Breadcrumb.Item>
            <Breadcrumb.Item>该地区工人</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Table
          rowKey="id"
          columns={columns}
          dataSource={workers}
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
export default UserM;
