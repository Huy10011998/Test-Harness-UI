import React from "react";
import AdminLayout from "../../components/AdminLayout/AdminLayout";
import { useRouter } from "../../hooks/use-router";
import { URL_PAGE } from "../../common/constants";

import "./styles.scss";
const BookATester = React.memo(() => {
  const { history } = useRouter();

  const handleOnContinue = () => {
    history.push(URL_PAGE.PROFILE);
  };
  return (
    <AdminLayout>
      <div className="book__content">
        <div className="book__wrapper">
          <div className="book__title">Book A Tester</div>
          <div className="book__body">
            <div className="book__description">
              This feature is only available for Lite Package users or above
              that.
            </div>
            <div className="book__footer">
              <button className="book__button" onClick={handleOnContinue}>
                click here to upgrade your subscription!
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
});

export { BookATester };
