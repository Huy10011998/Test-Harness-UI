import React from "react";
import "./styles.css";

const ErrorStatus = ({ status = "" }) => {
  return status ? (
    <React.Fragment>
      <div className="error__container">
        <div className="error__message">{status}</div>
      </div>
    </React.Fragment>
  ) : (
    <React.Fragment />
  );
};

export { ErrorStatus };
