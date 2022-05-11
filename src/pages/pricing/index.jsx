import React, { useEffect, useState } from "react";
import { Navigation } from "../../pages/home/navigation";
import { Footer } from "../../pages/home/footer";
import "./styles.css";
import axios from "axios";
import { Link } from "react-router-dom";

export const Pricing = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://stageapi.test-harness.io/package/get`).then((res) => {
      const { data } = res.data;
      setData([...data]);
    });
  }, []);

  return (
    <React.Fragment>
      <Navigation />
      <div _ngcontent-kde-c45="" className="">
        <div _ngcontent-kde-c45="" className="section banner">
          <h1 _ngcontent-kde-c45="">Packages</h1>
        </div>
        <div _ngcontent-kde-c45="" id="packages" className="section packages">
          {data && data.length > 0
            ? data.map((item, index) => (
                <React.Fragment key={`${item.name}-${index}`}>
                  <div _ngcontent-kde-c45="" className="package_pricing">
                    <div _ngcontent-kde-c45="" className="package__title">
                      {item.name}
                    </div>
                    <div _ngcontent-kde-c45="" className="package__price">
                      <label _ngcontent-kde-c45="">GBP - MONTHLY FEE</label>
                      <h4 _ngcontent-kde-c45="">{item.price}</h4>
                    </div>
                    <div _ngcontent-kde-c45="" className="package__description">
                      <ul>
                        {item.data.map((item, index) => (
                          <li key={`${item.value}-${index}`}>{item.value}</li>
                        ))}
                      </ul>
                    </div>
                    <div _ngcontent-kde-c45="" className="package__action">
                      <Link
                        to={`/signup?package=${item._id}`}
                        _ngcontent-kde-c45=""
                        className="button"
                      >
                        Subscribe Now
                      </Link>
                    </div>
                  </div>
                </React.Fragment>
              ))
            : "loading"}
        </div>
        <div className="footer-pricing">
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};
