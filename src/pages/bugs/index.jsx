import React from "react";
import AdminLayout from "../../components/AdminLayout/AdminLayout";
import { useRouter } from "../../hooks/use-router";
import { URL_PAGE } from "../../common/constants";

import "./styles.scss";

const Bugs = React.memo(() => {
  const { history } = useRouter();

  const handleOnContinue = () => {
    history.push(URL_PAGE.PROFILE);
  };

  return (
    <AdminLayout>
      <div className="bugs__content">
        <div className="bugs__wrapper">
          <div className="bugs__title">Bugs</div>
          <div className="bugs__body">
            <div className="bugs__description">
              This feature is only available for Lite Package users or above
              that.
            </div>
            <div className="bugs__footer">
              <button className="bugs__button" onClick={handleOnContinue}>
                click here to upgrade your subscription!
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
});

export { Bugs };
