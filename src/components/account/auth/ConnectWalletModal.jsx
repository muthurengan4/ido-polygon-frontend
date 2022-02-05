import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../auth/AuthProvider";

const ConnectWalletModal = (props) => {
  const { status, handleConnectWalletClose } = props;

  const [width, setWidth] = useState(window.innerWidth);

  const { loginConnectors, handleConnector, activatingConnector } =
    useContext(authContext);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  return (
    <>
      <div
        id="authModal"
        className={`overflow-y-scroll connect-wallet-modal ${
          status ? "show" : null
        }`}
      >
        <div className="authModalWrapper no-padding">
          <div
            className="wrapper"
            onClick={() => handleConnectWalletClose()}
          ></div>
          <div
            className={`modal-body connect-wallet-modal-body form-wrapper form--dark col-lg-3 col-md-5 col-xs-11 col-sm-11 ${
              status ? "show" : null
            }`}
          >
            <div className="outside-scroll"></div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  no-padding ">
              <div className="headerwrapper">
                <h4 className="text-center text-capitalize primary-text">
                  Connect Wallet
                </h4>
                <div
                  className="modal-close"
                  onClick={() => handleConnectWalletClose()}
                >
                  <svg className="woox-icon">
                    <use xlinkHref="#icon-error-circle"></use>
                  </svg>
                </div>
              </div>
              <div className="custom-hr"></div>
              <div className="desclimer">
                <p className="mb-3">
                  By connecting a wallet, you agree to Xpad Terms of Service and
                  acknowledge that you have read and understand the Xpad
                  Protocol Disclaimer.
                </p>
              </div>
              <div className="wallet-content-box">
                {width > 576 && !loginConnectors.find(connectors => connectors.name == "MetaMask").isAvailable && (
                  <p className="text-danger mb-3"> <strong>NOTE : </strong>install MetaMask on desktop or visit from a dApp browser on mobile. </p>
                )}
                {loginConnectors.map((connectors, index) => (
                  <>
                    {width < 576 ? (
                      <>
                        {connectors.name != "MetaMask" && (
                          <div
                            className={`wallet-content ${
                              activatingConnector != undefined
                                ? "connecting-wallet"
                                : ""
                            }`}
                            key={index}
                          >
                            <button
                              disabled={
                                activatingConnector != undefined ? true : false
                              }
                              onClick={() =>
                                handleConnector(connectors.connectorFunction)
                              }
                            >
                              <div className="wallet-metamask-card">
                                <div className="wallet-metamask-left-sec">
                                  <div className="wallet-metamask-img-sec">
                                    <img
                                      src={
                                        window.location.origin + connectors.logo
                                      }
                                      alt={connectors.name}
                                    />
                                  </div>
                                  <div className="wallet-metamask-info-sec">
                                    <h4>{connectors.name}</h4>
                                  </div>
                                </div>
                                <div className="wallet-metamask-right-sec">
                                  {connectors.is_popular && <p>Popular</p>}
                                  {activatingConnector ===
                                    connectors.connectorFunction && (
                                    <div id="spinner"></div>
                                  )}
                                </div>
                              </div>
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <div
                        className={`wallet-content ${
                          activatingConnector != undefined
                            ? "connecting-wallet"
                            : ""
                        }`}
                        key={index}
                        // onClick={() =>
                        //   handleConnector(connectors.connectorFunction)
                        // }
                      >
                        <button
                          disabled={
                            activatingConnector != undefined ? true : false && !connectors.isAvailable
                          }
                          onClick={() =>
                            handleConnector(connectors.connectorFunction)
                          }
                        >
                          <div className="wallet-metamask-card">
                            <div className="wallet-metamask-left-sec">
                              <div className="wallet-metamask-img-sec">
                                <img
                                  src={window.location.origin + connectors.logo}
                                  alt={connectors.name}
                                />
                              </div>
                              <div className="wallet-metamask-info-sec">
                                <h4>{connectors.name}</h4>
                              </div>
                            </div>
                            <div className="wallet-metamask-right-sec">
                              {connectors.is_popular && <p>Popular</p>}
                              {activatingConnector ===
                                connectors.connectorFunction && (
                                <div id="spinner"></div>
                              )}
                            </div>
                          </div>
                        </button>
                      </div>
                    )}
                  </>
                ))}
                {/* <div className="wallet-content">
                    <div className="wallet-metamask-card">
                        <div className="wallet-metamask-left-sec">
                            <div className="wallet-metamask-img-sec">
                                <img src={window.location.origin + "/assets/img/metamask.svg"} alt="metamask" />
                            </div>
                            <div className="wallet-metamask-info-sec">
                                <h4>MetaMask</h4>
                            </div>
                        </div>
                        <div className="wallet-metamask-right-sec">
                            <p>Popular</p>
                        </div>
                    </div>
                </div>
                <div className="wallet-content">
                    <div className="wallet-metamask-card">
                        <div className="wallet-metamask-left-sec">
                            <div className="wallet-metamask-img-sec">
                                <img src={window.location.origin + "/assets/img/metamask.svg"} alt="metamask" />
                            </div>
                            <div className="wallet-metamask-info-sec">
                                <h4>WalletConnect</h4>
                            </div>
                        </div>
                        <div className="wallet-metamask-right-sec">
                            <p>Popular</p>
                        </div>
                    </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConnectWalletModal;
