import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHighlighter,
  faInbox,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import configuration from "react-global-configuration";
import { getSuccessNotificationMessage } from "../../Helper/NotificationMessage";
import { createNotification } from "react-redux-notify";
import { authContext } from "../../account/auth/AuthProvider";
import AccountModal from "../../account/auth/AccountModal";

const HeaderIndex = (props) => {
  const [headerState, setHeaderState] = useState({
    top: true,
    scrollState: null,
    hideNavbar: null,
    showlistMobile: false,
  });

  let last_scroll_top = 0;

  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    setWalletAddress(localStorage.getItem("wallet_address"));
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    let scroll_top = window.scrollY;

    if (window.pageYOffset == 0) {
      setHeaderState({
        ...headerState,
        top: true,
        scrollState: false,
      });
    } else if (scroll_top < last_scroll_top) {
      setHeaderState({
        ...headerState,
        top: false,
        scrollState: false,
      });
    } else {
      setHeaderState({
        ...headerState,
        top: false,
        scrollState: true,
      });
    }
    last_scroll_top = scroll_top;
  };

  const handleNavbarToggle = () => {
    setHeaderState((prev) => ({
      ...headerState,
      showlistMobile: !prev.showlistMobile,
    }));
  };

  const handleNavListClose = () => {
    setHeaderState({
      ...headerState,
      showlistMobile: false,
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    const notificationMessage = getSuccessNotificationMessage(
      "text copied to clipboard"
    );
    props.dispatch(createNotification(notificationMessage));
  };

  const { auth } = useContext(authContext);

  const [accountModalStatus, setAccountModalStatus] =
    useState(false);

  const handleAccountModalClose = () => setAccountModalStatus(false);
  const handleAccountModalOpen = () => setAccountModalStatus(true);

  useEffect(() => {
    if (accountModalStatus) {
      document.body.classList.add("noBodyOverflow");
    } else {
      document.body.classList.remove("noBodyOverflow");
    }
  }, [accountModalStatus]);

  return (
    <>
      <header
        className={`header animated headroom--not-bottom ${
          headerState.top ? "headroom--top" : "headroom--not-top "
        } ${headerState.scrollState ? "slideUp" : "slideDown"} ${
          props.match.path == "/" ? "landing" : "not-landing"
        }`}
        id="site-header"
      >
        <div className="container">
          <div className="header-content-wrapper">
            <Link to="/" className="site-logo">
              <img
                src={configuration.get("configData.site_logo")}
                alt={configuration.get("configData.site_name")}
                className="woox-icon woox-logo"
              />
              {/* <svg className="woox-icon" viewBox="0 0 481.448 101.996">
                <path
                  d="M152.514 14.926c0 2.1-1.339 4.593-2.1 7.081L126.3 89.366c-2.487 7.654-8.229 11.673-14.543 11.673-6.889 0-12.056-4.019-15.309-11.673L76.162 43.822 55.877 89.366c-3.253 7.654-8.994 11.673-15.309 11.673-6.7 0-12.056-4.019-14.543-11.673L2.1 22.007C1.148 19.519 0 17.031 0 14.926A14.213 14.213 0 0 1 14.352.574c5.358 0 11.1 3.062 12.821 8.037l15.5 49.18L62.575 9.76C65.063 3.827 69.655.574 76.162.574c6.7 0 11.29 3.253 13.778 9.186l19.71 48.031 15.692-49.18c1.531-4.593 7.271-8.037 12.821-8.037a14.212 14.212 0 0 1 14.351 14.352zM263.69 51.285c0 34.253-29.853 50.711-51.667 50.711-22.006 0-51.859-16.458-51.859-50.711C160.164 17.223 190.016 0 212.022 0c21.815 0 51.668 17.223 51.668 51.285zm-73.292 0c0 14.352 9.568 24.3 21.624 24.3 11.864 0 21.624-9.951 21.624-24.3 0-14.926-9.759-24.877-21.624-24.877-12.055 0-21.622 9.951-21.622 24.877zm190.974 0c0 34.253-29.853 50.715-51.672 50.715-22.006 0-51.858-16.458-51.858-50.711C277.845 17.223 307.7 0 329.7 0c21.819 0 51.672 17.223 51.672 51.285zm-73.291 0c0 14.352 9.567 24.3 21.623 24.3 11.865 0 21.624-9.951 21.624-24.3 0-14.926-9.759-24.877-21.624-24.877-12.056 0-21.623 9.951-21.623 24.877zm173.367 36.932c0 7.271-6.7 13.4-13.97 13.4-4.4 0-7.846-2.3-10.716-5.55l-21.05-24.686-21.05 24.686c-2.87 3.253-6.123 5.55-10.716 5.55-7.08 0-13.97-6.124-13.97-13.4a12.074 12.074 0 0 1 3.254-8.229l25.45-28.9-25.45-28.9a12.348 12.348 0 0 1-3.062-8.037c0-7.463 6.89-13.586 13.97-13.586a13.062 13.062 0 0 1 10.716 5.549L435.712 30.8l20.859-24.676c2.87-3.444 6.315-5.549 10.907-5.549 6.89 0 13.778 6.124 13.778 13.586a12.352 12.352 0 0 1-3.062 8.037l-25.451 28.9 25.451 28.9a11.252 11.252 0 0 1 3.254 8.219z"
                  data-name="Слой 2"
                />
              </svg> */}
              {/* {configuration.get("configData.site_logo") && (
                 <img src={configuration.get("configData.site_logo")} alt={configuration.get("configData.site_name")} />
              )} */}
            </Link>

            <nav
              id="primary-menu"
              className="primary-menu flex-header ml-auto mr-5"
            >
              <a
                className="menu-icon-trigger-custom showhide justify-content-end"
                onClick={() =>
                  handleNavbarToggle(headerState.showlistMobile ? true : false)
                }
              >
                {/* <span className="mob-menu--title">Menu</span> */}
                <i className="fas fa-bars headerBars"></i>
              </a>

              <ul
                className={`primary-menu-menu primary-menu-indented scrollable  ${
                  headerState.showlistMobile ? "show" : ""
                }`}
              >
                <li onClick={handleNavListClose} className="ml-auto mx-sm-auto">
                  <Link to="/projects">Projects</Link>
                </li>
                <li onClick={handleNavListClose}>
                  <Link to="/staking">Staking</Link>
                </li>
                <li onClick={handleNavListClose}>
                  <a href="https://www.busdx.com/" target="_blank">
                    BUSDX
                  </a>
                </li>
                {/* <li onClick={handleNavListClose} className="ml-auto mx-sm-auto">
                  <Link to="/subscriptions">Subscribe</Link>
                </li> */}
                {/* <li onClick={handleNavListClose}>
                  <Link to="#" onClick={() => props.hanldeSubscriptionModal(true)}>Add Project</Link>
                </li> */}
                {auth.accounts.length > 0 && (
                  <li
                    className="wallet-address-badge"
                    // onClick={() => copyToClipboard()}
                  >
                    <div className="balance-wrapper">
                      <div className="balance">
                        <h6>{Number(auth.BUSDXTokenBalance).toLocaleString(undefined, {maximumFractionDigits:3})} BUSDX </h6>
                      </div>
                      <div className="account" onClick={() => handleAccountModalOpen()}>
                        <h6>
                          {auth.accounts.substr(0, 5)}...
                          {auth.accounts.substr(auth.accounts.length - 4)}
                        </h6>
                      </div>

                      {/* <div className="custom-tooltip">
                      <span>copy to clipboard</span>
                    </div> */}
                    </div>
                  </li>
                )}
              </ul>
            </nav>
            <Link to="/account/profile" className="header-account profile-icon">
              <svg className="woox-icon">
                <use xlinkHref="#icon-profile-1"></use>
              </svg>
            </Link>
          </div>
        </div>
      </header>
      {auth.authStatus && accountModalStatus && (
        <AccountModal 
          status={accountModalStatus}
          handleClose={handleAccountModalClose}
        />
      )}
    </>
  );
};

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(null, mapDispatchToProps)(HeaderIndex);
