import React, { useEffect, useReducer, useMemo } from "react";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { Loading } from "../components/loading";
import { getLoading } from "../redux/loading";
import { models, reducers } from "../services";
import { storage } from "../common/utils";
import { types } from "../services";

export const initReducerState = {
  login: models.login,
  package: models.package,
  one: models.one,
};

const AuthContext = React.createContext("");

const AuthProvider = (props) => {
  const localStorage = storage();
  const loading = useSelector(getLoading).requestId;

  const [state, dispatch] = useReducer(reducers, initReducerState);

  const isLoading = useMemo(() => {
    if (loading) {
      return true;
    }
    return false;
  }, [loading]);

  // enter while first loaded
  useEffect(() => {
    const token = localStorage.getToken();
    if (token) {
      localStorage.setTokenIntoHeaders(token);
      const decode = jwt_decode(token);
      dispatch({
        type: types.LOGIN,
        payload: {
          token: token,
          userData: decode,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // enter while logged successfully
  useEffect(() => {
    const {
      login: { token },
    } = state;
    if (token) {
      localStorage.setTokenIntoHeaders(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.login]);

  return (
    <AuthContext.Provider
      value={{
        dispatch,
        state,
      }}
    >
      {isLoading ? <Loading /> : <></>}
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
