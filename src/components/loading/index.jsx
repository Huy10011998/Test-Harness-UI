import React from "react";
import LoadingAnimation from "./loading-animation.svg";
import "./styles.css";

const Loading = () => {
  return (
    <React.Fragment>
      <div className="loading-wrapper">
        <img src={LoadingAnimation} alt="loading" />
      </div>
    </React.Fragment>
  );
};

export { Loading };
