import React, { useState, useEffect } from "react";
import axios from "../../../common/axios";
import { ErrorMessage } from "../../../components/error-message";
import "./style.scss";
import { toast } from "react-toastify";
export default function Edit(props) {
  const [time, setTime] = useState(props.time);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //TODO: update times
  let onUpdateTime = () => {
    let bodyTime = {
      id: props.id,
      time: time,
    };
    return new Promise((resolve, reject) => {
      axios
        .post(
          "http://stageapi.test-harness.io/websiteMonitoring/update",
          bodyTime
        )
        .then((res) => resolve(res))
        .catch((err) => {
          reject(err);
        });
    });
  };
  let handleSaveChanges = (e) => {
    e.preventDefault();
    const res = onUpdateTime();
    res
      .then((rs) => {
        setErrorMessage("");
        setIsLoading(false);
        const { data } = rs;
        return data;
      })
      .then((data) => {
        const { status } = data;
        if (status === "success") {
          toast.success("Update Website Success!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          props.onSaved(time);
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

  return (
    <div className="content-edit">
      <button className="btn btn-save-change" onClick={handleSaveChanges}>
        SAVE CHANGES
      </button>
      <div className="edit-wrapper">
        <label className="title-checkin" htmlFor="">
          Check in
        </label>
        <select
          onChange={(e) => setTime(e.target.value)}
          className="time-loading"
          name=""
          id=""
          value={time}
        >
          <option value="15">every 15 seconds</option>
          <option value="30">every 30 seconds</option>
          <option value="60">every 60 seconds</option>
        </select>
      </div>
    </div>
  );
}
