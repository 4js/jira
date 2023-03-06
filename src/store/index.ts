import { authSlice } from "./auth.slice";
import { projectModalSlice } from "./project-modal.slice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    projectModal: projectModalSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
