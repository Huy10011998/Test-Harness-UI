import React, { useState, useEffect, useLayoutEffect } from "react";
import AdminLayout from "../../components/AdminLayout/AdminLayout";
import { useRouter } from "../../hooks/use-router";
import { URL_PAGE } from "../../common/constants";
import axios from "../../common/axios";
import { storage } from "../../common/utils";
import "./styles.scss";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import Moment from "react-moment";
import {
  BsCheckCircle,
  BsInfoCircleFill,
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
} from "react-icons/bs";

const localStorage = storage();
const SmokeTesting = React.memo(() => {
  let styleIconPass = { fontSize: "24", color: "#5AF0A9", marginRight: "5" };
  let styleIconFail = { fontSize: "24", color: "#F05E59", marginRight: "5" };
  const { history } = useRouter();
  const [role, setRole] = useState("");
  const [data, setData] = useState([]);
  const [histories, setHistories] = useState([]);
  const [isPass, setPass] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [smokeTestS, setsmokeTestS] = useState([]);
  const [isDetail, setDetail] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [id, setId] = useState("");
  const [url, setUrl] = useState("");
  const [note, setNote] = useState("");
  const handleOnContinue = () => {
    history.push(URL_PAGE.PROFILE);
  };

  useLayoutEffect(() => {
    const token = localStorage.getToken();
    if (token) {
      const decode = jwt_decode(token);
      if (decode.isAdmin) {
        setAdmin(decode.isAdmin);
      } else {
        axios({
          method: "GET",
          url: "http://stageapi.test-harness.io/user/getOne",
        })
          .then((res) => {
            setRole(res.data.role);
          })
          .catch((err) => {
            console.log("def", err);
          });
      }
    }
  }, []);

  let getSmokeTest = () => {
    axios({
      method: "GET",
      url: "http://stageapi.test-harness.io/smokeTest/",
    })
      .then((res) => {
        setData(res.data.data);
        if (res.data.data.length > 0) getSmokeTestStatus(res.data.data[0]._id);
      })
      .catch((err) => {
        console.log("def", err);
      });
  };

  let getSmokeTestStatus = (id) => {
    const data = {
      smokeTestId: id,
    };
    axios({
      method: "POST",
      url: "http://stageapi.test-harness.io/smokeTestStatus/history",
      data,
    })
      .then((res) => {
        setHistories(res.data.data);
      })
      .catch((err) => {
        console.log("def", err);
      });
  };

  let getSmokeTestStatusAdmin = () => {
    axios({
      method: "GET",
      url: "http://stageapi.test-harness.io/smokeTest/all",
    })
      .then((res) => {
        setsmokeTestS(res.data.data);
      })
      .catch((err) => {
        console.log("def", err);
      });
  };

  let onDetail = (id) => {
    const data = {
      smokeTestId: id,
    };
    return new Promise((resolve, reject) => {
      axios
        .post("http://stageapi.test-harness.io/smokeTestStatus/history", data)
        .then((res) => resolve(res))
        .catch((err) => {
          reject(err);
        });
    });
  };

  let handleDetail = (id) => {
    const res = onDetail(id);
    setDetail(true);
    res
      .then((rs) => {
        const { data } = rs;
        return data;
      })
      .then((data) => {
        const { status } = data;
        if (status == "success") {
          setHistories(data.data);
        }
      })
      .catch((error) => {
        if (error.response.status == 400) {
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

  let onSendTestSmoke = async (id, status, note) => {
    const data = {
      id,
      status,
      note,
    };
    return new Promise((resolve, reject) => {
      axios
        .post("http://stageapi.test-harness.io/smokeTestStatus/create", data)
        .then((res) => resolve(res))
        .catch((err) => {
          reject(err);
        });
    });
  };

  let openModal = (id) => {
    setPass(true);
    setId(id);
  };

  let close = () => {
    setPass(false);
  };

  let handleTest = (id, status, note) => {
    const res = onSendTestSmoke(id, status, note);
    res
      .then((rs) => {
        const { data } = rs;
        return data;
      })
      .then((data) => {
        const { status } = data;
        if (status == "success") {
          toast.success("Send Smoke Test Success!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          setPass(false);
          setId("");
          setNote("");
          getSmokeTestStatusAdmin();
          if (isDetail) {
            handleDetail(id);
          }
        }
      })
      .catch((error) => {
        if (error.response.status == 400) {
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

  let loadEdit = (id) => {
    setId(id);
    setEdit(true);
  };

  let onEdit = async () => {
    const data = {
      id,
      url,
    };
    return new Promise((resolve, reject) => {
      axios
        .post("http://stageapi.test-harness.io/smokeTest/update", data)
        .then((res) => resolve(res))
        .catch((err) => {
          reject(err);
        });
    });
  };

  let handleOnCancelEdit = () => {
    setEdit(false);
  };

  // let handleOnEdit = (e) => {
  //   e.preventDefault();
  //   const res = onEdit();
  //   res
  //     .then((rs) => {
  //       const { data } = rs;
  //       return data;
  //     })
  //     .then((data) => {
  //       const { status } = data;
  //       if (status == "success") {
  //         toast.success("Edit URL Success!", {
  //           position: "top-right",
  //           autoClose: 2000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: false,
  //           draggable: true,
  //           progress: undefined,
  //         });
  //         setEdit(false);
  //         setUrl("");
  //         getSmokeTest();
  //       }
  //     })
  //     .catch((error) => {
  //       if (error.response.status == 400) {
  //         const { message } = error.response.data;
  //         toast.error(message, {
  //           position: "top-right",
  //           autoClose: 2000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: false,
  //           draggable: true,
  //           progress: undefined,
  //         });
  //       }
  //     });
  // };

  let onAddNew = async () => {
    const bodyURLs = {
      url: url,
    };
    return new Promise((resolve, reject) => {
      axios
        .post("http://stageapi.test-harness.io/smokeTest/create", bodyURLs)
        .then((res) => resolve(res))
        .catch((err) => {
          reject(err);
        });
    });
  };

  let handleAddNew = (e) => {
    e.preventDefault();
    const res = onAddNew();
    res
      .then((rs) => {
        const { data } = rs;
        return data;
      })
      .then((data) => {
        const { status } = data;
        if (status == "success") {
          toast.success("Add new URL Success!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          getSmokeTest();
        }
      })
      .catch((error) => {
        if (error.response.status == 400) {
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

  let checkUrl = (url) => {
    if (url.indexOf("https://") < 0 && url.indexOf("http://") < 0) {
      return true;
    } else {
      if (url.indexOf("https://") >= 0) {
        const result = url.replace(/(^\w+:|^)\/\//, "");
        if (result.indexOf("/") == 0) {
          return false;
        } else {
          return true;
        }
      } else if (url.indexOf("http://") >= 0) {
        const result = url.replace(/(^\w+:|^)\/\//, "");
        if (result.indexOf("/") == 0) {
          return false;
        } else {
          return true;
        }
      }
    }
  };

  let handleOnEdit = (e) => {
    e.preventDefault();

    if (checkUrl(url)) {
      const res = onEdit();
      console.log("=====", url);
      res
        .then((rs) => {
          const { data } = rs;
          return data;
        })
        .then((data) => {
          const { status } = data;
          if (status == "success") {
            toast.success("Edit URL Success!", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
            setEdit(false);
            setUrl("");
            getSmokeTest();
          }
        })
        .catch((error) => {
          if (error.response.status == 400) {
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
    } else {
      toast.error("Wrong url format, please check then try again.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    const token = localStorage.getToken();
    if (token) {
      const decode = jwt_decode(token);
      if (decode.isAdmin) {
        console.log("----", decode.isAdmin);
        getSmokeTestStatusAdmin();
      } else {
        getSmokeTest();
      }
    }
  }, []);

  return (
    <AdminLayout>
      <div className="smoke-testing__content">
        <div className="smoke-testing__wrapper">
          <div className="smoke-testing__title">Smoke Testing</div>
          {isAdmin ? (
            <div className="smoke-testing__body">
              <div className="smoke-testing__description">All Smoke Test</div>
              <div className="table-wrapper">
                <div className="table">
                  <div className="thead">
                    <div className="tr">
                      <div className="th">User</div>
                      <div className="th">Email</div>
                      <div className="th">Url</div>
                      <div className="th">Status</div>
                      <div className="th">Description</div>
                      <div className="th">Date Send</div>
                      <div className="th">Date Test Smoke</div>
                      <div className="th">Action</div>
                    </div>
                  </div>
                  {smokeTestS.length > 0 ? (
                    <div className="tbody">
                      {smokeTestS?.map((sm) => {
                        return (
                          <div className="tr" key={sm._id}>
                            <div className="td">
                              {sm.userId.firstname + " " + sm.userId.lastname}
                            </div>
                            <div className="td">{sm.userId.workemail}</div>
                            <div className="td">
                              <a
                                href={sm.url}
                                target="_blank"
                                className="url-name"
                              >
                                {sm.url}
                              </a>
                            </div>
                            <div
                              className={`td ${
                                sm.status === "fail" ? "failed" : ""
                              }`}
                            >
                              {sm.status}
                            </div>
                            <div
                              className={`td ${
                                sm.status === "fail" ? "failed" : ""
                              }`}
                            >
                              {sm?.description}
                            </div>
                            <div className="td">
                              <Moment format="DD/MM/YYYY HH:mm">
                                {sm.dateSend}
                              </Moment>
                            </div>
                            <div className="td">
                              {sm.dateReceive !== "" ? (
                                <Moment format="DD/MM/YYYY HH:mm">
                                  {sm?.dateReceive}
                                </Moment>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="td action">
                              <button
                                className="btn btn-default btn-pass"
                                onClick={() => {
                                  handleTest(sm._id, "pass", "");
                                }}
                              >
                                <BsFillHandThumbsUpFill />
                              </button>
                              <button
                                className="btn btn-default btn-fail"
                                onClick={() => {
                                  openModal(sm._id);
                                }}
                              >
                                <BsFillHandThumbsDownFill />
                              </button>
                              <button
                                className="btn btn-primary"
                                onClick={() => {
                                  handleDetail(sm._id);
                                }}
                              >
                                <BsInfoCircleFill />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="tbody">
                      <div className="tr not-found">Not Found Item.....</div>
                    </div>
                  )}
                </div>
              </div>
              {isDetail ? (
                <div>
                  <div className="smoke-testing__description">
                    Smoke Test Detail
                  </div>
                  <div className="table-wrapper">
                    <div className="table table-detail">
                      <div className="thead">
                        <div className="tr">
                          <div className="th">Url</div>
                          <div className="th">Status</div>
                          <div className="th">Description</div>
                          <div className="th">Date Test Smoke</div>
                        </div>
                      </div>
                      {histories.length > 0 ? (
                        <div className="tbody">
                          {histories?.map((sm) => {
                            return (
                              <div className="tr" key={sm._id}>
                                <div className="td">
                                  <a
                                    href={sm.url}
                                    target="_blank"
                                    className="url-name"
                                  >
                                    {sm.url}
                                  </a>
                                </div>
                                <div
                                  className={`td ${
                                    sm.status === "fail" ? "failed" : ""
                                  }`}
                                >
                                  {sm.status}
                                </div>
                                <div
                                  className={`td ${
                                    sm.status === "fail" ? "failed" : ""
                                  }`}
                                >
                                  {sm?.description}
                                </div>
                                <div className="td">
                                  <Moment format="DD/MM/YYYY HH:mm">
                                    {sm?.dateSend}
                                  </Moment>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="tbody">
                          <div className="tr not-found">
                            Not Found Item.....
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <div>
              {role !== "lite" ? (
                <div className="smoke-testing__body">
                  <div className="smoke-testing__description">
                    This feature is only available for Lite Package users or
                    above that.
                  </div>
                  <div className="smoke-testing__footer">
                    <button
                      className="smoke-testing__button"
                      onClick={handleOnContinue}
                    >
                      click here to upgrade your subscription!
                    </button>
                  </div>
                </div>
              ) : data.length > 0 ? (
                <div className="smoke-testing__body">
                  {data.map((item) => {
                    {
                      console.log("====", url.indexOf("//"));
                    }
                    return (
                      <div key={item}>
                        <div className="url">
                          <strong>URL :</strong>{" "}
                          <a href={item.url} target="_blank">
                            {item.url}
                          </a>
                        </div>
                        <div className="content">
                          Smoke test request was received on
                          <div className="date-time">
                            <Moment format="DD/MM/YYYY HH:mm">
                              {item.dateSend}
                            </Moment>
                          </div>
                          . Results will be updated every 24 hours
                        </div>
                        {item.status === "pass" ? (
                          <div className="status">
                            <BsCheckCircle style={styleIconPass} />
                            Smoke testing performed on{" "}
                            <Moment format="DD/MM/YYYY HH:mm">
                              {item.dateReceive}
                            </Moment>
                          </div>
                        ) : item.status === "fail" ? (
                          <div className="status fail">
                            <BsCheckCircle style={styleIconFail} />
                            Smoke tests failed on{" "}
                            <Moment format="DD/MM/YYYY HH:mm">
                              {item.dateReceive}
                            </Moment>
                            . Details about failures have been emailed to you
                          </div>
                        ) : null}

                        {!isEdit ? (
                          <div className="smoke-testing__footer">
                            <button
                              className="smoke-testing__button"
                              onClick={() => {
                                loadEdit(item._id);
                              }}
                            >
                              Edit
                            </button>
                          </div>
                        ) : null}
                        {isEdit ? (
                          <div className="smoke-testing__body">
                            <div className="smoke-testing__description">
                              Please enter your website's full URL. (User should
                              be allowed to enter only 1 URL)
                            </div>
                            <div className="input-newAdd">
                              <input
                                onChange={(e) => setUrl(e.target.value)}
                                type="text"
                                value={url}
                                placeholder="Type your url here"
                              />
                            </div>
                            <div className="title-input">
                              <p>
                                Please type the full URL including https and www
                                e.g <a href="">https://www.test-harness.io</a>
                              </p>
                            </div>
                            <div className="action-newAdd">
                              <div>
                                <button
                                  className="btn btn-default btn-cancel"
                                  onClick={handleOnCancelEdit}
                                >
                                  Cancel
                                </button>
                                <button
                                  className="btn btn-newAdd"
                                  onClick={handleOnEdit}
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                  {histories.length > 0 ? (
                    <div className="detail-wrapper">
                      <div className="smoke-testing__description">
                        Smoke Test History
                      </div>
                      <div className="table-wrapper">
                        <div className="table table-detail">
                          <div className="thead">
                            <div className="tr">
                              <div className="th">Url</div>
                              <div className="th">Status</div>
                              <div className="th">Description</div>
                              <div className="th">Date Test Smoke</div>
                            </div>
                          </div>
                          {histories.length > 0 ? (
                            <div className="tbody">
                              {histories?.map((sm) => {
                                return (
                                  <div className="tr" key={sm._id}>
                                    <div className="td">
                                      <a
                                        href={sm.url}
                                        target="_blank"
                                        className="url-name"
                                      >
                                        {sm.url}
                                      </a>
                                    </div>
                                    <div
                                      className={`td ${
                                        sm.status === "fail" ? "failed" : ""
                                      }`}
                                    >
                                      {sm.status}
                                    </div>
                                    <div
                                      className={`td ${
                                        sm.status === "fail" ? "failed" : ""
                                      }`}
                                    >
                                      {sm?.description}
                                    </div>
                                    <div className="td">
                                      <Moment format="DD/MM/YYYY HH:mm">
                                        {sm?.dateSend}
                                      </Moment>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="tbody">
                              <div className="tr not-found">
                                Not Found Item.....
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="smoke-testing__body">
                  <div className="smoke-testing__description">
                    Please enter your website's full URL. (User should be
                    allowed to enter only 1 URL)
                  </div>
                  <div className="input-newAdd">
                    <input
                      onChange={(e) => setUrl(e.target.value)}
                      type="text"
                      value={url}
                      placeholder="Type your url here"
                    />
                  </div>
                  <div className="title-input">
                    <p>
                      Please type the full URL including https and www e.g{" "}
                      <a href="">https://www.test-harness.io</a>
                    </p>
                  </div>
                  <div className="action-newAdd">
                    <button className="btn btn-newAdd" onClick={handleAddNew}>
                      Activate Daily Smoke Testing
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {isPass ? (
        <div>
          <div className={`overlay ${isPass ? "open" : ""}`}></div>
          <div className={`modal ${isPass ? "open" : ""}`}>
            <a className="close" onClick={close}>
              &times;
            </a>
            <div className="header"> Smoke Test Fail </div>
            <div className="content">
              <div className="des">Note</div>
              <div>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="30"
                  onChange={(e) => setNote(e.target.value)}
                  value={note}
                  placeholder="Type your note here"
                ></textarea>
              </div>
            </div>
            <div className="footer">
              <button onClick={close} className="btn btn-default">
                Cancel
              </button>
              <button
                onClick={() => {
                  handleTest(id, "fail", note);
                }}
                className="btn btn-danger"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </AdminLayout>
  );
});
export { SmokeTesting };
