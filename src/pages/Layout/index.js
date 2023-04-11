import { Layout, Menu, Popconfirm, theme } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  DiffOutlined,
  // EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useStore } from "@/store";
import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import "./index.scss";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  FileOutlined,
  PieChartOutlined,
  DesktopOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const { Header, Sider } = Layout;

const MyLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { pathname } = useLocation();
  const { userStore, loginStore } = useStore();
  useEffect(() => {
    userStore.getUserInfo();
  }, [userStore]);
  // 确定退出
  const navigate = useNavigate();
  const onConfirm = () => {
    // 退出登录 删除token 跳回到登录
    loginStore.logOut();
    navigate("/login");
  };
  const items1 = ["1", "2", "3"].map((key) => ({
    key,
    label: `nav ${key}`,
  }));
  const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
      const key = String(index + 1);
      return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `subnav ${key}`,
        children: new Array(4).fill(null).map((_, j) => {
          const subKey = index * 4 + j + 1;
          return {
            key: subKey,
            label: `option${subKey}`,
          };
        }),
      };
    }
  );
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem(<Link to="/">主页</Link>, "1", <HomeOutlined />),
    getItem('业务中心', "sub1", <DesktopOutlined />, [
      getItem(<Link to="/publish">开具操作票</Link>, "2"),
      getItem('操作管理', "3", <></>, [
        getItem(<Link to="/errorc">衣装错误</Link>, "4"),
        getItem(<Link to="/errord">仪器错误</Link>, "5"),
        getItem(<Link to="/errorp">步骤错误</Link>, "6"),
        getItem(<Link to="/errort">总数据统计</Link>, "7"),
      ]),
      getItem((<Link to="/ongoing">进行中的操作票</Link>),'8'),
      getItem(<Link to="/operation">查看全部操作票</Link>, "9"),
    ]),
    getItem('系统管理', "sub2", <UserOutlined />, [
      getItem(<Link to="/userm">用户管理</Link>, "10"),
      getItem(<Link to="/configd">配置设备</Link>, "11"),
      getItem(<Link to="/configs">配置仪表</Link>, "12"),
      getItem(<Link to="/configm">配置监控</Link>, "13"),
      // getItem(<Link to="">仪器管理</Link>, "11"),
    ]),
    // getItem("Team", "sub2", <TeamOutlined />, [
    //   getItem("Team 1", "6"),
    //   getItem("Team 2", "8"),
    // ]),
    // getItem(<Link to="/logging">监控日志</Link>, "14", <FileOutlined />),
  ];
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          // defaultSelectedKeys={["2"]}
          // items={items1}
        />
        {/* </Header> */}
        {/* <Menu
            mode="horizontal"
            theme="dark"
            defaultSelectedKeys={[pathname]}
            selectedKeys={[pathname]}
          >
            <Menu.Item icon={<HomeOutlined />} key="/">
              <Link to="/">主页</Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="/Operation">
              <Link to="/Operation">内容管理</Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="/Clothing">
              <Link to="/Clothing">衣着测试</Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="/Device">
              <Link to="/Device">仪器测试</Link>
            </Menu.Item>
          </Menu> */}
        <div className="user-info">
          {/* 此处修改用户名 */}
          <span className="user-name"><UserOutlined />{userStore.userInfo}</span>
          <span className="user-logout">
            <Popconfirm
              onConfirm={onConfirm}
              title="是否确认退出？"
              okText="退出"
              cancelText="取消"
            >
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        {/* <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={[pathname]}
            selectedKeys={[pathname]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item icon={<HomeOutlined />} key="/">
              <Link to="/">主页</Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="/Operation">
              <Link to="/Operation">内容管理</Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="/Clothing">
              <Link to="/Clothing">衣着测试</Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="/Device">
              <Link to="/Device">仪器测试</Link>
            </Menu.Item>
          </Menu>
        </Sider> */}
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={[pathname]}
            defaultOpenKeys={["sub1"]}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={items}
          >
            {/* <Menu.Item icon={<HomeOutlined />} key="/">
              <Link to="/">主页</Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="/Operation">
              <Link to="/Operation">内容管理</Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="/Clothing">
              <Link to="/Clothing">衣着测试</Link>
              <Menu.children>
                <Link to="/c">aaa</Link>
              </Menu.children>
            </Menu.Item> */}
            {/* <Menu.Item icon={<DiffOutlined />} key="/Device">
              <Link to="/Device">仪器测试</Link>
            </Menu.Item> */}
          </Menu>
        </Sider>
        {/* <Layout
          style={{
            padding: '0 24px 24px',
          }}
        ></Layout> */}
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 二级路由出口 */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default observer(MyLayout);
