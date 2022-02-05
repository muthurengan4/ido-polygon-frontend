import React, { useState } from "react";
import { saveSubPaymentCryptoStart } from "../store/actions/SubscriptionAction";
import Web3 from "web3";
import { connect } from "react-redux";
import configuration from "react-global-configuration";
import { getErrorNotificationMessage } from "../Helper/NotificationMessage";
import { createNotification } from "react-redux-notify";

const SubscriptionCard = (props) => {
  const { index, sub, account, token, tokenBalance } = props;

  const [buttonContentSubscription, setButtonContentSubscription] =
    useState("");

  const tokenSymbol = configuration.get("configData.currency");

  const handleSubmit = async (event, sub) => {
    event.preventDefault();
    const NumberOfToken = (sub.amount * 10 ** 18).toString();
    setButtonContentSubscription(
      "Send " + tokenSymbol + " Token to LaunchPad..."
    );
    try {
      const sendTokenToAddress = await token.methods
        .approve(account, NumberOfToken)
        .send({ from: account })
        .on("receipt", (receipt) => {
          console.log("Approve hash", receipt);
          const adminWalletAddress = configuration.get(
            "configData.admin_wallet_address"
          );
          token.methods
            .transferFrom(
              account,
              adminWalletAddress, // Admin wallet address
              NumberOfToken
            )
            .send({
              from: account,
            })
            .on("receipt", (receipt) => {
              console.log("Loading the transaction....", receipt);
              setButtonContentSubscription("");
              props.dispatch(
                saveSubPaymentCryptoStart({
                  subscription_id: sub.subscription_id,
                  payment_id: receipt.transactionHash,
                  from_wallet_address: account,
                })
              );
            }).on("error", (error) => {
              let notificationMessage;
              if (error.message == undefined) {
                notificationMessage = getErrorNotificationMessage(
                  "Unexpected error occuried, Please try again..."
                );
              } else {
                notificationMessage = getErrorNotificationMessage(error.message);
              }
              props.dispatch(createNotification(notificationMessage));
              setButtonContentSubscription("");
            });
        }).on("error", (error) => {
          let notificationMessage;
          if (error.message == undefined) {
            notificationMessage = getErrorNotificationMessage(
              "Unexpected error occuried, Please try again..."
            );
          } else {
            notificationMessage = getErrorNotificationMessage(error.message);
          }
          props.dispatch(createNotification(notificationMessage));
          setButtonContentSubscription("");
        });

      console.log("sendTokenToAddress", sendTokenToAddress);
    } catch (error) {
      const notificationMessage = getErrorNotificationMessage(
        "Something went wrong. Please refresh the page and try again."
      );
      props.dispatch(createNotification(notificationMessage));
      setButtonContentSubscription("");
    }
  };

  return (
    <>
      <div
        className="col-lg-12 col-md-12 col-sm-12 col-xs-12  no-padding "
        key={index}
      >
        <div className="crumina-module crumina-pricing-table pricing-table--style1 light-subs-bg sameHeight">
          <p className="pricing-title c-primary text-capitalize custom-letter-spacing text-bold">
            {sub.title}
          </p>
          <div className="custom-hr"></div>
          <div className="custom-stack-details">
            <div className="req-wrapper">
              <p className="text-center">{sub.description}</p>
            </div>
            <div className="req-wrapper">
              <p className="text-center text-capitalize text-bold whitecolor">
                validity :
                <span className="text-center c-primary custom-letter-spacing font-bold ml-2 text-bold">
                  {sub.plan_formatted}
                </span>
              </p>
            </div>
            <div className="req-wrapper">
              <p className="text-center text-capitalize text-bold whitecolor">
                Projects :
                <span className="text-center c-primary custom-letter-spacing font-bold ml-2 text-bold">
                  {sub.no_of_projects}
                </span>
              </p>
            </div>
            <div className="req-wrapper">
              <h5 className="text-center c-primary letter-2">
                {sub.amount_formatted}
              </h5>
            </div>
            {/* <div className="req-wrapper d-flex justify-content-around">
              {sub.is_free == 1 ? (
                <div className="statusWrapper free ">
                  <div className="dot free"></div>
                  <p className="mb-0 text-capitalize ml-2 mr-2">
                    Free
                  </p>
                </div>
              ) : (
                <div className="statusWrapper paid ">
                  <div className="dot paid"></div>
                  <p className="mb-0 text-capitalize ml-2 mr-2">
                    paid
                  </p>
                </div>
              )}
              {sub.is_popular == 1 && (
                <div className="statusWrapper popular ">
                  <div className="dot popular"></div>
                  <p className="mb-0 text-capitalize ml-2 mr-2">
                    popular
                  </p>
                </div>
              )}
            </div>
            <div className="req-wrapper">
              <p className="text-center text-capitalize text-bold whitecolor">
                total users :
                <span className="text-center c-primary custom-letter-spacing font-bold ml-2 text-bold">
                  {sub.total_subscribers}
                </span>
              </p>
            </div> */}
            <div className="custom-hr mb-3"></div>
          </div>
          <div className="w-100 d-flex justify-content-center">
            {window.web3.utils.fromWei(tokenBalance, "Ether") >= sub.amount ? (
              <button
                type="button"
                className="btn btn--small btn--primary  blacktext"
                onClick={(event) => handleSubmit(event, sub)}
                disabled={buttonContentSubscription !== "" ? true : false}
              >
                <>
                  {buttonContentSubscription !== ""
                    ? buttonContentSubscription
                    : "Subscribe"}{" "}
                </>
              </button>
            ) : (
              <a target="_blank" href={configuration.get("configData.exchange_url")}><span className="text-uppercase">Add Token to Wallet</span></a>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapDispatchToProps)(SubscriptionCard);
