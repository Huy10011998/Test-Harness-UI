import React from "react";
import { Footer } from "../home/footer";
import { Navigation } from "../home/navigation";
import "./styles.css";

const Career = () => {
  return (
    <React.Fragment>
      <Navigation />
      <div className="section__container">
        <div className="section___content">
          <div className="section__container__wrapper">
            <div className="section_banner">
              <h1>Careers</h1>
            </div>
            <div className="section_role">
              <div className="section__role">
                <label>Role</label>
                <strong>Senior Full-stack Javascript Developer</strong>
              </div>
              <div className="section__role">
                <label>Location</label>
                <span>Milton Keynes, United Kingdom</span>
              </div>
              <div className="section_item_role">
                {" "}
                We are looking for an experienced Senior Full-stack Javascript
                Developer to join our team. Your profile will be standout if
                you:{" "}
                <ul>
                  <li>Have 7+ years experience in development</li>
                  <li>
                    Able to architect something from scratch and drive the
                    development
                  </li>
                  <li>
                    Experience working collaboratively with UX, product
                    managers, other developers and testers.
                  </li>
                  <li>
                    Good knowledge of React - ideally Next.js, Node, GraphQL and
                    SSR.
                  </li>
                  <li>SQL or noSQL databases</li>
                </ul>
                <span>
                  In this role, you will support in the development of new
                  features, API's and tools that will enable the organisation to
                  continue to scale and grow globally. Please send your CV to{" "}
                  <a href="mailto:support@spoolersonline.com">
                    support@spoolersonline.com
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-career">
        <Footer />
      </div>
    </React.Fragment>
  );
};

export { Career };
