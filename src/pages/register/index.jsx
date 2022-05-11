import React, { useEffect, useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ErrorMessage } from "../../components/error-message";
import { useQueryParams } from "../../hooks/use-query-params";
import { Loading } from "../../components/loading";
import { useRouter } from "../../hooks/use-router";
import { URL_PAGE } from "../../common/constants";
import { storage } from "../../common/utils";
import "./styles.css";

const initData = {
  firstName: "",
  lastName: "",
  companyName: "",
  companySize: "",
  jobTitle: "",
  workEmail: "",
  phoneNumber: "",
  password: "",
  packageValue: "",
};

const convertResToDropdown = (data = []) => {
  return data.map((i) => ({
    label: i.name,
    price: i.price,
    type: i.type,
    value: i._id,
  }));
};

export const Register = (props) => {
  const params = useQueryParams();
  const { history } = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [packageDropdown, setPackageDropdown] = useState([]);

  const localStorage = storage();

  const [
    {
      firstName,
      lastName,
      companyName,
      companySize,
      jobTitle,
      workEmail,
      password,
      phoneNumber,
      packageValue,
    },
    setInputParams,
  ] = useState(initData);

  useLayoutEffect(() => {
    if (localStorage.getToken()) {
      history.push(URL_PAGE.DASHBOARD);
    }
  }, []);

  const getPackage = async () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://stageapi.test-harness.io/package")
        .then((res) => resolve(res))
        .catch((error) => {
          reject(error);
        });
    });
  };

  useEffect(() => {
    getPackage()
      .then((res) => {
        const { data } = res;
        return data;
      })
      .then((result) => {
        const { data } = result;
        if (Array.isArray(data) && data.length > 0) {
          const dropdown = convertResToDropdown(data);
          const packageId = params?.package;
          setPackageDropdown(dropdown);
          setInputParams((prev) => ({
            ...prev,
            packageValue:
              dropdown.find((i) => i.value === packageId)?.value ||
              dropdown[0].value,
          }));
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const onRegister = async () => {
    return new Promise((resolve, reject) => {
      axios
        .post("http://stageapi.test-harness.io/user/register", {
          firstname: firstName,
          lastname: lastName,
          companyname: companyName,
          companysize: +companySize,
          jobtitle: jobTitle,
          workemail: workEmail,
          phonenumber: phoneNumber,
          password,
          packageId: packageValue,
          returnUrl: "http://stage.test-harness.io/dashboard",
        })
        .then((res) => resolve(res))
        .catch((error) => {
          reject(error);
        });
    });
  };

  const handleOnSignUp = () => {
    setIsLoading(true);
    setErrorMessage("");
    const res = onRegister();
    res
      .then((rs) => {
        setErrorMessage("");
        setIsLoading(false);
        const { data } = rs;
        return data;
      })
      .then((data) => {
        const { status, url } = data;
        if (status === "success") {
          const res = onLogin({
            email: workEmail,
            password: password,
          });
          res
            .then((rs) => {
              const { data } = rs;
              return data;
            })
            .then((data) => {
              const { token } = data;
              if (token) {
                const localStorage = storage();
                localStorage.setItems(token);
              }
            });
          // redirect to billing page after sign up successfully.
          window.location.href = url;
        }
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response.status === 400) {
          const { message } = error.response.data;
          setErrorMessage(message || "");
        }
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputParams((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <React.Fragment>
      {isLoading ? <Loading /> : <React.Fragment />}
      <div className="container-signup">
        <div className="container-card-signup">
          <div className="content-signup">
            <div className="intro-signup">
              <div className="text-signup">
                <h3>Sign Up</h3>
                <div className="login-line">
                  <div className="text-acc-signup">
                    Already have an account?
                  </div>
                  <Link to={URL_PAGE.LOGIN}>Login</Link>
                </div>
              </div>
            </div>

            <div className="intro-input-login">
              <div _ngcontent-nyb-c112="" className="auth-form__logo">
                <Link _ngcontent-nyb-c112="" to="/" title="Back to Home">
                  <img
                    _ngcontent-nyb-c112=""
                    alt=""
                    src="../img/duanmoi.png"
                    className="img-signup"
                  />
                </Link>
              </div>
              <form
                className="ng-untouched ng-pristine ng-invalid"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="row">
                  <div className="col-xs-12 col-sm-6">
                    <div className="field">
                      <label>First Name</label>
                      <input
                        name="firstName"
                        formcontrolname="firstName"
                        className="ng-untouched ng-pristine ng-invalid"
                        value={firstName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-6">
                    <div className="field">
                      <label>Last Name</label>
                      <input
                        name="lastName"
                        formcontrolname="lastName"
                        className="ng-untouched ng-pristine ng-invalid"
                        value={lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-6">
                    <div className="field">
                      <label>Company Name</label>
                      <input
                        name="companyName"
                        formcontrolname="companyName"
                        className="ng-untouched ng-pristine ng-invalid"
                        value={companyName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-6">
                    <div className="field">
                      <label>Company Size</label>
                      <select
                        name="companySize"
                        formcontrolname="companySize"
                        className="ng-untouched ng-pristine ng-invalid"
                        value={companySize}
                        onChange={handleChange}
                      >
                        <option value="1">1 to 9 employees</option>
                        <option value="2">10 to 49 employees</option>
                        <option value="3">50 to 249 employees</option>
                        <option value="4">250 or more employees</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-6">
                    <div className="field">
                      <label>Job Title</label>
                      <input
                        name="jobTitle"
                        formcontrolname="jobTitle"
                        className="ng-untouched ng-pristine ng-valid"
                        value={jobTitle}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-6">
                    <div className="field">
                      <label>Phone Number</label>
                      <input
                        name="phoneNumber"
                        formcontrolname="phone"
                        className="ng-untouched ng-pristine ng-valid"
                        value={phoneNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-6">
                    <div className="field">
                      <label>Work Email</label>
                      <input
                        name="workEmail"
                        formcontrolname="email"
                        className="ng-untouched ng-pristine ng-invalid"
                        value={workEmail}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-6">
                    <div className="field">
                      <label>Confirm Email</label>
                      <input
                        formcontrolname="confirmEmail"
                        className="ng-untouched ng-pristine ng-invalid"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12 col-sm-6">
                    <div className="field">
                      <label>Password</label>
                      <input
                        name="password"
                        type="password"
                        formcontrolname="password"
                        className="ng-untouched ng-pristine ng-invalid"
                        value={password}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-6">
                    <div className="field">
                      <label>Confirm Password</label>
                      <input
                        type="password"
                        formcontrolname="confirmPassword"
                        className="ng-untouched ng-pristine ng-invalid"
                      />
                    </div>
                  </div>
                </div>
                <div className="field">
                  <label>Selected Package</label>
                  <select
                    name="packageValue"
                    formcontrolname="subscriptionPackageId"
                    className="ng-untouched ng-pristine ng-invalid"
                    value={packageValue}
                    onChange={handleChange}
                  >
                    {packageDropdown.map((i, index) => (
                      <option key={`${i.label}-${index}`} value={i.value}>
                        {i.label} - £{i.price} / {i.type}
                      </option>
                    ))}
                  </select>
                </div>
                <ErrorMessage message={errorMessage} />
                <div className="footer">
                  <button
                    type="submit"
                    onClick={handleOnSignUp}
                    className="btn-custom-signup"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
