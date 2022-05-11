import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { ErrorMessage } from "../../components/error-message";
import { SuccessMessage } from "../../components/success-message";

export const Contact = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const onContact = async () => {
    const data = {
      email,
      name,
      phone,
      message,
    };
    return new Promise((resolve, reject) => {
      axios
        .post("http://stageapi.test-harness.io/contact", data)
        .then((res) => resolve(res))
        .catch((error) => {
          reject(error);
        });
    });
  };

  const handleSend = () => {
    if (email == "") {
      setErrorMessage("Email is Required");
    } else if (message == "") {
      setErrorMessage("Message is Required");
    } else if (name == "") {
      setErrorMessage("Name is Required");
    } else {
      setErrorMessage("");
      setSuccessMessage("");
      const res = onContact();
      res
        .then((rs) => {
          const { data } = rs;
          return data;
        })
        .then((data) => {
          const { status } = data;
          if (status === "success") {
            setSuccessMessage(
              "Thanks for your message. We will get back to you ASAP"
            );
            setEmail("");
            setName("");
            setPhone("");
            setMessage("");
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
      <div id="contact">
        <div className="container contact-section">
          <div className="section-title">
            <h2>Contact Us</h2>
            <p>
              We want to hear from you. Please don't be shy and contact us if
              you need some clarity on our product, or want some advice.
            </p>
          </div>
          <div>
            <div className="row-contact">
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="Name"
                    required
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                  <p className="help-block text-danger"></p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="phone"
                    id="phone"
                    name="phone"
                    className="form-control"
                    placeholder="Phone"
                    required
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                  />
                  <p className="help-block text-danger"></p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                  <p className="help-block text-danger"></p>
                </div>
              </div>
            </div>
            <div className="form-group">
              <textarea
                name="message"
                id="message"
                className="form-control"
                rows="4"
                placeholder="Message"
                required
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              ></textarea>
              <p className="help-block text-danger"></p>
            </div>
            <SuccessMessage message={successMessage} />
            <ErrorMessage message={errorMessage} />
            <button
              onClick={() => {
                handleSend();
              }}
              className="btn-custom-contact"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
