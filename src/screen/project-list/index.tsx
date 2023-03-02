import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import { cleanObject, useDebounce, useMount } from "util/index";
import { useHttp } from "util/http";
import styled from "@emotion/styled";

export const ProjectListScreen = () => {
  const client = useHttp();
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 800);

  useMount(() => {
    client("users").then(setUsers);
  });

  useEffect(() => {
    client("projects", { data: cleanObject(debouncedParam) }).then(setList);
  }, [debouncedParam]);

  return (
    <Container>
      <h2>项目列表</h2>
      <SearchPanel param={param} users={users} setParam={setParam} />
      <List list={list} users={users} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
