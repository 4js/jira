import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "util/index";
import styled from "@emotion/styled";
import { useProjects } from "util/project";
import { useUsers } from "util/user";
import { useProjectModal, useProjectParams } from "./util";
import { ProjectModal } from "./project-modal";
import { Button } from "antd";
import { Row } from "components/lib";

export const ProjectListScreen = () => {
  const { open } = useProjectModal();
  const { data: users } = useUsers();
  const [param, setParam] = useProjectParams();
  const { data: list, isLoading } = useProjects(useDebounce(param, 400));

  useDocumentTitle("项目列表");

  return (
    <Container>
      <Row between marginBottom={4}>
        <h2>项目列表</h2>
        <Button onClick={open}>新增项目</Button>
      </Row>
      <SearchPanel param={param} setParam={setParam} />
      <List
        loading={isLoading}
        dataSource={list || []}
        rowKey={"id"}
        users={users || []}
        // refresh={retry}
      />
      <ProjectModal />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
