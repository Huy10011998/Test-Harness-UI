import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { URL_PAGE } from "../../common/constants";

const Package = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://stageapi.test-harness.io/package/get`).then((res) => {
      const { data } = res.data;
      setData([...data]);
    });
  }, []);

  return (
    <React.Fragment>
      <div className="section-package">
        <div className="package-header">
          <div className="package-title">Packages</div>
          <div className="package-sub">
            <p>
              Select one of our packages below to start receiving our top QA
              services. If you are not sure about which package to buy, check
              out our <Link to={URL_PAGE.PRICING}>Pricing Plans</Link> or{" "}
              <a href="#contact">Contact Us</a> if you have any specific
              requirements.
            </p>
            {/* <p>&nbsp;if you have any specific requirements.</p> */}
          </div>
        </div>
        <div className="package-content">
          {data
            ? data.map((item, index) => (
                <React.Fragment key={`${item.name}-${index}`}>
                  <Link
                    to={`/signup?package=${item._id}`}
                    className="package-item"
                  >
                    <div className="item-title-top">{item.name}</div>
                    <div className="item-title-bottom">
                      {/* <label _ngcontent-kde-c45="">GBP - MONTHLY FEE</label> */}
                      {item.code === "entrepreneur" ? <p>Free Trial</p> : null}
                      <p>
                        {item.code === "entrepreneur" ? "Then For " : ""}£
                        {item.price} / month
                      </p>
                    </div>
                  </Link>
                </React.Fragment>
              ))
            : "loading"}
        </div>
      </div>
    </React.Fragment>
  );
};

export { Package };
