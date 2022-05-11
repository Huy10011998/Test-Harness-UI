import React from "react";
import AdminLayout from "../../components/AdminLayout/AdminLayout";
import { useRouter } from "../../hooks/use-router";
import { URL_PAGE } from "../../common/constants";

import "./styles.scss";
const TestExecutionReport = React.memo(() => {
  const { history } = useRouter();

  const handleOnContinue = () => {
    history.push(URL_PAGE.PROFILE);
  };
  return (
    <AdminLayout>
      <div className="testexecution__content">
        <div className="testexecution__wrapper">
          <div className="testexecution__title">Test Execution Reports</div>
          <div className="testexecution__body">
            <div className="testexecution__description">
              This feature is only available for Lite Package users or above
              that.
            </div>
            <div className="testexecution__footer">
              <button
                className="testexecution__button"
                onClick={handleOnContinue}
              >
                click here to upgrade your subscription!
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
});

export { TestExecutionReport };
