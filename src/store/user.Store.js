import { makeAutoObservable } from "mobx";
import { getUser } from "@/utils";
class UserStore {
  userInfo = getUser()||"";
  constructor() {
    makeAutoObservable(this);
  }
  getUserInfo = async () => {
    //调用接口获取数据
    // const res = await http.get("/user/profile");
    // this.userInfo = res.data
  };
  setUserInfo = (name) => {
    this.userInfo = name;
  };
}

export default UserStore;
