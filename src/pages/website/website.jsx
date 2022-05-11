import React, { useState, useEffect, useLayoutEffect } from "react";
import axios from "../../common/axios";
import AdminLayout from "../../components/AdminLayout/AdminLayout";
import { useRouter } from "../../hooks/use-router";
import { URL_PAGE } from "../../common/constants";
import Edit from "./edit";
import Create from "./create";
import "./website.scss";
import Moment from "react-moment";
import "moment-timezone";
import { BsArrowUpCircle, BsArrowDownCircle } from "react-icons/bs";
import { toast } from "react-toastify";
import { storage } from "../../common/utils";
const localStorage = storage();
let intervalRun = null;
const Website = (props) => {
  const { history } = useRouter();
  const [isSelect, setIsSelect] = useState(false);
  const [time, setTime] = useState(0);
  const [url, setUrl] = useState("");
  const [id, setId] = useState("");
  const [status, setStatus] = useState("");
  const [timecheck, setTimecheck] = useState("");
  const [description, setDescription] = useState("");
  const [note, setNote] = useState("");
  const [data, setData] = useState([]);
  const [numberData, setNumberData] = useState([]);
  const [isUpdate, setUpdate] = useState(false);
  const [isCreate, setCreate] = useState(false);
  const [role, setRole] = useState("");
  const [daytrial, setDayTrial] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [timeRun, setTimeRun] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  let styleIconUp = { fontSize: "24", color: "#5AF0A9", marginRight: "5" };
  let styleIconDown = { fontSize: "24", color: "#F05E59", marginRight: "5" };
  const handleOnContinue = () => {
    history.push(URL_PAGE.PROFILE);
  };
  useLayoutEffect(() => {
    axios({
      method: "GET",
      url: "http://stageapi.test-harness.io/user/getOne",
    })
      .then((res) => {
        setRole(res.data.role);
        setDayTrial(res.data.daytrial);
      })
      .catch((err) => {
        console.log("def", err);
      });
  }, []);
  let run = (time, id) => {
    clearInterval(intervalRun);
    setIsRunning(true);
    setTimeRun(time);
    setCurrentTime(0);
    intervalRun = setInterval(() => {
      countInterval(time, id);
    }, 1000);
  };

  let countInterval = (time, id) => {
    setTimeout(() => {
      setCurrentTime((prevTime) => {
        if (prevTime === time) {
          axios
            .post("http://stageapi.test-harness.io/websiteMonitoring/getOne", {
              id,
            })
            .then((res) => {
              if (res.data.status === "success") {
                setId(res.data.getO._id);
                setTime(res.data.getO.time);
                setTimeRun(res.data.getO.time);
                setId(res.data.getO._id);
                setUrl(res.data.getO.url);
                setStatus(res.data.getO.status);
                setTimecheck(res.data.getO.timecheck);
                setDescription(res.data.getO.description);
                setNote(res.data.getO.note);
                setIsSelect(true);
              }
            })
            .catch((err) => {
              console.log("d", err);
            });
          return 0;
        } else {
          return prevTime + 1;
        }
      });
    }, 1000);
  };

  //TODO: get all
  let getWebsites = () => {
    axios({
      method: "GET",
      url: "http://stageapi.test-harness.io/websiteMonitoring/",
    })
      .then((res) => {
        setData(res.data.data);
        setNumberData(res.data.count);
      })
      .catch((err) => {
        console.log("def", err);
      });
  };
  let handleUpdate = (e) => {
    setUpdate(true);
    setCreate(false);
  };
  let handleCreate = (e) => {
    clearInterval(intervalRun);
    setCreate(true);
    setUpdate(false);
    setIsSelect(false);
    setId("");
  };

  let onGetWebSiteMonitor = async (e) => {
    const data = {
      id: e,
    };
    return new Promise((resolve, reject) => {
      axios
        .post("http://stageapi.test-harness.io/websiteMonitoring/getOne", data)
        .then((res) => resolve(res))
        .catch((err) => {
          reject(err);
        });
    });
  };

  let handleChange = (e) => {
    clearInterval(intervalRun);
    const res = onGetWebSiteMonitor(e.target.value);
    res
      .then((rs) => {
        const { data } = rs;
        return data;
      })
      .then((data) => {
        const { status } = data;
        if (status === "success") {
          setIsSelect(true);
          setTime(data.getO.time);
          setTimeRun(data.getO.time);
          setId(data.getO._id);
          setUrl(data.getO.url);
          setStatus(data.getO.status);
          setTimecheck(data.getO.timecheck);
          setDescription(data.getO.description);
          setNote(data.getO.note);
          setIsRunning(false);
          setCreate(false);
          setUpdate(false);
          // console.log(data.getO.time);
          run(data.getO.time, data.getO._id);
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
  let handleDelete = (e) => {
    clearInterval(intervalRun);
    axios
      .post("http://stageapi.test-harness.io/websiteMonitoring/delete", {
        id,
      })
      .then((res) => {
        if (res.data.status === "success") {
          axios({
            method: "GET",
            url: "http://stageapi.test-harness.io/websiteMonitoring/",
          })
            .then((res) => {
              setData(res.data.data);
              setNumberData(res.data.count);
              setId("");
              setIsSelect(false);
              toast.success("Deleted Website Success!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
              });
            })
            .catch((err) => {
              console.log("def", err);
            });
        }
      })
      .catch((err) => {
        console.log("d", err);
      });
  };

  let handleSaved = (e) => {
    clearInterval(intervalRun);
    setTimeRun(e);
    run(Number(e), id);
    setUpdate(false);
  };

  useEffect(() => {
    getWebsites();
  }, []);
  let handleCreated = async () => {
    setCreate(false);
    axios({
      method: "GET",
      url: "http://stageapi.test-harness.io/websiteMonitoring/",
    })
      .then((res) => {
        setData(res.data.data);
        setNumberData(res.data.count);
        setId(res.data.data[res.data.data.length - 1]);
        handleChange({
          target: { value: res.data.data[res.data.data.length - 1] },
        });
      })
      .catch((err) => {
        console.log("def", err);
      });
  };

  return (
    <AdminLayout>
      <div className="content">
        <div className="wrapper-website">
          <div className="website-title">
            <h5>Website Monitoring</h5>
          </div>
          {(role === "trial" && daytrial <= 7) || role != "trial" ? (
            <button className="btn btn-primary" onClick={handleCreate}>
              ADD NEW
            </button>
          ) : null}
        </div>
        {role === "trial" && daytrial >= 8 ? (
          <div className="smoke-testing__body">
            <div className="smoke-testing__description">
              This feature is only available for Lite Package users or above
              that.
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
        ) : (
          <div>
            <div className="website-sub">
              You can request {numberData} more URLs for monitoring
            </div>
            <div className="website-lists">
              <select
                className="website-list"
                name=""
                value={id}
                onChange={handleChange}
              >
                <option className="option-disabled" hidden value="">
                  Select a URL
                </option>
                {data.map((item) => {
                  return (
                    <option key={item._id} value={item._id}>
                      {item.typeUrl}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        )}
      </div>
      <div className="wrapper-urls">
        {isSelect && (
          <div className="wrapper-url-item">
            <div className="url-items">
              <p className="name-url">{url}</p>
            </div>
            <div className="url-actions">
              <button
                className="btn btn-primary"
                onClick={() => {
                  run(time, id);
                }}
              >
                RUN CHECK
              </button>
              <button className="btn btn-default" onClick={handleUpdate}>
                EDIT
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                DELETE
              </button>
            </div>
          </div>
        )}
        {isSelect && (
          <div className="wrapper-content2">
            <div className="status-url">
              {status === null ? (
                <div>
                  <div className="statusChecking">
                    <span>Checking</span>
                  </div>
                </div>
              ) : (
                <div>
                  {status === 200 ? (
                    <div className="statusDown">
                      <BsArrowUpCircle style={styleIconUp} />
                      <span>UP</span>
                    </div>
                  ) : (
                    <div>
                      {status !== null ? (
                        <div className="statusUp">
                          <BsArrowDownCircle style={styleIconDown} />
                          <span>DOWN</span>
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              )}
              {status !== null ? (
                <div>
                  &nbsp;since&nbsp;
                  <Moment format="DD/MM/YYYY HH:mm">{timecheck}</Moment>
                </div>
              ) : null}
              {isRunning && id && (
                <div className="run-text">
                  <div>Next run in {timeRun - currentTime} seconds</div>
                  <div className="run-wrapper"></div>
                  <div
                    className="run"
                    style={{
                      width: Math.floor((currentTime * 100) / timeRun) + "%",
                    }}
                  ></div>
                </div>
              )}
            </div>
            <div
              className={`note ${
                description == "warning"
                  ? "warning"
                  : description == "error"
                  ? "error"
                  : ""
              }`}
            >
              {note}
            </div>
            {/* TODO: Run Check */}

            {/* End Run Check */}
          </div>
        )}
        <>
          {isUpdate === true ? (
            <Edit time={time} id={id} onSaved={handleSaved} />
          ) : (
            isCreate && <Create onCreated={handleCreated} />
          )}
        </>
      </div>
    </AdminLayout>
  );
};

export { Website };
