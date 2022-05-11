import React from "react";

export const Chat = (props) => {
  return (
    <React.Fragment>
      <div id="chat">
        <div className="iticks-pop-button">
          <img
            alt=""
            className="chat-icon"
            style={{ width: "32px", height: "32px", margin: "16px" }}
            src="https://cdn.intelliticks.com/prod/common/assets/chat_icon.png"
          />
          <div className="iticks-badge-container" style={{ display: "none" }}>
            <div className="iticks-badge-num">1</div>
          </div>
        </div>
        <div>
          <div className="iticks-modal" style={{ display: "none" }}>
            <span className="iticks-modal-close" title="Close">
              ×
            </span>
            <img alt="" className="iticks-modal-img iticks-modal-content" />
          </div>
        </div>
        <div
          className="iticks-frame-container iticks-hidden"
          // style="position: fixed; display: block; background: transparent; z-index: 2147483646; box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 15px 0px;"
        ></div>
      </div>
<<<<<<< HEAD
      <div
        className="iticks-frame-container iticks-hidden"
        // style="position: fixed; display: block; background: transparent; z-index: 2147483646; box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 15px 0px;"
      ></div>
    </div>
=======
    </React.Fragment>
>>>>>>> 7d9fcf31c9a9e394e8fec0f2a88022bcf69e32a8
  );
};
