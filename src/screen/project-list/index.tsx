import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "util/index";
import styled from "@emotion/styled";
import { useProjects } from "util/project";
import { useUsers } from "util/user";
import { useProjectParams } from "./util";

export const ProjectListScreen = () => {
  const [param, setParam] = useProjectParams();
  const { data: users } = useUsers();
  const { data: list, isLoading, retry } = useProjects(useDebounce(param, 400));

  useDocumentTitle("项目列表");

  return (
    <Container>
      <h2>项目列表</h2>
      <SearchPanel param={param} users={users || []} setParam={setParam} />
      <List
        loading={isLoading}
        dataSource={list || []}
        rowKey={"id"}
        users={users || []}
        refresh={() => retry()}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
