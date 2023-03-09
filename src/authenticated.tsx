import styled from "@emotion/styled";
import { Row } from "components/lib";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screen/project-list";
import { ProjectScreen } from "screen/project";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Dropdown, Button, Popover, Typography, List } from "antd";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { useProjects } from "util/project";
import { onOpen } from "store/project-modal.slice";
import { useDispatch } from "react-redux";
import { useProjectModal } from "screen/project-list/util";

export const AuthenticatedApp = () => {
  return (
    <Container>
      <Router>
        <PageHeader />
        <Main>
          <Routes>
            <Route path={"/"} element={<Navigate to={"/projects"} />} />
            <Route path="/projects" element={<ProjectListScreen />}></Route>
            <Route
              path="/projects/:projectId/*"
              element={<ProjectScreen />}
            ></Route>
          </Routes>
        </Main>
      </Router>
    </Container>
  );
};

const PageHeader = () => {
  const resetRoute = () => (window.location.href = window.location.origin);
  return (
    <Header between>
      <HeaderLeft gap={2}>
        <Button type="link" onClick={resetRoute}>
          <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
        </Button>
        <ProjectPopover />
        <h3>logo</h3>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};

const ProjectPopover = () => {
  const { open } = useProjectModal();
  const { data: projects } = useProjects();
  return (
    <Popover
      content={
        <div>
          <Typography.Text>收藏项目</Typography.Text>
          <List>
            {projects?.map((project) => (
              <List.Item key={project.id}>
                <Button type="link">{project.name}</Button>
              </List.Item>
            ))}
          </List>
          <Typography.Text>其它操作</Typography.Text>
          <Button type="link" block onClick={() => open()}>
            创建项目
          </Button>
        </div>
      }
    >
      <span>项目</span>
    </Popover>
  );
};

const User = () => {
  const { user, logout } = useAuth();
  return (
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
