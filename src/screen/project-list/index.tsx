import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useState } from "react";
import { useDebounce } from "util/index";
import styled from "@emotion/styled";
import { useProjects } from "util/project";
import { useUsers } from "util/user";

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 400);
  const { data: users } = useUsers();
  const { data: list, isLoading } = useProjects(debouncedParam);

  return (
    <Container>
      <h2>项目列表</h2>
      <SearchPanel param={param} users={users || []} setParam={setParam} />
      <List
        loading={isLoading}
        dataSource={list || []}
        rowKey={"id"}
        users={users || []}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
