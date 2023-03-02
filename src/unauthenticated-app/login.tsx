import { Input, Form } from "antd";
import { useAuth } from "context/auth-context";
import { LongButton } from "unauthenticated-app";
import { useAsync } from "util/use-async";

export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { login } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwError: true });

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await run(login(values));
    } catch (error) {
      onError(error as Error);
    }
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
        <LongButton loading={isLoading} type="primary" htmlType="submit">
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
