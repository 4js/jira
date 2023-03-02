import { useEffect } from "react";
import { Project } from "screen/project-list/list";
import { cleanObject } from "util/index";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProjects = (params: Partial<Project>) => {
  const client = useHttp();
  const { run, ...results } = useAsync<Project[]>();

  useEffect(() => {
    run(client("projects", { data: cleanObject(params) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return results;
};
