import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "util/index";
import styled from "@emotion/styled";
import { useProjects } from "util/project";
import { useUsers } from "util/user";
import { useProjectParams } from "./util";
import { ProjectModal } from "components/project-modal";
import { Button } from "antd";
import { onOpen } from "store/project-modal.slice";
import { useDispatch } from "react-redux";
import { Row } from "components/lib";

export const ProjectListScreen = () => {
  const dispatch = useDispatch();
  const [param, setParam] = useProjectParams();
  const { data: users } = useUsers();
  const { data: list, isLoading, retry } = useProjects(useDebounce(param, 400));

  useDocumentTitle("项目列表");

  return (
    <Container>
      <Row between marginBottom={4}>
        <h2>项目列表</h2>
        <Button onClick={() => dispatch(onOpen())}>新增项目</Button>
      </Row>
      <SearchPanel param={param} users={users || []} setParam={setParam} />
      <List
        loading={isLoading}
        dataSource={list || []}
        rowKey={"id"}
        users={users || []}
        refresh={() => retry()}
      />
      <ProjectModal />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
