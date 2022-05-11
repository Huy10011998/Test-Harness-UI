import { ACTIONS as types } from "./actions";
import { storage } from "../common/utils";

const rootReducer = (state, action) => {
  let newState = {};
  switch (action.type) {
    case types.LOGIN: {
      const { token } = action.payload;
      const localStorage = storage();
      localStorage.setToken(token);
      newState = {
        ...state,
        login: action.payload,
      };
      break;
    }
    case types.GET_PACKAGE: {
      newState = {
        ...state,
        package: action.payload,
      };
      break;
    }
    case types.GET_ONE: {
      newState = {
        ...state,
        one: action.payload,
      };
      break;
    }
    default:
      throw new Error("Invalid type");
  }

  return newState;
};

export default rootReducer;
