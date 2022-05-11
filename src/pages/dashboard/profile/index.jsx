import React from "react";
import AdminLayout from "../../../components/AdminLayout/AdminLayout";

export default function Profile() {
  return (
    <AdminLayout>
      <div className="content-first">
        <div className="profile-title">
          <h5>Your Profile</h5>
        </div>

        <div className="row">
          <div className="col-xl-6 col-md-6 col-lg-6 col-sm-12 col-xs-12 first-name">
            <label className="custom-label" htmlFor="">
              First Name
            </label>
            <input className="custom-input" type="text" placeholder="Gaurav" />
          </div>
          <div className="col-xl-6 col-md-6 col-lg-6 col-sm-12 col-xs-12 last-name">
            <label className="custom-label" htmlFor="">
              LAST NAME
            </label>
            <input className="custom-input" type="text" placeholder="Kumar" />
          </div>
          <div className="col-xl-6 col-md-6 col-lg-6 col-sm-12 col-xs-12 password">
            <label className="custom-label" htmlFor="">
              PASSWORD
            </label>
            <input className="custom-input" type="password" />
          </div>
          <div className="col-xl-6 col-md-6 col-lg-6 col-sm-12 col-xs-12 confirm-password">
            <label className="custom-label" htmlFor="">
              CONFIRM PASSWORD
            </label>
            <input className="custom-input" type="password" />
          </div>
          <div className="update-button">
            <button className="btn btn-update">UPDATE PROFILE</button>
          </div>
        </div>
      </div>
      <div className="content-second">
        <div className="profile-title-status">
          <h5>Your Subscription</h5>
        </div>
        <div className="profile-sub-status">
          You are currently subscribed to the Entrepreneur package .Your next
          billing date is on 22/01/2022
        </div>
        <div className="action-buttons">
          <button className="btn btn-change">CHANGE SUBSCRIPTION</button>
          <button className="btn btn-default btn-cancel">
            CANCEL SUBSCRIPTION
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
