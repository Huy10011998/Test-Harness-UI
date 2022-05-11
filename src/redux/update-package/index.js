import { createSlice } from "@reduxjs/toolkit";

export const updatePackageSlice = createSlice({
  name: "updatePackage",
  initialState: {
    success: "",
  },
  reducers: {
    updatePackage: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const getUpdatePackageResponse = (state) => state.updatePackage;

export const { updatePackage } = updatePackageSlice.actions;

export default updatePackageSlice.reducer;
