import React, { useState, useEffect } from "react";
import axios from "../../../common/axios";
import { ErrorMessage } from "../../../components/error-message";
import { Loading } from "../../../components/loading";
import * as session from "../../../common/utils";
import { toast } from "react-toastify";

export default function Create(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState([]);
  const [url, setUrl] = useState("");
  const [time, setTime] = useState(15);
  const [isCreate, setCreate] = useState(true);
  let bodyURLs = {
    url: url,
    time: time,
  };
  let onAddNew = async () => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          "http://stageapi.test-harness.io/websiteMonitoring/create",
          bodyURLs
        )
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
        setErrorMessage("");
        setIsLoading(false);
        // setCreate(false);
        const { data } = rs;
        return data;
      })
      .then((data) => {
        const { status } = data;
        if (status === "success") {
          toast.success("Add new Website Success!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          props.onCreated();
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
          props.onCreated();
        }
      });
  };

  return (
    <>
      {isCreate === true ? (
        <div className="content-addNew">
          <div className="input-newAdd">
            <label className="check-title" htmlFor="">
              Check
            </label>
            <input
              onChange={(e) => setUrl(e.target.value)}
              type="text"
              value={url}
              placeholder="Type your url here"
            />

            <label className="in-title" htmlFor="">
              in
            </label>
            <select
              onChange={(e) => setTime(e.target.value)}
              className="time-loading"
              name=""
              id=""
            >
              <option value="15">every 15 seconds</option>
              <option value="30">every 30 seconds</option>
              <option value="60">every 60 seconds</option>
            </select>
          </div>
          <div className="title-input">
            <p>
              Please type the full URL including https and www e.g{" "}
              <a href="">https://www.test-harness.io</a>
            </p>
          </div>
          <div className="action-newAdd">
            <button className="btn btn-newAdd" onClick={handleAddNew}>
              Start Monitoring
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
