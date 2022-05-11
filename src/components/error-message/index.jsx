import React from "react";
import "./styles.css";

const ErrorMessage = React.memo(({ message = "" }) => {
  return message ? (
    <React.Fragment>
      <div className="error__container">
        <div className="error__message">{message}</div>
      </div>
    </React.Fragment>
  ) : (
    <React.Fragment />
  );
});

export { ErrorMessage };
