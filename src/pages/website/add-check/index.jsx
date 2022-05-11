import React, { useState, useEffect } from "react";
import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import { IoMdSettings } from "react-icons/io";
import {
  MdOutlineChecklistRtl,
  MdOutlineFileDownload,
  MdCancel,
  MdOutlineSaveAlt,
  MdSettingsSuggest,
} from "react-icons/md";
import { BiLink } from "react-icons/bi";
import { RiDeleteBin7Fill, RiPlayListAddLine } from "react-icons/ri";
import { BiDuplicate } from "react-icons/bi";
import { TiFolderDelete } from "react-icons/ti";
import "./style.scss";
import PropTypes from "prop-types";

function AddCheck(props) {
  const [url, setUrl] = useState();
  return (
    <>
      <AdminLayout>
        <form>
          <div className="wrapper-content">
            <label className="label-title" htmlFor="">
              URL
            </label>
            <input
              onChange={(e) => setUrl(e.target.value)}
              type="text"
              value={url}
              placeholder="Start typing the URL e.g. "
            />
            <p>
              Well done! Test Harness downloaded content from
              <a href="http://harness.com">http://harness.com</a>
            </p>
          </div>

          <div className="wrapper-check-settings">
            <div className="label-setting">
              <IoMdSettings />
              <label className="label-title" htmlFor="">
                Check settings
              </label>
            </div>
            <div className="content-check-settings">
              <div className="wrapper-check-name">
                <label className="label-title" htmlFor="">
                  Check name
                </label>
                <input type="text" name="" id="" />
              </div>
              <div className="wrapper-URL">
                <label className="label-title" htmlFor="">
                  URL
                </label>
                <div className="content-url">
                  <input className="input-custom" gtype="text" value={url} />
                  <button className="content-open">
                    <BiLink />
                    Open URL
                  </button>
                </div>
              </div>
              <div className="wrapper-check-notice">
                <label className="label-title" htmlFor="">
                  Check notice
                </label>
                <textarea
                  placeholder="Enter check notice"
                  name=""
                  id=""
                  cols="30"
                  rows="1"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="wrapper-rules-settings">
            <div className="label-rules">
              <MdOutlineChecklistRtl />
              <label className="label-title" htmlFor="">
                Rules settings
              </label>
            </div>
            <div className="content-rules-settings">
              <select className="select-custom" name="" id="">
                <option disabled value="">
                  Basic checks
                </option>
                <option value="">Text on Page</option>
                <option value="">HTML on Page</option>
                <option value="">HTTP Status</option>
                <option value="">HTTP Header</option>
                <option value="">Redirect Location</option>
                <option disabled value="">
                  Semantic checks
                </option>
                <option value="">{"Page <title>"} </option>
                <option value="">{"<meta> description"}</option>
                <option value="">{"<meta> og:title"}</option>
                <option value="">{"<meta> og:description"}</option>
                <option value="">{"<meta> og:image"}</option>
                <option value="">{"<meta> og:image:height"}</option>
                <option value="">{"<meta> og:image:width"}</option>
                <option value="">{"<meta> og:type"}</option>
                <option value="">{"<meta> og:url"}</option>
                <option value="">{"<meta> og:site_name"}</option>
                <option value="">{"<meta> og:locale"}</option>
                <option value="">{"<meta> og:updated_time"}</option>
                <option value="">{"<meta> article:modified_time"}</option>
                <option value="">{"<meta> article:published_time"}</option>
                <option value="">{"<meta> article:publisher"}</option>
                <option value="">{"<meta> article:section"}</option>
                <option value="">{"<meta> article:tag"}</option>
                <option value="">{"<meta> twitter:title"}</option>
                <option value="">{"<meta> twitter:image"}</option>
                <option value="">{"<meta> twitter:image:alt"}</option>
                <option value="">{"<meta> twitter:description"}</option>
                <option value="">{"<meta> twitter:card"}</option>
                <option value="">{"<meta> twitter:site"}</option>
                <option value="">{"<meta> twitter:creator"}</option>
              </select>
              <select className="select-custom-1" name="" id="">
                <option value="">contains</option>
                <option value="">does not contain</option>
                <option value="">equals</option>
                <option value="">matches</option>
                <option value="">does not match</option>
              </select>
              <textarea name="" id="" cols="3" rows="1"></textarea>
              <button className="btn btn-download">
                <MdOutlineFileDownload style={{ fontSize: "15px" }} />
              </button>
              <button className="btn btn-bin">
                <RiDeleteBin7Fill style={{ fontSize: "15px" }} />
              </button>
            </div>
            <div className="actions-rule-settings">
              <button className="btn btn-add">
                <RiPlayListAddLine style={{ fontSize: "15px" }} />
                <p className="text-center">Add rule</p>
              </button>
              <button className="btn btn-duplicate">
                <BiDuplicate style={{ fontSize: "15px" }} />
                <p className="text-center">Duplicate last</p>
              </button>
            </div>
          </div>
          <div className="wrapper-latest-response">
            <div className="label-response">
              <TiFolderDelete />
              <label className="label-title" htmlFor="">
                Latest response
              </label>
            </div>
          </div>
          <div className="wrapper-advanced-options">
            <div className="label-advanced">
              <MdSettingsSuggest />
              <label className="label-title" htmlFor="">
                Advanced Options
              </label>
            </div>
            <div className="content-advanced">
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <label className="label-title" htmlFor="">
                    Extra HTTP headers
                  </label>
                  <textarea name="" id="" cols="30" rows="10"></textarea>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <div className="row">
                    <div
                      className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12
                    wrapper-accept"
                    >
                      <label className="label-title" htmlFor="">
                        Accept gzip encoding
                      </label>
                      <div className="radio-choose">
                        <input
                          className="custom-radio"
                          type="radio"
                          name=""
                          id=""
                        />
                        <label className="label-radio" htmlFor="">
                          Yes
                        </label>
                        <input
                          className="custom-radio"
                          type="radio"
                          name=""
                          id=""
                        />
                        <label className="label-radio" htmlFor="">
                          No
                        </label>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 wrapper-only">
                      <label className="label-title" htmlFor="">
                        Only IPv6
                      </label>
                      <div className="radio-choose">
                        <input
                          className="custom-radio"
                          type="radio"
                          name=""
                          id=""
                        />
                        <label className="label-radio" htmlFor="">
                          Yes
                        </label>
                        <input
                          className="custom-radio"
                          type="radio"
                          name=""
                          id=""
                        />
                        <label className="label-radio" htmlFor="">
                          No
                        </label>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                      <label className="label-title" htmlFor="">
                        Follow redirects
                      </label>
                      <div className="radio-choose">
                        <input
                          className="custom-radio"
                          type="radio"
                          name=""
                          id=""
                        />
                        <label className="label-radio" htmlFor="">
                          Yes
                        </label>
                        <input
                          className="custom-radio"
                          type="radio"
                          name=""
                          id=""
                        />
                        <label className="label-radio" htmlFor="">
                          No
                        </label>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                      <label className="label-title" htmlFor="">
                        Disable HTTP/2
                      </label>
                      <div className="radio-choose">
                        <input
                          className="custom-radio"
                          type="radio"
                          name=""
                          id=""
                        />
                        <label className="label-radio" htmlFor="">
                          Yes
                        </label>
                        <input
                          className="custom-radio"
                          type="radio"
                          name=""
                          id=""
                        />
                        <label className="label-radio" htmlFor="">
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="action-cache">
              <button className="btn btn-cache">
                <RiPlayListAddLine />
                <p className="text-center">Add no-cache headers</p>
              </button>
            </div>
          </div>
          <div className="action-savencancel">
            <button className="btn btn-cancel">
              <MdCancel style={{ fontSize: "15px" }} />
              <p className="text-center">Cancel</p>
            </button>
            <button className="btn btn-save">
              <MdOutlineSaveAlt style={{ fontSize: "15px" }} />
              <p className="text-center">Save check</p>
            </button>
          </div>
        </form>
      </AdminLayout>
    </>
  );
}

AddCheck.propTypes = {};

export default AddCheck;
