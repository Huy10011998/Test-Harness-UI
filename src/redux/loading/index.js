import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    requestId: "",
  },
  reducers: {
    setLoading: (state, action) => {
      return {
        ...state,
        requestId: action.payload,
      };
    },
  },
});

export const getLoading = (state) => state.loading;

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
