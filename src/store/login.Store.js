// login module
import { makeAutoObservable } from "mobx";
import { http, setToken, getToken, removeToken } from "@/utils";
class LoginStore {
  token = getToken() || "";
  constructor() {
    // 响应式
    makeAutoObservable(this);
  }
  getToken = async ({ userName, password }) => {
    // 调用登录接口
    // const res = await http.post("http://geek.itheima.net/v1_0/authorizations", {
    //   mobile,
    //   code,
    // });
    const res = await http.post("/user/login", {
      userName,
      password,
    });
    // 存入token
    this.token = res.data;
    // 存入ls
    setToken(this.token);
  };
  // 退出登录
  logOut = () => {
    this.token = "";
    removeToken();
  };
}

export default LoginStore;
