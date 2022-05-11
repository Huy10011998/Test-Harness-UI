import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./loading";
import updatePackageReducer from "./update-package";

export default configureStore({
  reducer: {
    loading: loadingReducer,
    updatePackage: updatePackageReducer,
  },
});
