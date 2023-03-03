import styled from "@emotion/styled";
import { Row } from "components/lib";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screen/project-list";
import { ProjectScreen } from "screen/project";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Dropdown, Button } from "antd";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";

export const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader />
      <Main>
        <Router>
          <Routes>
            <Route path={"/"} element={<Navigate to={"/projects"} />} />
            <Route path="/projects" element={<ProjectListScreen />}></Route>
            <Route
              path="/projects/:projectId/*"
              element={<ProjectScreen />}
            ></Route>
          </Routes>
        </Router>
      </Main>
    </Container>
  );
};

const PageHeader = () => {
  const { user, logout } = useAuth();
  const resetRoute = () => (window.location.href = window.location.origin);
  return (
    <Header between>
      <HeaderLeft gap={2}>
        <Button type="link" onClick={resetRoute}>
          <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
        </Button>
        <h3>logo</h3>
        <h3>logo</h3>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          menu={{
            items: [
              {
                key: "1",
                label: (
                  <Button type="link" onClick={logout}>
                    退出登录
                  </Button>
                ),
              },
            ],
          }}
        >
          <Button type="link" onClick={(e) => e.preventDefault()}>
            {user ? `hi,${user.name}` : ""}
          </Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
`;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;

const Main = styled.div`
  height: calc(100vh - 6rem);
`;
