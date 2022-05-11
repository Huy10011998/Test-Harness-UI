import React from "react";
import AdminLayout from "../../components/AdminLayout/AdminLayout";
import { useRouter } from "../../hooks/use-router";
import { URL_PAGE } from "../../common/constants";

import "./styles.scss";

const TestCase = React.memo(() => {
  const { history } = useRouter();

  const handleOnContinue = () => {
    history.push(URL_PAGE.PROFILE);
  };

  return (
    <AdminLayout>
      <div className="testcase__content">
        <div className="testcase__wrapper">
          <div className="testcase__title">Test Cases</div>
          <div className="testcase__body">
            <div className="testcase__description">
              This feature is only available for Lite Package users or above
              that.
            </div>
            <div className="testcase__footer">
              <button className="testcase__button" onClick={handleOnContinue}>
                click here to upgrade your subscription!
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
});

export { TestCase };
