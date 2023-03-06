import { useCallback, useMemo } from "react";
import { useUrlQueryParam } from "util/url";

export const useProjectParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);

  const open = useCallback(
    () => setProjectCreate({ projectCreate: true }),
    [setProjectCreate]
  );
  const close = useCallback(
    () => setProjectCreate({ projectCreate: false }),
    [setProjectCreate]
  );
  return [projectCreate === "true", open, close] as const;
};
