import { Layout, Menu, Popconfirm } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  DiffOutlined,
  // EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useStore } from "@/store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import "./index.scss";

const { Header, Sider } = Layout;

const MyLayout = () => {
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
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu
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
            {/* <Menu.Item icon={<EditOutlined />} key="3">
              发布文章
            </Menu.Item> */}
          </Menu>
        <div className="user-info">
          {/* 此处修改用户名 */}
          <span className="user-name">{userStore.userInfo.name}</span>
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
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 二级路由出口 */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default observer(MyLayout);
