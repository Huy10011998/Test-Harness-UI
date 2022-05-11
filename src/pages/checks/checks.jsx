import React, { useState, useEffect, useLayoutEffect } from "react";
import AdminLayout from "../../components/AdminLayout/AdminLayout";
import { useRouter } from "../../hooks/use-router";
import { URL_PAGE } from "../../common/constants";
import ContentChecks from "./content-check";
import "./checks.scss";
import axios from "../../common/axios";
import Create from "./create";
import "moment-timezone";
export const Checks = (props) => {
  const { history } = useRouter();
  const [isSelect, setSelect] = useState(false);
  const [isCreate, setCreate] = useState(false);
  const [linkId, setLinkId] = useState("");
  const [role, setRole] = useState("");
  const [daytrial, setDayTrial] = useState(0);
  const [start, setStart] = useState("");
  const [finish, setFinish] = useState("");
  const [running, setRunning] = useState(0);
  const [data, setData] = useState([]);
  const [numberData, setNumberData] = useState([]);
  const [selectedUrlObj, setSelectedUrlObj] = useState({});
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
  let getLinkCheck = () => {
    axios({
      method: "GET",
      url: "http://stageapi.test-harness.io/linkCheck/",
    })
      .then((res) => {
        setData(res.data.data);
        setNumberData(res.data.count);
        if (selectedUrlObj) {
          for (let i in data) {
            if (data[i]._id === selectedUrlObj._id) {
              setSelectedUrlObj(data[i]);
              break;
            }
          }
        }
      })
      .catch((err) => {
        console.log("def", err);
      });
  };
  let handleCreate = (e) => {
    setCreate(true);
    setSelect(false);
    setSelectedUrlObj({});
  };
  let handleChange = (e) => {
    if (e.target.value == "") {
      setCreate(false);
      setSelect(false);
    } else {
      setCreate(false);
      setSelect(true);
    }
    axios
      .post("http://stageapi.test-harness.io/linkCheck/getOne", {
        id: e.target.value,
      })
      .then((res) => {
        if (res.data.status === "success") {
          setLinkId("");
          setTimeout(() => {
            setSelectedUrlObj(res.data.getO);
            setLinkId(res.data.getO._id);
            setStart(res.data.getO.startTime);
            setFinish(res.data.getO.finishTime);
            setRunning(res.data.getO.isRunning);
          });
        }
      })
      .catch((err) => {
        console.log("d", err);
      });
  };

  let handleCreated = async () => {
    setCreate(false);
    axios({
      method: "GET",
      url: "http://stageapi.test-harness.io/linkCheck/",
    })
      .then((res) => {
        setData(res.data.data);
        setNumberData(res.data.count);
        const e = {
          target: { value: res.data.data[res.data.data.length - 1]._id },
        };
        handleChange(e);
      })
      .catch((err) => {
        console.log("def", err);
      });
  };
  let handleDeleted = async () => {
    setCreate(false);
    setSelect(false);
    axios({
      method: "GET",
      url: "http://stageapi.test-harness.io/linkCheck/",
    })
      .then((res) => {
        setData(res.data.data);
        setNumberData(res.data.count);
      })
      .catch((err) => {
        console.log("def", err);
      });
  };

  let handleReRun = () => {
    //getOne
    axios
      .post("http://stageapi.test-harness.io/linkCheck/getOne", {
        id: linkId,
      })
      .then((res) => {
        if (res.data.status === "success") {
          setSelectedUrlObj(res.data.getO);
          setLinkId(res.data.getO._id);
          setStart(res.data.getO.startTime);
          setFinish(res.data.getO.finishTime);
          setRunning(res.data.getO.isRunning);
        }
      })
      .catch((err) => {
        console.log("d", err);
      });
  };

  useEffect(() => {
    getLinkCheck();
  }, []);
  return (
    <AdminLayout>
      <div className="content">
        <div className="wrapper-title">
          <div className="check-title">
            <h5>Link Checks</h5>
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
            <div className="check-sub">
              You can request {numberData} more link check project
            </div>
            <select
              className="option-list"
              name=""
              value={selectedUrlObj._id}
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
            <>
              {isSelect && linkId !== "" ? (
                <ContentChecks
                  id={linkId}
                  startTime={start}
                  finishTime={finish}
                  running={running}
                  onDeleted={handleDeleted}
                  onClickReRun={handleReRun}
                ></ContentChecks>
              ) : (
                isCreate && <Create onCreated={handleCreated} />
              )}
            </>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
