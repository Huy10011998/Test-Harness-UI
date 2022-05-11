import React, { useState, useContext, useLayoutEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { ErrorMessage } from "../../components/error-message";
import { AuthContext } from "../../hooks/with-auth";
import { useRouter } from "../../hooks/use-router";
import { URL_PAGE } from "../../common/constants";
import * as session from "../../common/utils";
import axios from "../../common/axios";
import { types } from "../../services";
import "./styles.css";

const initData = {
  email: "",
  password: "",
};

export const Login = () => {
  const { history } = useRouter();
  const { dispatch } = useContext(AuthContext);
  const [{ email, password }, setInputParams] = useState(initData);
  const [errorMessage, setErrorMessage] = useState("");
  const token = session.storage().getToken();

  useLayoutEffect(() => {
    if (token) {
      history.push(URL_PAGE.DASHBOARD);
    }
  }, []);

  const onLogin = async ({ email = "", password = "" }) => {
    return new Promise((resolve, reject) => {
      axios
        .post("http://stageapi.test-harness.io/user/login", {
          email,
          password,
        })
        .then((res) => resolve(res))
        .catch((error) => {
          reject(error);
        });
    });
  };

  const handleOnLogin = () => {
    setErrorMessage("");
    const _e = email;
    const _p = password;
    const res = onLogin({
      email: _e,
      password: _p,
    });
    res
      .then((rs) => {
        setErrorMessage("");
        const { data } = rs;
        return data;
      })
      .then((data) => {
        const { token } = data;
        session.storage().setToken(data.token);
        if (token) {
          const decode = jwt_decode(token);
          dispatch({
            type: types.LOGIN,
            payload: {
              token: token,
              userData: decode,
            },
          });
          // redirect to dashboard after logged successfully.
          history.push(URL_PAGE.DASHBOARD);
        }
      })
      .catch((error) => {
        if (error?.response?.status === 304) {
          setErrorMessage("Email or password is incorrect.");
        }
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputParams((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <React.Fragment>
      <div className="container-login">
        <div className="container-card">
          <div className="height-header-login">
            <Link to={URL_PAGE.HOME} className="header-login">
              <FiArrowLeft className="iconBack-login" />
            </Link>
          </div>
          <div className="line-login"></div>
          <div className="content-login">
            <div className="intro-login">
              <div className="text-Sign">
                <h3>Sign In</h3>
                <div className="text-acc">No account Yet?</div>
                <Link to={URL_PAGE.REGISTER}>
                  <button type="submit" className="btn-custom-login">
                    Sign Up Here
                  </button>
                </Link>
              </div>
            </div>
            <div className="intro-input-login">
              <div _ngcontent-nyb-c112="" className="auth-form__logo">
                <Link _ngcontent-nyb-c112="" to="/" title="Back to Home">
                  <img
                    _ngcontent-nyb-c112=""
                    alt=""
                    className="width-img"
                    src="../img/duanmoi.png"
                  />
                </Link>
              </div>
              <div className="input-login">
                <input
                  name="email"
                  type="text"
                  placeholder="Email address"
                  className="style-input pd-bottom"
                  value={email}
                  onChange={handleChange}
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="style-input"
                  value={password}
                  onChange={handleChange}
                />
              </div>
              <ErrorMessage message={errorMessage} />
              <div className="style-forgot">
                <Link to={URL_PAGE.FORGOT}>Forgot Password?</Link>
              </div>
              <button
                onClick={handleOnLogin}
                type="submit"
                className="btn-custom-login-1"
              >
                Log In
              </button>
              <Link to={URL_PAGE.REGISTER}>
                <button type="submit" className="btn-custom-login-media">
                  Sign Up Here
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
