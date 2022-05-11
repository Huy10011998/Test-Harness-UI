import React from "react";
import AdminLayout from "../../components/AdminLayout/AdminLayout";
import { useRouter } from "../../hooks/use-router";
import { URL_PAGE } from "../../common/constants";

import "./styles.scss";

const Functionality = React.memo(() => {
  const { history } = useRouter();

  const handleOnContinue = () => {
    history.push(URL_PAGE.PROFILE);
  };
  return (
    <AdminLayout>
      <div className="functionality__content">
        <div className="functionality__wrapper">
          <div className="functionality__title">Functiobality Testing</div>
          <div className="functionality__body">
            <div className="functionality__description">
              This feature is only available for Lite Package users or above
              that.
            </div>
            <div className="functionality__footer">
              <button
                className="functionality__button"
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

export { Functionality };
