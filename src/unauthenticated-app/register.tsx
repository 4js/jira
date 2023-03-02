import { Input, Form } from "antd";
import { useAuth } from "context/auth-context";
import { LongButton } from "unauthenticated-app";
import { useAsync } from "util/use-async";

export const RegisterScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwError: true });

  const handleSubmit = async ({
    rPassword,
    ...values
  }: {
    username: string;
    password: string;
    rPassword: string;
  }) => {
    if (rPassword !== values.password) {
      onError(new Error("请确认两次输入的密码相同"));
      return;
    }
    try {
      await run(register(values));
    } catch (error) {
      onError(error as Error);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name="username">
        <Input type="text" placeholder="用户名" />
      </Form.Item>
      <Form.Item name="password">
        <Input type="password" placeholder="密码" />
      </Form.Item>
      <Form.Item name="rPassword">
        <Input type="password" placeholder="再次输入密码" />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} type="primary" htmlType="submit">
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
