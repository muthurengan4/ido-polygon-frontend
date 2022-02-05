import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Base from "./Base";
import store from "./store";
import { createBrowserHistory as createHistory } from "history";
import "react-redux-notify/dist/ReactReduxNotify.css";
import ScrollToTop from "./Helper/ScrollToTop";
import LandingPageIndex from "./LandingPage/LandingPageIndex";
import AuthProvider from "./account/auth/AuthProvider";
import configuration from "react-global-configuration";
import { apiConstants } from "./Constant/constants";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

const App = () => {
  const getLibrary = (provider) => {
    const library = new Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
  };

  const [configLoading, setConfigLoading] = useState(true);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await fetch(apiConstants.settingsUrl);
      const configValue = await response.json();
      configuration.set({ configData: configValue.data }, { freeze: false });
      setConfigLoading(false);
    } catch (error) {
      configuration.set({ configData: [] }, { freeze: false });
      setConfigLoading(false);
    }
  };

  return (
    <Provider store={store}>
      <Router>
        <Web3ReactProvider getLibrary={getLibrary}>
          {!configLoading && (
            <AuthProvider>
              <ScrollToTop />
              <Base />
            </AuthProvider>
          )}
        </Web3ReactProvider>
      </Router>
    </Provider>
  );
};

export default App;
