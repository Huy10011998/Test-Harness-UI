import React from "react";
import { Link } from "react-router-dom";
import { URL_PAGE } from "../../common/constants";

export const Footer = (props) => {
  return (
    <React.Fragment>
      <footer>
        <div id="footer">
          <div className="intro-footer">
            <div className="text-left-footer">
              <p>
                Copyright © 2022 Spoolers <br />
                Solutions Limited. All rights reserved.
              </p>
            </div>
            <div className="text-right-footer">
              <Link to={URL_PAGE.CAREER}>Careers</Link>
              <div className="col-items-footer1">
                <Link to={URL_PAGE.PRIVACY}>Privacy</Link>
                {/* <Link to={URL_PAGE.TERMS_AND_CONDITIONS}>T & C</Link> */}
              </div>
              <div className="col-items-footer1">
                <Link to={URL_PAGE.TERMS_AND_CONDITIONS}>T & C</Link>
              </div>
              {/* <div className="col-items-footer">
                <Link to={URL_PAGE.SOFTWARE_QUALITY_ASSURANCE}>
                  Quality Assurance
                </Link>
                <Link to={URL_PAGE.SOFTWARE_TESTING}>Software Testing</Link>
                <Link to={URL_PAGE.WEBSITE_TESTING}>Website Testing</Link>
              </div>
              <Link to={URL_PAGE.ABOUT_US}>About Us</Link> */}
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};
