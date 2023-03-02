import { useState } from "react";
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

  const setData = (data: D) =>
    setState({
      data,
      stat: "success",
      error: null,
    });

  const setError = (error: Error) =>
    setState({
      error,
      data: null,
      stat: "error",
    });

  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error("请传入Promise类型数据");
    }
    setState({ ...state, stat: "loading" });

    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        setError(error);
        if (config.throwError) return Promise.reject(error);
        return error;
      });
  };

  return {
    isIddle: state.stat === "iddle",
    isError: state.stat === "error",
    isLoading: state.stat === "loading",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    ...state,
  };
};
