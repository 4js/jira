import styled from "@emotion/styled";
import { Button, Card, Divider, Typography } from "antd";
import React, { useState } from "react";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";
import logo from "assets/logo.svg";
import left from "assets/left.svg";
import right from "assets/right.svg";

export const UnauthenticatedApp = () => {
  const [error, setError] = useState<Error | null>(null);
  const [isLogin, setIsLogin] = useState(true);
  return (
    <Container>
      <Background />
      <Header />
      <ShadowCard>
        <Title>{isLogin ? "请登录" : "请注册"}</Title>
        {error ? (
          <Typography.Text type="danger">{error.message}</Typography.Text>
        ) : null}
        {isLogin ? (
          <LoginScreen onError={setError} />
        ) : (
          <RegisterScreen onError={setError} />
        )}
        <Divider />
        <LongButton type="link" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "还没有账号?去注册" : "已有账号，去登录"}
        </LongButton>
      </ShadowCard>
    </Container>
  );
};

export const LongButton = styled(Button)`
  width: 100%;
`;

const Title = styled.h2`
  color: rgb(94, 108, 132);
  font-size: 2.4rem;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`;

const Header = styled.div`
  background: url(${logo}) no-repeat center;
  background-size: 8rem;
  padding: 5rem 0;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  min-height: 100vh;
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 36rem;
  padding: 3.2rem 4rem;
  border-radius: 0.4rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;
