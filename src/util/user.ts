import { User } from "screen/project-list/search-panel";
import { cleanObject, useMount } from "util/index";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useUsers = (params?: Partial<User>) => {
  const client = useHttp();
  const { run, ...results } = useAsync<User[]>();

  useMount(() => {
    run(client("users", { data: cleanObject(params || {}) }));
  });

  return results;
};
