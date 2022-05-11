import React, { useContext } from "react";
import { AuthContext } from "../../hooks/with-auth";
import "./Admin.scss";
import { Layout } from "antd";
import { Link, useHistory } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import { URL_PAGE } from "../../common/constants";
import { storage } from "../../common/utils";
import { models, types } from "../../services";

export default function DashboardHeader() {
  const { Header } = Layout;
  const { state, dispatch } = useContext(AuthContext);
  const localStorage = storage();

  const {
    login: {
      userData: { username },
    },
  } = state;

  const history = useHistory();

  const logOut = async () => {
    await localStorage.removeToken();
    await dispatch({
      type: types.LOGIN,
      payload: models.login,
    });
    history.push(URL_PAGE.LOGIN);
  };

  return (
    <Header className="wrapper-header">
      <div className="header-logo">
        <Link className="backToHome" to="/#">
          <img
            className="img-logo"
            src="./img/duanmoi.png"
            width={243}
            height={44}
            alt=""
          />
        </Link>
      </div>
      <div className="header-user">
        <Link to={URL_PAGE.PROFILE}>
          <label className="user-name">{username}</label>
        </Link>

        <MdOutlineLogout
          onClick={logOut}
          style={{ fontSize: "30px", color: "#fff" }}
        />
      </div>
    </Header>
  );
}
