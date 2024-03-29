import { Card, Form, Input, Button, Checkbox, message } from "antd";
import logo from "@/assets/logo.png";
import "./index.scss";
import { useStore } from "@/store";
import { useNavigate } from "react-router-dom";
function Login() {
  const { userStore, loginStore } = useStore();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log("登录的values",values);
    try{
      await loginStore.getToken({
        userName: values.userName,
        password: values.password,
      });
      await userStore.getUserInfo(values.userName);
      //跳转首页
      navigate("/", { replace: true });
      // 提示用户
      message.success("登录成功");
      userStore.setUserInfo(values.userName);
    }catch(e){
      message.error(e.response?.data?.message || '登录失败')
    }
  };
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form
          initialValues={{ remember: true }}
          validateTrigger={["onBlur", "onChange"]}
          onFinish={onFinish}
        >
          <Form.Item
            name="userName"
            rules={[
              {
                required: true,
                message: "用户名不能为空！",
                validateTrigger: "onBlur",
              },
            ]}
          >
            <Input size="large" placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "密码不能为空！" }]}
          >
            <Input.Password size="large" placeholder="请输入密码" />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className="login-checkbox-label">
              我已阅读并同意「用户协议」和「隐私条款」
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
