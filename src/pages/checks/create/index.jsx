import React, { useState } from "react";
import axios from "../../../common/axios";
import { toast } from "react-toastify";

export default function Create(props) {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState("");
  const [time, setTime] = useState(15);
  const [isCreate, setCreate] = useState(true);
  let bodyURLs = {
    url: url,
  };
  let onAddNew = async () => {
    return new Promise((resolve, reject) => {
      axios
        .post("http://stageapi.test-harness.io/linkCheck/create", bodyURLs)
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
          props.onCreated();
        }
      });
  };

  return (
    <>
      {isCreate === true ? (
        <div className="content-addNew">
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
              Check URL
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
