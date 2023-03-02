import styled from "@emotion/styled";
import { Row } from "components/lib";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screen/project-list";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Dropdown, Button } from "antd";

export const AuthenticatedApp = () => {
  const { user, logout } = useAuth();

  return (
    <Container>
      <Header between>
        <HeaderLeft gap={2}>
          <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
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
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
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
