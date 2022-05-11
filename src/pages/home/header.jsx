import React from "react";
import { Link } from "react-router-dom";
import { URL_PAGE } from "../../common/constants";

export const Header = (props) => {
  return (
    <React.Fragment>
      <header id="header">
        <div className="intro">
          <div className="intro-text">
            <h1>
              {props.data ? props.data.title : "Loading"}
              <span></span>
            </h1>
            <p>{props.data ? props.data.paragraph : "Loading"}</p>
            <Link to={URL_PAGE.REGISTER}>Start Your Free trial</Link>{" "}
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};
