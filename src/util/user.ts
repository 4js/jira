import { QueryClient, useQuery } from "react-query";
import { User } from "screen/project-list/search-panel";
import { cleanObject, useMount } from "util/index";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useUsers = (params?: Partial<User>) => {
  const client = useHttp();
  // const queryClient = new QueryClient();
  // const { run, ...results } = useAsync<User[]>();

  // useMount(() => {
  //   console.log('----useMount------useMount')
  //   run(client("users", { data: cleanObject(params || {}) }));
  // });

  return useQuery<User[]>(["users", params], () =>
    client("users", { data: cleanObject(params || {}) })
  );
};
