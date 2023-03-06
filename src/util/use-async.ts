import { useCallback, useState } from "react";
import { useMountedRef } from "util/index";
interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "iddle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  stat: "iddle",
  data: null,
  error: null,
};

const defaultConfig = {
  throwError: false,
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, setState] = useState({
    ...defaultInitialState,
    ...initialState,
  });
  const [retry, setRetry] = useState(() => () => {});
  const mountedRef = useMountedRef();

  const setData = useCallback(
    (data: D) =>
      setState({
        data,
        stat: "success",
        error: null,
      }),
    []
  );

  const setError = useCallback(
    (error: Error) =>
      setState({
        error,
        data: null,
        stat: "error",
      }),
    []
  );

  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入Promise类型数据");
      }

      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig);
        }
      });

      setState((prevState) => ({ ...prevState, stat: "loading" }));

      return promise
        .then((data) => {
          // 组件卸载时候就不要回填数据了
          if (mountedRef.current) setData(data);
          return data;
        })
        .catch((error) => {
          setError(error);
          if (config.throwError) return Promise.reject(error);
          return error;
        });
    },
    [config.throwError, mountedRef, setData, setError]
  );

  return {
    isIddle: state.stat === "iddle",
    isError: state.stat === "error",
    isLoading: state.stat === "loading",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    retry,
    ...state,
  };
};
