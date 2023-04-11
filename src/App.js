import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route,
} from "react-router-dom";
import { history } from "./utils/history";
import Layout from "./pages/Layout";
import Login from "@/pages/Login";
import { AuthRoute } from "@/components/AuthRoute";
import "./App.css";
import Home from "./pages/Home";
import Operation from "./pages/Operation";
import Clothing from "./pages/Clothing";
import Device from "./pages/Device";
import { Button, ConfigProvider, theme } from "antd";
import ErrorC from "./pages/ErrorClothing";
import ErrorD from "./pages/ErrorDevice";
import ErrorP from "./pages/ErrorProcedure";
import ErrorT from "./pages/ErrorTotal";
import Ongoing from "./pages/Ongoing";
import Publish from "./pages/Publish";
import UserM from "./pages/UserManage";
import Logging from "./pages/Logging";
import ConfigD from "./pages/ConfigDevice";
import ConfigS from "./pages/ConfigSwitch";
import ConfigM from "./pages/ConfigMonitor";
function App() {
  return (
    //路由配置
    <HistoryRouter history={history}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#08979c",
          },
          // algorithm: theme.darkAlgorithm,
        }}
      >
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
              <Route path="operation" element={<Operation />}></Route>
              <Route path="clothing" element={<Clothing />}></Route>
              <Route path="device" element={<Device />}></Route>
              <Route path="errorc" element={<ErrorC />}></Route>
              <Route path="errord" element={<ErrorD />}></Route>
              <Route path="errorp" element={<ErrorP />}></Route>
              <Route path="errort" element={<ErrorT />}></Route>
              <Route path="ongoing" element={<Ongoing />}></Route>
              <Route path="publish" element={<Publish />}></Route>
              <Route path="userm" element={<UserM />}></Route>
              <Route path="logging" element={<Logging />}></Route>
              <Route path="configd" element={<ConfigD />}></Route>
              <Route path="configs" element={<ConfigS />}></Route>
              <Route path="configm" element={<ConfigM/>}></Route>
            </Route>
            {/* 这个不需要鉴权处理 */}
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </div>
      </ConfigProvider>
    </HistoryRouter>
  );
}

export default App;
