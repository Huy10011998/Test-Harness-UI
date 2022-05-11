import "./styles.css";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import React, { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import { ErrorMessage } from "../../components/error-message";
import { SuccessMessage } from "../../components/success-message";
import { useRouter } from "../../hooks/use-router";
import { URL_PAGE } from "../../common/constants";
export const Forgot = () => {
  const { history } = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isCode, setIsCode] = useState(false);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [repeatpassword, setRepeatPassword] = useState("");
  const onForgot = async () => {
    const data = {
      email,
    };
    return new Promise((resolve, reject) => {
      axios
        .post("http://stageapi.test-harness.io/user/forgotPassword", data)
        .then((res) => resolve(res))
        .catch((error) => {
          reject(error);
        });
    });
  };

  const handleonForgot = () => {
    if (email == "") {
      setErrorMessage("Email is Required Field");
    } else {
      setErrorMessage("");
      const res = onForgot();
      res
        .then((rs) => {
          setErrorMessage("");
          const { data } = rs;
          return data;
        })
        .then((data) => {
          const { status, message } = data;
          if (status === "success") {
            setEmail(email);
            setSuccessMessage(message);
            setTimeout(() => {
              setIsCode(true);
              setSuccessMessage("");
            }, 2000);
            res.then((rs) => {
              const { data } = rs;
              return data;
            });
          }
        })
        .catch((error) => {
          if (error.response.status === 500) {
            const { message } = error.response.data;
            setErrorMessage(message);
          }
        });
    }
  };

  const onReset = async () => {
    const data = {
      email,
      code,
      password,
      repeatpassword,
    };
    return new Promise((resolve, reject) => {
      axios
        .post("http://stageapi.test-harness.io/user/reset", data)
        .then((res) => resolve(res))
        .catch((error) => {
          reject(error);
        });
    });
  };

  const handonResetPass = () => {
    if (password.length < 8) {
      setErrorMessage("Password minimum 8 characters required");
    } else {
      setErrorMessage("");
      const res = onReset();
      res
        .then((rs) => {
          setErrorMessage("");
          const { data } = rs;
          return data;
        })
        .then((data) => {
          const { status, url } = data;
          if (status === "success") {
            setSuccessMessage("Reset Password Successful!");
            setTimeout(() => {
              history.push(URL_PAGE.LOGIN);
            }, 2000);
            res.then((rs) => {
              const { data } = rs;
              return data;
            });
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            const { message } = error.response.data;
            setErrorMessage(message);
          }
        });
    }
  };

  return (
    <React.Fragment>
      <div className="container-login">
        <div className="container-card">
          <div className="height-header-login">
            <Link to={URL_PAGE.LOGIN} className="header-login">
              <FiArrowLeft className="iconBack-login" />
            </Link>
          </div>
          <div className="line-login"></div>

          <div className="content-login">
            <div className="intro-login">
              <div className="text-Sign">
                <h3>Forgotten Password</h3>
                <div className="text-acc">No account Yet?</div>
                <Link to={URL_PAGE.REGISTER}>
                  <button type="submit" className="btn-custom-forgot">
                    Sign Up Here
                  </button>
                </Link>
              </div>
            </div>
            <div className="intro-input-login">
              <div _ngcontent-nyb-c112="" className="auth-form__logo">
                <Link
                  _ngcontent-nyb-c112=""
                  to={URL_PAGE.HOME}
                  title="Back to Home"
                >
                  <img
                    _ngcontent-nyb-c112=""
                    alt=""
                    src="./img/logo-top.png"
                    className="width-img"
                  />
                </Link>
              </div>
              <div>
                {!isCode ? (
                  <div>
                    <div className="sub-title">
                      Enter your email address and we’ll send a link to reset
                      your password
                    </div>
                    <div className="input-login">
                      <input
                        type="text"
                        placeholder="Email address"
                        className="style-input pd-bottom"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="sub-title">
                      We need to confirm that you authorized changes to your
                      account
                    </div>
                    <div className="input-login">
                      <input
                        type="text"
                        placeholder="Code"
                        className="style-input pd-bottom"
                        onChange={(e) => setCode(e.target.value)}
                        value={code}
                      />
                    </div>
                    <div>
                      <div className="input-login">
                        <input
                          type="password"
                          placeholder="New Password"
                          className="style-input pd-bottom"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="input-login">
                        <input
                          type="password"
                          placeholder="Confirm New Password"
                          className="style-input pd-bottom"
                          onChange={(e) => setRepeatPassword(e.target.value)}
                          value={repeatpassword}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <SuccessMessage message={successMessage} />
                <ErrorMessage message={errorMessage} />
                {!isCode ? (
                  <button
                    type="submit"
                    className="btn-custom-forgot1"
                    onClick={() => {
                      handleonForgot();
                    }}
                  >
                    Request Password
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn-custom-forgot1"
                    onClick={() => {
                      handonResetPass();
                    }}
                  >
                    Reset Password
                  </button>
                )}
              </div>
              <div className="login-line">
                <div className="text-acc-signup">Already have an account?</div>
                <Link to={URL_PAGE.LOGIN}>Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
