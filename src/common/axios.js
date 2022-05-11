import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { setLoading } from "../redux/loading";
import store from "../redux/store";

export const loadingHandler = () => {
  const addRequestId = (config) => {
    const requestId = uuidv4();
    config.requestIds = config.requestIds || [];
    config.requestIds.push(requestId);
    //store.dispatch(setLoading(requestId));
    return config;
  };

  const deleteRequestId = (res) => {
    if (res.config.requestIds) {
      //store.dispatch(setLoading(""));
    }
    res.config.requestIds = [];
  };

  const deleteRequestIdsOnSuccess = (res) => {
    deleteRequestId(res);
    return res;
  };

  const deleteRequestIdsOnFailure = (res) => {
    deleteRequestId(res);
    return Promise.reject(res);
  };

  return { addRequestId, deleteRequestIdsOnSuccess, deleteRequestIdsOnFailure };
};

const axiosInstance = axios.create({
  baseURL: "",
  timeout: 60000,
  headers: {
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  loadingHandler().addRequestId,
  undefined
);

axiosInstance.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axiosInstance.defaults.headers.post["Access-Control-Allow-Methods"] = "*";
axiosInstance.defaults.headers.post["Access-Control-Allow-Headers"] = "*";

axiosInstance.interceptors.response.use(
  loadingHandler().deleteRequestIdsOnSuccess,
  loadingHandler().deleteRequestIdsOnFailure
);

export default axiosInstance;
