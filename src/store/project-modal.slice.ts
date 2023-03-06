import { createSlice } from "@reduxjs/toolkit";

export interface State {
  isModalOpen: boolean;
}

const initialState: State = {
  isModalOpen: false,
};

export const projectModalSlice = createSlice({
  name: "projectModalSlice",
  initialState,
  reducers: {
    onOpen(state) {
      console.log("open");
      state.isModalOpen = true;
    },
    onClose(state) {
      console.log("close");
      state.isModalOpen = false;
    },
  },
});

export const { onOpen, onClose } = projectModalSlice.actions;

export default projectModalSlice.reducer;
