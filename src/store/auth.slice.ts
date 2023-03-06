import { AppDispatch, RootState } from "./index";
import { User } from "../screen/project-list/search-panel";
import { createSlice } from "@reduxjs/toolkit";
import { bootstrapUser } from "context/auth-context";

export interface State {
  user: User | null;
}

const initialState: State = {
  user: null,
};

export const authSlice = createSlice({
  name: "projectModalSlice",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;
export const bootstrap = () => (dispatch: AppDispatch) =>
  bootstrapUser().then((user) => dispatch(setUser(user)));

export default authSlice.reducer;
