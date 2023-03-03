import { unstable_HistoryRouter as HistoryRouter, Routes, Route } from "react-router-dom";
import { history } from "./utils/history";
import Layout from "./pages/Layout";
import Login from "@/pages/Login";
import { AuthRoute } from "@/components/AuthRoute";
import "./App.css";
import Home from "./pages/Home";
import Operation from "./pages/Operation";
import Clothing from "./pages/Clothing";
import Device from "./pages/Device";
import { Button, ConfigProvider, theme } from 'antd';
function App() {
  return (
    //路由配置
    <HistoryRouter history={history}>
      <div className="App">
        <Routes>
          {/*创建路由path和组件对应关系*/}
          {/* Layout需要鉴权处理 要根据是否登录判断*/}
          <Route
            path="/"
            element={
              <AuthRoute>
                <Layout />
              </AuthRoute>
            }
          >
            <Route index element={<Home />}></Route>
            <Route path='operation' element={<Operation/>}></Route>
            <Route path='clothing' element={<Clothing/>}></Route>
            <Route path='device' element={<Device/>}></Route>
          </Route>
          {/* 这个不需要鉴权处理 */}
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
    </HistoryRouter>
  );
}

export default App;
