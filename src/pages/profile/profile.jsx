import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  updatePackage,
  getUpdatePackageResponse,
} from "../../redux/update-package";
import AdminLayout from "../../components/AdminLayout/AdminLayout";
import { ErrorMessage } from "../../components/error-message";
import { AuthContext } from "../../hooks/with-auth";
import { useRouter } from "../../hooks/use-router";
import axios from "../../common/axios";
import { types } from "../../services";
import "./profile.scss";

const Profile = () => {
  const reducerDispatch = useDispatch();
  const { state, dispatch } = useContext(AuthContext);
  const updatePackageResponse = useSelector(getUpdatePackageResponse);
  const setUpdatePackage = (request) => reducerDispatch(updatePackage(request));
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [packageSelected, setPackageSelected] = useState("");
  const [clickCancel, setClickCancel] = useState(true);
  const [role, setRole] = useState("");

  useEffect(() => {
    axios.get(`http://stageapi.test-harness.io/user/getOne`).then((res) => {
      const data = res.data;
      dispatch({
        type: types.GET_ONE,
        payload: data,
      });
      setData({ ...data });
      setFirstName(data.getU.firstname);
      setLastName(data.getU.lastname);
      setRole(data.role);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onGetPackage = () => {
    if (Array.isArray(state.package.data) && state.package.data.length > 0) {
      dispatch({
        type: types.GET_PACKAGE,
        payload: {
          ...state.package,
          status: "success",
        },
      });
    } else {
      axios
        .get("http://stageapi.test-harness.io/package/get")
        .then((res) => res.data)
        .then((res) => {
          dispatch({
            type: types.GET_PACKAGE,
            payload: res,
          });
        });
    }
  };

  const onUpdateProfile = async () => {
    return new Promise((resolve, reject) => {
      axios
        .post(`http://stageapi.test-harness.io/user/update`, {
          firstname: firstName,
          lastname: lastName,
          password: password,
          repeatpassword: repeatPassword,
        })
        .then((res) => resolve(res))
        .catch((error) => {
          reject(error);
        });
    });
  };

  const handleOnUpdateProfile = () => {
    const res = onUpdateProfile();
    res
      .then((rs) => {
        const { data } = rs;
        return data;
      })
      .then((data) => {
        const { status } = data;
        if (status === "success") {
          toast.success("Updated!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          setPassword("");
          setRepeatPassword("");
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          const { message } = error.response.data;
          toast.error(message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }
      });
  };

  const handleCancelSubscription = () => {
    dispatch({
      type: types.GET_PACKAGE,
      payload: {
        ...state.package,
        status: "",
      },
    });
    setPackageSelected("");
  };

  const handleSelectPackage = (currentItem) => {
    setPackageSelected(currentItem._id);
  };

  const handleUpdatePackage = () => {
    if (state.one.role === "trial") {
      axios
        .post("http://stageapi.test-harness.io/subscription/create", {
          packageId: packageSelected,
        })
        .then((res) => res.data)
        .then((data) => {
          const { status, message, url } = data;
          if (status === "update method") {
            toast.success("Update your package successfully!", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              window.location.href = url;
            }, 2000);
          } else if (status === "success") {
            toast.success("Update your package successfully!", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
          }
        });
    } else {
      axios
        .post("http://stageapi.test-harness.io/subscription/update", {
          packageId: packageSelected,
        })
        .then((res) => res.data)
        .then((res) => {
          toast.success("Update your package successfully!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          onGetPackage();
          updatePackage(res);
        });
    }
  };

  const renderPackage = () => {
    return state.package.data.map((item) => {
      return (
        <div
          _ngcontent-reo-c127=""
          className={`package ${
            item._id === packageSelected ? "current" : ""
          } ${
            item.code === state.one.role ? "your-package" : ""
          } package__container ng-star-inserted`}
          key={`${item._id}`}
          onClick={() => handleSelectPackage(item)}
        >
          <div _ngcontent-reo-c127="" className="ng-star-inserted">
            <label _ngcontent-reo-c127="">{item.name}</label>
            <div _ngcontent-reo-c127="">£{item.price} / month</div>
            {item.code === state.one.role ? (
              <div
                _ngcontent-reo-c127=""
                className="text-success ng-star-inserted"
              >
                Your Current Package
              </div>
            ) : (
              <></>
            )}
            <div _ngcontent-reo-c127="">
              <ul>
                {item.data.map((a, index) => (
                  <li
                    className="package-item-content"
                    key={`${a._id}-${index}`}
                  >
                    {a.value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
    });
  };

  const onClickCancel = () => {
    setClickCancel(!clickCancel);
  };

  return (
    <AdminLayout>
      {/* {isLoading ? <Loading /> : <React.Fragment />} */}
      <div className="content-first">
        <div className="profile-title">
          <h5>Your Profile</h5>
        </div>
        <div className="row">
          <div className="col-xl-6 col-md-6 col-lg-6 col-sm-12 col-xs-12 first-name">
            <label className="custom-label" htmlFor="">
              FIRST NAME
            </label>
            <input
              className="custom-input"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="col-xl-6 col-md-6 col-lg-6 col-sm-12 col-xs-12 last-name">
            <label className="custom-label" htmlFor="">
              LAST NAME
            </label>
            <input
              className="custom-input"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="col-xl-6 col-md-6 col-lg-6 col-sm-12 col-xs-12 password">
            <label className="custom-label" htmlFor="">
              PASSWORD
            </label>
            <input
              className="custom-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="col-xl-6 col-md-6 col-lg-6 col-sm-12 col-xs-12 confirm-password">
            <label className="custom-label" htmlFor="">
              CONFIRM PASSWORD
            </label>
            <input
              className="custom-input"
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>

          <div className="update-button">
            <button className="btn btn-update" onClick={handleOnUpdateProfile}>
              UPDATE PROFILE
            </button>
          </div>
        </div>
      </div>
      <div className="content-second">
        <div className="profile-title-status">
          <h5>Your Subscription</h5>
        </div>
        <div className="profile-sub-status">
          You are currently subscribed to the Entrepreneur package .Your next
          billing date is on 22/01/2022
        </div>
        {clickCancel === false ? (
          <p className="profile-cancel-status">
            {" "}
            This will end your subscription on 22/02/2022, but you'll be able to
            reverse the cancellation anytime before that. Are you sure you want
            to move on?{" "}
          </p>
        ) : (
          <React.Fragment />
        )}

        {state.package.status !== "success" ? (
          <div className="action-buttons">
            <button className="btn btn-change" onClick={onGetPackage}>
              CHANGE SUBSCRIPTION
            </button>
            <button
              className="btn btn-default btn-cancel"
              onClick={onClickCancel}
            >
              {`${
                clickCancel ? "CANCEL SUBSCRIPTION" : "NO, I'VE CHANGED MY MIND"
              }`}
            </button>
          </div>
        ) : (
          <div
            _ngcontent-reo-c127=""
            className="confirmation-section ng-star-inserted"
          >
            {renderPackage()}
            <div _ngcontent-reo-c127="">
              <div _ngcontent-reo-c127="">
                <button
                  _ngcontent-reo-c127=""
                  nbbutton=""
                  status="primary"
                  disabled=""
                  aria-disabled="true"
                  tabIndex="-1"
                  className="appearance-filled btn-disabled size-medium shape-rectangle status-primary nb-transition"
                  onClick={handleUpdatePackage}
                >
                  CHANGE MY SUBSCRIPTION
                </button>
                <button
                  _ngcontent-reo-c127=""
                  nbbutton=""
                  status="default"
                  aria-disabled="false"
                  tabIndex="0"
                  onClick={handleCancelSubscription}
                  className="status-default appearance-filled size-medium shape-rectangle nb-transition"
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export { Profile };
