import React, { useState, useEffect } from "react";
import "./style.scss";
import LoadingCheck from "../loading-check";
import axios from "../../../common/axios";
import { toast } from "react-toastify";
import Moment from "react-moment";
import "moment-timezone";

const typeSelectList = [
  {
    label: "All",
    value: 0,
  },
  {
    label: "Broken links",
    value: 1,
  },
  {
    label: "Redirect links",
    value: 2,
  },
];

function ContentChecks(props) {
  const [isChecked, setChecked] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [totalURL, setTotalURL] = useState(0);
  const [brokenURL, setBrokenURL] = useState(0);
  const [redirectURL, setredirectURL] = useState(0);
  const [binary, setBinary] = useState(0);
  const [css, setCss] = useState(0);
  const [html, setHtml] = useState(0);
  const [image, setImage] = useState(0);
  const [javascript, setJavascript] = useState(0);
  const [undefined, setUndefined] = useState(0);
  const [https, setHttps] = useState(0);
  const [http, setHttp] = useState(0);
  const [data, setData] = useState([]);
  const [type, setType] = useState("");
  const [displayData, setDisplayData] = useState([]);

  let getChecks = () => {
    axios
      .post("http://stageapi.test-harness.io/linkCheckURL/", {
        linkCheckId: props.id,
      })
      .then((res) => {
        if (res.data.status === "success") {
          setData(res.data.data);
          setDisplayData(res.data.data);
          setTotalURL(res.data.data.length);
          setBrokenURL(res.data.countBroken);
          setBinary(res.data.countBinary);
          setCss(res.data.countCSS);
          setHtml(res.data.countHTML);
          setImage(res.data.countImage);
          setJavascript(res.data.countJs);
          setUndefined(res.data.countUndefined);
          setHttps(res.data.countHTTPS);
          setHttp(res.data.countHTTP);
          setredirectURL(res.data.countRedirects);
          if (res.data.data.length === 0) {
            checkLink();
            handleCheckLink();
          }
        }
      })
      .catch((err) => {
        console.log("d", err);
      });
  };

  let checkLink = () => {
    let bodyTime = {
      linkCheckId: props.id,
    };
    return new Promise((resolve, reject) => {
      axios
        .post("http://stageapi.test-harness.io/linkCheck/getAllLink", bodyTime)
        .then((res) => resolve(res))
        .catch((err) => {
          reject(err);
        });
    });
  };

  let handleCheckLink = () => {
    const res = checkLink();
    res
      .then((rs) => {
        const { data } = rs;
        return data;
      })
      .then((data) => {
        const { status } = data;
        if (status === "success") {
          setChecked(false);
          setLoading(true);
          const interval = setInterval(() => {
            getChecks();
            props.onClickReRun();
            axios
              .post("http://stageapi.test-harness.io/linkCheck/getOne", {
                id: props.id,
              })
              .then((res) => {
                if (res.data.status === "success") {
                  if (res.data.getO.isRunning == 1) {
                    clearInterval(interval);
                    setLoading(false);
                  }
                }
              })
              .catch((err) => {
                console.log("d", err);
              });
          }, 5000);
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

  useEffect(() => {
    getChecks();
  }, []);

  let deleteLinkCheck = () => {
    let bodyTime = {
      id: props.id,
    };
    return new Promise((resolve, reject) => {
      axios
        .post("http://stageapi.test-harness.io/linkcheck/delete", bodyTime)
        .then((res) => resolve(res))
        .catch((err) => {
          reject(err);
        });
    });
  };
  let handleDeleteClick = (e) => {
    e.preventDefault();
    const res = deleteLinkCheck();
    res
      .then((rs) => {
        const { data } = rs;
        return data;
      })
      .then((data) => {
        const { status } = data;
        if (status === "success") {
          toast.success("Delete Url Success!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          props.onDeleted();
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

  const handleChangeTypeStatus = (e) => {
    const { value } = e.target;
    setType(value);

    const cloneData = [...data];
    const newData = [];

    if (value == 0) {
      for (let i of cloneData) {
        newData.push(i);
      }
    } else if (value == 2) {
      for (let i of cloneData) {
        if (i.status == "301" || i.status == "302") {
          newData.push(i);
        }
      }
    } else
      for (let i of cloneData) {
        if (i.status !== "301" && i.status !== "302" && i.status !== "200") {
          newData.push(i);
        }
      }

    setDisplayData(newData);
  };

  // const handleOnTypeChange = (e) => {
  //   const { value } = e.target;
  //   setType(value);
  //   const cloneData = [...data];
  //   let newData = [];

  //   if (value == 0) {
  //     newData = cloneData.filter((i) => +value === 0 || +value === +i.status);
  //   } else if (value == 2) {
  //     for (let i of cloneData) {
  //       if (i.status == "301" || i.status == "302") {
  //         newData.push(i);
  //       }
  //     }
  //   } else {
  //     for (let i of cloneData) {
  //       if (i.status !== "301" && i.status !== "302" && i.status !== "200") {
  //         newData.push(i);
  //       }
  //     }
  //   }
  //   setDisplayData(newData);
  // };

  return (
    <div className="wrapper-content-check">
      <div className="action">
        <button
          disabled={isLoading}
          onClick={handleCheckLink}
          className=" btn-rerun"
        >
          Rerun
        </button>
        <button onClick={handleDeleteClick} className="btn-delete">
          Delete
        </button>
        <div className="option-list-filter-pd">
          <select
            className="option-list-pd"
            name=""
            value={type}
            onChange={handleChangeTypeStatus}
          >
            <option className="option-disabled" hidden value="">
              Select type urls
            </option>
            {typeSelectList.map((i, index) => {
              return (
                <option key={`type-${index}`} value={i.value}>
                  {i.label}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      {isLoading ? (
        <div className="wrapper-time-loading">
          <div className="content-status">
            <p className="text-status">IN PROGRESS</p>
            <LoadingCheck />
          </div>
        </div>
      ) : (
        <div className="wrapper-time">
          <div className="content-status">
            <p className="text-status">COMPLETED</p>
          </div>
          <div className="content-time">
            <p className="text-time">
              Ran between{" "}
              <strong className="">
                <Moment format="DD/MM/YYYY HH:mm">{props.startTime}</Moment>
              </strong>
              &nbsp; AND &nbsp;
              <strong className="">
                <Moment format="DD/MM/YYYY HH:mm">{props.finishTime}</Moment>
              </strong>
            </p>
          </div>
        </div>
      )}

      <div className="content-items">
        <div className="item-total">
          <div className="title">TOTAL URLS</div>
          <div className="total-content">
            <div className="total-text">{totalURL}</div>
          </div>
        </div>
        <div className="item-broken">
          <div className="title">BROKEN URLS</div>
          <div className="broken-content">
            <div className="broken-text">{brokenURL}</div>
          </div>
          <div className="statusBro"></div>
        </div>
        <div className="item-broken">
          <div className="title">REDIRECT URLS</div>
          <div className="broken-content">
            <div className="broken-text">{redirectURL}</div>
          </div>
          <div className="statusRed"></div>
        </div>
        <div className="item-link-type">
          <div className="title">BY LINK TYPE</div>
          <div className="link-type-content">
            <div className="type-name">Bianry</div>
            <div className="type-number">{binary}</div>
          </div>
          <div className="link-type-content">
            <div className="type-name">CSS</div>
            <div className="type-number">{css}</div>
          </div>
          <div className="link-type-content">
            <div className="type-name">Html</div>
            <div className="type-number">{html}</div>
          </div>
          <div className="link-type-content">
            <div className="type-name">Image</div>
            <div className="type-number">{image}</div>
          </div>
          <div className="link-type-content">
            <div className="type-name">Javascript</div>
            <div className="type-number">{javascript}</div>
          </div>
          <div className="link-type-content">
            <div className="type-name">Undefined</div>
            <div className="type-number">{undefined}</div>
          </div>
        </div>
        {/* <div className="item-source">
          <div className="title">BY SOURCE</div>
          {linkCheck.bySource?.map((item) => {
            return (
              <div className="source-content">
                <div className="type-name">{item.name}</div>
                <div className="type-number">{item.num}</div>
              </div>
            );
          })}
        </div> */}
        <div className="item-protocol">
          <div className="title">BY PROTOCOL</div>
          <div className="protocol-content">
            <div className="type-name">http</div>
            <div className="type-number">{http}</div>
          </div>
          <div className="protocol-content">
            <div className="type-name">https</div>
            <div className="type-number">{https}</div>
          </div>
        </div>
        {/* <div className="item-host">
          <div className="title">BY HOSTS</div>
          <div className="host-wrapper">
            {linkCheck.byHosts?.map((item) => {
              return (
                <div className="host-content">
                  <div className="type-name">{item.name}</div>
                  <div className="type-number">{item.num}</div>
                </div>
              );
            })}
          </div>
        </div> */}
      </div>

      <div className="table-list-url">
        <table>
          <thead>
            <tr className="table-header">
              <th>Url</th>
              <th>Parent Url</th>
              <th>Content Type</th>
            </tr>
          </thead>
          <tbody>
            {displayData?.map((item) => {
              return (
                <tr key={item._id}>
                  <td>
                    <div className="url-wrapper">
                      <div className="status">
                        {item.status == 200 ? (
                          <div className="statusTrue"></div>
                        ) : item.status == 301 || item.status == 302 ? (
                          <div className="statusRedirects"></div>
                        ) : (
                          <div className="statusFalse"></div>
                        )}
                      </div>
                      <div
                        className={`n-status ${
                          item.status == "200"
                            ? ""
                            : item.status == "301" || item.status == "302"
                            ? "redirects"
                            : "failed"
                        }`}
                      >
                        {item.status}
                      </div>
                      <a href={item.url} target="_blank" className="url-name">
                        {item.url}
                      </a>
                    </div>
                  </td>
                  <td className="parent">{item.parent}</td>
                  <td>{item.contentType}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ContentChecks;
