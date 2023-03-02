import { Input, Form } from "antd";
import { useAuth } from "context/auth-context";
import { LongButton } from "unauthenticated-app";

export const RegisterScreen = () => {
  const { register } = useAuth();

  const handleSubmit = (values: { username: string; password: string }) => {
    register(values);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name="username">
        {/* <label htmlFor={"username"}>用户名</label> */}
        <Input type="text" placeholder="用户名" />
      </Form.Item>
      <Form.Item name="password">
        {/* <label htmlFor={"password"}>密码</label> */}
        <Input type="password" placeholder="密码" />
      </Form.Item>
      <Form.Item>
        <LongButton type="primary" htmlType="submit">
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
