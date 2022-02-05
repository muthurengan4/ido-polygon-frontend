import React, { useContext, useEffect, useState } from "react";
import { authContext } from "./AuthProvider";
import { getSuccessNotificationMessage } from "../../Helper/NotificationMessage";
import { createNotification } from "react-redux-notify";
import configuration from "react-global-configuration";
import { useDispatch } from "react-redux";
import ProfileActionConfirmation from "../profile/ProfileActionConfirmation";

const AccountModal = (props) => {
  const { status, handleClose } = props;

  const { auth, context, supportedChains, hanldeLogout } =
    useContext(authContext);

  const dispatch = useDispatch();

  const [logoutConfirmation, setLogoutConfirmation] = useState(false);

  const copyToClipboard = (walletAddress) => {
    navigator.clipboard.writeText(walletAddress);
    const notificationMessage = getSuccessNotificationMessage(
      "Wallet address copied"
    );
    dispatch(createNotification(notificationMessage));
  };

  const handleLogoutConfirmation = (status) => {
    setLogoutConfirmation(status);
  };

  return (
    <>
      <div
        id="authModal"
        className={`overflow-y-scroll account-details-modal ${
          status ? "show" : null
        }`}
      >
        <div className="authModalWrapper no-padding">
          <div className="wrapper" onClick={() => handleClose()}></div>
          <div
            className={`modal-body connect-wallet-modal-body form-wrapper form--dark col-lg-4 col-md-6 col-xs-10 col-sm-10 ${
              status ? "show" : null
            }`}
          >
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  no-padding ">
              <div className="headerwrapper">
                <h4 className="text-center text-capitalize primary-text">
                  Account Details
                </h4>
                <div className="modal-close" onClick={() => handleClose()}>
                  <svg className="woox-icon">
                    <use xlinkHref="#icon-error-circle"></use>
                  </svg>
                </div>
              </div>
              <div className="custom-hr"></div>
              <div className="account-details-wrapper">
                <div className="account-details">
                  <div className="wallet-address">
                    <h4>
                      {auth.accounts.substr(0, 15)}...
                      {auth.accounts.substr(auth.accounts.length - 4)}
                    </h4>
                    <div onClick={() => copyToClipboard(auth.accounts)}>
                      <p className="copyu">
                        <i className="far fa-copy"></i> Copy to clipboard
                      </p>
                    </div>
                  </div>
                  <div className="balance-details">
                    <div className="token">
                      <h6>
                        {configuration.get("configData.currency")} Token balance
                        :
                      </h6>
                      <h6>
                        {Number(auth.BUSDXTokenBalance).toLocaleString(undefined, {maximumFractionDigits:3})} {" "}
                        {configuration.get("configData.currency")}{" "}
                      </h6>
                    </div>
                    <div className="token">
                      <h6>
                        BUSD balance
                        :
                      </h6>
                      <h6>
                        {Number(auth.BUSDTokenBalance).toLocaleString(undefined, {maximumFractionDigits:3})} {" "}
                        BUSD
                      </h6>
                    </div>
                    <div className="token">
                      <h6>
                        {context.chainId &&
                          supportedChains.find((supportedChains) =>
                            supportedChains.chainId.find(
                              (chains) => chains == context.chainId
                            )
                          ).symbol}{" "}
                        Balance :
                      </h6>
                      <h6>
                        {Number(auth.ethBalance).toLocaleString(undefined, {maximumFractionDigits:4})} {" "}
                        {context.chainId &&
                          supportedChains.find((supportedChains) =>
                            supportedChains.chainId.find(
                              (chains) => chains == context.chainId
                            )
                          ).symbol}
                      </h6>
                    </div>
                  </div>
                  <div className=" text-center">
                    <button
                      className="btn btn--small btn--primary text-capitalize mt-3"
                      onClick={() => handleLogoutConfirmation(true)}
                    >
                      logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProfileActionConfirmation
        status={logoutConfirmation}
        onClose={handleLogoutConfirmation}
        warningMessage="Are you sure, want to logout.?"
        confirmMessage="logout"
        onConfirm={hanldeLogout}
      />
    </>
  );
};

export default AccountModal;
