import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Navigation = (props) => {
  const [collapse, setCollapse] = useState(false);

  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 767) {
        setCollapse(false);
      } else {
        setCollapse(true);
      }
    };

    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container-navigation">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
            onClick={handleCollapse}
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <div className="pd-img-navigation">
            <Link to="/">
              <img
                src="../img/duanmoi.png"
                alt=""
                width={243}
                height={44}
              ></img>
            </Link>{" "}
          </div>
        </div>
        <div
          className={`${collapse ? "collapse" : ""} nav-collapse`}
          id="bs-example-navbar-collapse-1"
        >
          <div className="pd-right">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="/" className="page-scroll">
                  Home
                </a>
              </li>
              <li>
                <Link to="/pricing" className="page-scroll">
                  Pricing
                </Link>
              </li>
              <li>
                <a href="/#contact" className="page-scroll">
                  Contact Us
                </a>
              </li>
              <li className="btn-bor-lg-sig">
                <Link to="/login">Login</Link>
              </li>
              <li className="btn-bor-lg-sig">
                <Link to="/signup">Sign Up</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
