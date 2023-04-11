import "./index.scss";
import { Card } from "antd";
import React, { useState, createContext } from "react";
import Pie from "@/components/Pie";

export const Context = createContext();

const Home = () => {
  return (
    <>
      <Card title="项目背景" size="small">
        <p style={{ textIndent: "2em" }}>
          电力是现代经济发展的重要基础。电力可以促进工业、商业和服务业的发展，促进经济增长，是现代生活中必不可少的一部分。电力生产对于现代社会的发展和运行至关重要，对于人们的生活、健康和经济福利都有着深远的影响。
        </p>
        <p style={{ textIndent: "2em" }}>
          电厂安全生产在整个生产管理中都具有非常重要的作用，直接关系到电厂电能的稳定、持续供应，因此在电力生产操作中，需要规范安全操作，及时制止错误操作。电厂安全生产，
          不仅与企业的发展和稳定息息相关，而且还直接关系到员工的生命安全，如果电厂生产安全无法保障，那么企业效益也难以实现。安全生产是涉及员工生命安全的大事，也关系到企业的生存发展和稳定，可以说没有安全，企业效益就无从谈起。电力事业在操作过程中存在着许多危险源，在电力生产与建设中，难免会发生电力事故，不仅会带来经济损失，还会造成人身伤害。
        </p>
        <p style={{ textIndent: "2em" }}>
          目前，电力作业现场主要是采用人工监督的方式，对工人的违规操作进行纠正，人工监督的方式存在效率低下，主观性强等缺点。为了弥补人工监督的不足，项目组设计研发了一种基于深度学习的电力作业异常行为识别系统，对作业现场的工人进行实时检测，用于辅助监督。
        </p>
      </Card>
      {/* <Card>
        <Pie></Pie>
      </Card> */}
      <div className="homepic"></div>
    </>
  );
};
export default Home;
