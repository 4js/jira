import { QueryClient, useMutation, useQuery } from "react-query";
import { useCallback, useEffect } from "react";
import { Project } from "screen/project-list/list";
import { cleanObject } from "util/index";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  // const { run, ...results } = useAsync<Project[]>();
  // const fetchProjects = useCallback(
  //   () => client("projects", { data: cleanObject(params||{}) }),
  //   [client, params]
  // );

  // useEffect(() => {
  //   run(fetchProjects(), {
  //     retry: fetchProjects,
  //   });
  // }, [fetchProjects, run]);

  return useQuery<Project[], Error>(["projects", param], () =>
    client("projects", { data: cleanObject(param || {}) })
  );
};

export const useEditProject = () => {
  const client = useHttp();
  const queryClient = new QueryClient();
  // const { run, ...asyncResult } = useAsync();
  // const mutate = (params: Partial<Project>) => {
  //   return run(
  //     client(`projects/${params.id}`, {
  //       method: "PATCH",
  //       data: params,
  //     })
  //   );
  // };

  // return {
  //   mutate,
  //   ...asyncResult,
  // } as const;

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

export const useAddProject = () => {
  // const { run, ...asyncResult } = useAsync()
  const client = useHttp();
  const queryClient = new QueryClient();
  // const mutate = (params: Partial<Project>) => {
  //     return run(
  //         client(`projects`, {
  //             method: 'POST',
  //             data: params,
  //         })
  //     )
  // }

  // return {
  //     mutate,
  //     ...asyncResult,
  // } as const
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        method: "POST",
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

export const useProject = (id: number) => {
  // console.log('useproject', id);
  // const { run, setData, ...asyncResult } = useAsync()
  const client = useHttp();
  // const mutate = useCallback(() => {
  //   run(
  //     client(`projects/${id}`)
  //   );
  // }, [client, id, run]);

  // useEffect(() => {
  //     if (id) {
  //         run(client(`projects/${id}`))
  //     } else {
  //         setData(null)
  //     }
  // }, [id])

  // return {
  //     // mutate,
  //     ...asyncResult,
  // }
  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      enabled: Boolean(id),
    }
  );
};
