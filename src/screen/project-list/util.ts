import { useCallback, useMemo } from "react";
import { useProject } from "util/project";
import { useSetUrlSearchParam, useUrlQueryParam } from "util/url";

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
  // const setUrlParams = useSetUrlSearchParam();
  const [{ projectCreate, editingProjectId }, setProjectModalParam] =
    useUrlQueryParam(["projectCreate", "editingProjectId"]);

  // const [{ editingProjectId }, setEitingProjectId] = useUrlQueryParam([
  //   "editingProjectId",
  // ]);

  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );

  const open = useCallback(
    () => setProjectModalParam({ projectCreate: true }),
    [setProjectModalParam]
  );
  const close = useCallback(() => {
    setProjectModalParam({
      projectCreate: undefined,
      editingProjectId: undefined,
    });
    // setEitingProjectId({ editingProjectId: undefined });
  }, [setProjectModalParam]);
  // const close = useCallback(
  //   () => setUrlParams({projectCreate: '', editingProjectId: '' }),
  //   [setUrlParams]
  // );
  const startEdit = useCallback(
    (id: number) => {
      setProjectModalParam({ editingProjectId: id });
    },
    [setProjectModalParam]
  );

  return {
    isModalOpen: projectCreate === "true" || Boolean(editingProjectId),
    editingProject,
    open,
    close,
    startEdit,
  };
};
