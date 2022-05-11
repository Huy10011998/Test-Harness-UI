import React from "react";

export const Gallery = (props) => {
  return (
    <React.Fragment>
      <div id="gallery">
        <div className="intro-gallery">
          <div className="container">
            <div className="text-title">
              <h2>Test-Harness</h2>
            </div>
            <div className="text-content">
              <p>
                Join the hundreds of businesses that count on us every day. Join
                hands with us today!
              </p>
            </div>
            <div className="button-contact">
              <ul>
                <li>
                  <a href="/login" className="page-scroll">
                    Login
                  </a>
                </li>
                <li>
                  <a href="/signup" className="page-scroll">
                    Sign Up
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
