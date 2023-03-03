import { makeAutoObservable } from "mobx";
import { http } from "@/utils";
class TicketStore {
  ticketInfo = {};
  constructor() {
    makeAutoObservable(this);
  }
  getTicketInfo = async () => {
    //调用接口获取数据
    const res = await http.get("/ticket/status");
    this.ticketInfo = res.data
  };
}

export default TicketStore;