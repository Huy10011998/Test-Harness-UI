import React from "react";
import "./styles.css";

const SuccessMessage = React.memo(({ message = "" }) => {
  return message ? (
    <React.Fragment>
      <div className="success__container">
        <div className="success__message">{message}</div>
      </div>
    </React.Fragment>
  ) : (
    <React.Fragment />
  );
});

export { SuccessMessage };
