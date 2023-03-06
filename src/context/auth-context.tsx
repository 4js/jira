import React, { ReactNode, useCallback } from "react";
import * as auth from "auth-provider";
import { User } from "screen/project-list/search-panel";
import { http } from "util/http";
import { useMount } from "util/index";
import { useAsync } from "util/use-async";
import { useDispatch, useSelector } from "react-redux";
import { setUser, selectUser, bootstrap } from "store/auth.slice";
import { AppDispatch } from "store";

interface AuthForm {
  username: string;
  password: string;
}

export const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

// const AuthContext = React.createContext<
//   | {
//       user: User | null;
//       login: (form: AuthForm) => Promise<void>;
//       register: (form: AuthForm) => Promise<void>;
//       logout: () => Promise<void>;
//     }
//   | undefined
// >(undefined);
// AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { run, isIddle, isLoading, isError, error } = useAsync<User | null>();
  // const login = (form: AuthForm) => auth.login(form).then(setUser);
  // const register = (form: AuthForm) => auth.register(form).then(setUser);
  // const logout = () => auth.logout().then(() => setUser(null));

  // anyscript
  const dispatch: (...args: any[]) => Promise<User> = useDispatch();

  useMount(() => {
    run(dispatch(bootstrap()));
  });

  if (isIddle || isLoading) {
    return <p>loading...</p>;
  }

  if (isError) {
    return <p>{error?.message}</p>;
  }

  return <div>{children}</div>;
};

export const useAuth = () => {
  // const context = React.useContext(AuthContext);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const login = useCallback(
    (form: AuthForm) =>
      auth.login(form).then((user) => dispatch(setUser(user))),
    [dispatch]
  );
  const register = useCallback(
    (form: AuthForm) =>
      auth.register(form).then((user) => dispatch(setUser(user))),
    [dispatch]
  );
  const logout = useCallback(
    () => auth.logout().then(() => dispatch(setUser(null))),
    [dispatch]
  );
  // const bootstrap = () => bootstrapUser().then(user => dispatch(setUser(user)))
  // if (!context) {
  //   throw new Error("useAuth必须在AuthProvider中使用");
  // }

  return { user, login, register, logout };
};
