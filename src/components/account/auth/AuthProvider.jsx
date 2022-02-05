import React, { createContext, useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { MetaMask, walletconnect } from "./connectors";
import { useEagerConnect, useInactiveListener } from "./web3Hooks";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from "@web3-react/walletconnect-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from "@web3-react/frame-connector";
import { UnsupportedChainIdError } from "@web3-react/core";
import {
  getErrorNotificationMessage,
  getSuccessNotificationMessage,
} from "../../Helper/NotificationMessage";
import { createNotification } from "react-redux-notify";
import { useDispatch, useSelector } from "react-redux";
import { InjectedConnector } from "@web3-react/injected-connector";
import { userLoginStart } from "../../store/actions/UserAction";
import Token from "../../../abis/Token.json";
import Web3 from "web3";
import configuration from "react-global-configuration";
import { formatEther } from "@ethersproject/units";

export const authContext = createContext({});

const AuthProvider = ({ children }, props) => {
  const context = useWeb3React();
  const dispatch = useDispatch();
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = context;

  const { ethereum } = window;

  const netID = configuration.get("configData.network_id")
    ? Number(configuration.get("configData.network_id"))
    : 56;

  const chainIdHex = configuration.get("configData.chain_id_hexacode")
    ? configuration.get("configData.chain_id_hexacode")
    : "0x38";

  const rpcUrl = configuration.get("configData.rpc_url")
    ? configuration.get("configData.rpc_url")
    : "https://data-seed-prebsc-1-s1.binance.org:8545/";

  const chainName = configuration.get("configData.chain_name")
    ? configuration.get("configData.chain_name")
    : "Binance - Testnet";


  const nativeCurrencyName = configuration.get("configData.native_currency_name")
    ? configuration.get("configData.native_currency_name")
    : "Binace";

  const nativeCurrencySymbol = configuration.get("configData.native_currency_symbol")
    ? configuration.get("configData.native_currency_symbol")
    : "BNB";


  const nativeCurrencyDecimals = configuration.get("configData.native_currency_decimals")
    ? Number(configuration.get("configData.native_currency_decimals"))
    : 18;

  const blockExplorerUrl = configuration.get("configData.block_explorer_urls")
    ? configuration.get("configData.block_explorer_urls")
    : "https://testnet.bscscan.com";

  const tokenContractAddress = configuration.get("configData.lp_contract_address");

  const projectContractAddress = configuration.get("configData.project_contract_address");

  const [activatingConnector, setActivatingConnector] = useState();

  const [auth, setAuth] = useState({
    loading: true,
    accounts: "",
    connectWalletStatus: false,
    ethBalance: null,
    BUSDTokenData: null,
    BUSDTokenBalance: null,
    BUSDXTokenData: null,
    BUSDXTokenBalance: null,
    userId: null,
    userUniqueId: null,
    userPicture: null,
    logoutStatus: localStorage.getItem("inital_connect"),
  });

  const loginData = useSelector((state) => state.users.loginInputData);

  const supportedChains = [
    {
      chainId: [56, 97],
      name: "Binance",
      symbol: "BNB",
      isTestNet: false,
    },
  ];

  const loginConnectors = [
    {
      name: "MetaMask",
      logo: "/assets/img/wallet-img/metamask.svg",
      is_popular: true,
      isAvailable: window.ethereum != undefined,
      connectorFunction: MetaMask,
    },
    {
      name: "WalletConnect",
      logo: "/assets/img/wallet-img/wallet-connect.png",
      is_popular: false,
      isAvailable: true,
      connectorFunction: walletconnect,
    },
  ];

  useEffect(() => {
    if (
      activatingConnector &&
      activatingConnector === connector &&
      !auth.loading
    ) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector, auth.loading]);

  const handleConnector = (connector) => {
    const network =
      ethereum && ethereum.networkVersion ? ethereum.networkVersion : "";
    // console.log(netID, network);

    setAuth({
      ...auth,
      loading: true,
      connectWalletStatus: true,
    });

    setActivatingConnector(connector);
    if (connector instanceof WalletConnectConnector) {
      connector.walletConnectProvider = undefined;
    }

    if (connector instanceof InjectedConnector) {
      if (netID == network) {
        console.log("same network");
        activate(connector);
      } else {
        console.log("change network");
        changeNetwork();
      }
    } else {
      activate(connector);
    }
  };

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect(auth.logoutStatus);

  const changeNetwork = async () => {
    // MetaMask injects the global API into window.ethereum
    if (ethereum) {
      try {
        // check if the chain to connect to is installed

        await window.ethereum
          .request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: chainIdHex }], // chainId must be in hexadecimal numbers
          })
          .then(() => {
            activate(MetaMask);
          })
          .catch((e) => {
            if (e.code === 4902) {
              addNetwork();
            } else {
              setActivatingConnector(undefined);
              const notificationMessage = getErrorNotificationMessage(
                e.message
              );
              dispatch(createNotification(notificationMessage));
            }
          });
        //await ethereum.enable();
      } catch (error) {
        // This error code indicates that the chain has not been added to MetaMask
        // if it is not, then install it into the user MetaMask
        if (error.code === 4902) {
          addNetwork();
        }
      }
    } else {
      // if no window.ethereum then MetaMask is not installed
    }
  };

  const addNetwork = async () => {
    try {
      await window.ethereum
        .request({
          method: "wallet_addEthereumChain",
          params: [
            {
              //https://data-seed-prebsc-1-s1.binance.org:8545/
              chainId: chainIdHex,
              rpcUrls: [rpcUrl],
              chainName: chainName,
              nativeCurrency: {
                name: nativeCurrencyName,
                symbol: nativeCurrencySymbol, // 2-6 characters long
                decimals: nativeCurrencyDecimals,
              },
              blockExplorerUrls: [
                blockExplorerUrl,
              ],
            },
          ],
        })
        .then(() => {
          activate(MetaMask);
        })
        .catch((e) => {
          setActivatingConnector(undefined);
          const notificationMessage = getErrorNotificationMessage(e.message);
          dispatch(createNotification(notificationMessage));
        });
      // await ethereum.enable();
    } catch (addError) {
      const notificationMessage = getErrorNotificationMessage(addError);
      dispatch(createNotification(notificationMessage));
    }
  };

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !activatingConnector);

  function getErrorMessage(error) {
    setAuth({
      ...auth,
      loading: false,
      connectWalletStatus: false,
    });

    if (error instanceof NoEthereumProviderError) {
      const notificationMessage = getErrorNotificationMessage(
        "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile."
      );
      dispatch(createNotification(notificationMessage));
    } else if (error instanceof UnsupportedChainIdError) {
      // const notificationMessage = getErrorNotificationMessage(
      //   "You're connected to an unsupported network."
      // );
      // dispatch(createNotification(notificationMessage));
    } else if (
      error instanceof UserRejectedRequestErrorInjected ||
      error instanceof UserRejectedRequestErrorWalletConnect ||
      error instanceof UserRejectedRequestErrorFrame
    ) {
      const notificationMessage = getErrorNotificationMessage(
        "User rejected the request"
      );
      dispatch(createNotification(notificationMessage));
    } else {
      const notificationMessage = getErrorNotificationMessage(
        "An unknown error occurred. Check the console for more details"
      );
      dispatch(createNotification(notificationMessage));
    }
  }

  useEffect(() => {
    if (error) {
      getErrorMessage(error);
    }
  }, [error]);

  useEffect(() => {
    if (
      netID !== chainId &&
      chainId &&
      connector instanceof InjectedConnector
    ) {
      deactivate();
    } else if (connector instanceof InjectedConnector) {
      activate(MetaMask);
    }
  }, [chainId]);

  const hanldeLogout = () => {
    setAuth({
      ...auth,
      loading: false,
      accounts: "",
      connectWalletStatus: false,
      ethBalance: null,
      authStatus: false,
      chainStatus: false,
      BUSDTokenData: null,
      BUSDTokenBalance: null,
      BUSDXTokenData: null,
      BUSDXTokenBalance: null,
      userId: null,
      userUniqueId: null,
      userPicture: null,
      logoutStatus: "false",
    });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userLoginStatus");
    localStorage.removeItem("user_picture");
    localStorage.removeItem("username");
    localStorage.removeItem("wallet_address");
    localStorage.setItem("inital_connect", false);
    deactivate();
  };

  const getBalance = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }

    const web3 = window.web3;

    const tokenData = Token.networks[chainId];
    let tokens = null;
    let BUSDToken = null;
    let BUSDTokenBalance = null;

    let BUSDXToken = null;
    let BUSDXTokenBalance = null;

    BUSDToken = new web3.eth.Contract(Token.abi, tokenContractAddress);
    BUSDTokenBalance = await BUSDToken.methods.balanceOf(account).call().catch(e => console.log(e));

    BUSDXToken = new web3.eth.Contract(Token.abi, projectContractAddress);
    BUSDXTokenBalance = await BUSDXToken.methods.balanceOf(account).call().catch(e => console.log(e));

    await library
      .getBalance(account)
      .then((balance) => {
        if (balance) {
          setAuth({
            ...auth,
            accounts: account,
            BUSDTokenData: BUSDToken,
            BUSDTokenBalance: formatEther(BUSDTokenBalance),
            BUSDXTokenData: BUSDXToken,
            BUSDXTokenBalance: formatEther(BUSDXTokenBalance),
            chainStatus: false,
            connectWalletStatus: false,
            ethBalance: formatEther(balance),
            logoutStatus: localStorage.getItem("inital_connect"),
          });
        }
      })
      .catch((e) => {
        console.log(e);
        setAuth({
          ...auth,
          ethBalance: null,
        });
      });
  };

  const saveAccountDetails = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }

    try {
      const web3 = window.web3;

      if (account.length > 0) {
        localStorage.setItem("inital_connect", true);
        // const ethBalance = await web3.eth.getBalance(account);
        // console.log(ethBalance)
        // const ethBalanceFormated = await web3.utils
        //   .fromWei(ethBalance, "Ether")
        //   .substring(0, 8);
        //   console.log(newbalance)
        // const networkId = await web3.eth.net.getId();
        // console.log(networkId)
        // console.log(ethBalanceFormated)
        const tokenData = Token.networks[chainId];
        let tokens = null;
        let BUSDToken = null;
        let BUSDTokenBalance = null;

        let BUSDXToken = null;
        let BUSDXTokenBalance = null;

        BUSDToken = new web3.eth.Contract(Token.abi, tokenContractAddress);
        BUSDTokenBalance = await BUSDToken.methods.balanceOf(account).call().catch(e => console.log(e));

        BUSDXToken = new web3.eth.Contract(Token.abi, projectContractAddress);
        BUSDXTokenBalance = await BUSDXToken.methods.balanceOf(account).call().catch(e => console.log(e));

        await library
          .getBalance(account)
          .then((balance) => {
            if (balance) {
              setAuth({
                ...auth,
                accounts: account,
                BUSDTokenData: BUSDToken,
                BUSDTokenBalance: formatEther(BUSDTokenBalance),
                BUSDXTokenData: BUSDXToken,
                BUSDXTokenBalance: formatEther(BUSDXTokenBalance),
                chainStatus: false,
                connectWalletStatus: false,
                ethBalance: formatEther(balance),
                logoutStatus: localStorage.getItem("inital_connect"),
              });
            }
          })
          .catch((e) => {
            // console.log(e);
            setAuth({
              ...auth,
              ethBalance: null,
            });
          });
        if (!loginData.loading) {
          dispatch(userLoginStart({ wallet_address: account }));
        }
      } else {
        hanldeLogout();
        const notificationMessage = getSuccessNotificationMessage(
          "Signed out successfully"
        );
        dispatch(createNotification(notificationMessage));
      }
    } catch (error) {
      setAuth({ ...auth, connectWalletStatus: false, authStatus: false });
    }
  };

  const getProviderSinger = (message_content) => {
    library
      .getSigner(account)
      .signMessage(message_content)
      .then((signature) => console.log(signature))
      .catch((error) => {
        const notificationMessage = getErrorNotificationMessage(error);
        dispatch(createNotification(notificationMessage));
      });
  };

  useEffect(() => {
    if (account) {
      saveAccountDetails();
    } else {
      hanldeLogout();
    }
  }, [account]);

  useEffect(() => {
    if (!loginData.loading) {
      if (Object.keys(loginData.data).length > 0) {
        if (loginData.data.data.code == 101) {
          setAuth({
            ...auth,
            loading: false,
            authStatus: true,
            userId: loginData.data.data.data.user_id,
            userUniqueId: loginData.data.data.data.user_unique_id,
            userPicture: loginData.data.data.data.picture,
          });
        } else {
          setAuth({
            ...auth,
            loading: false,
            userId: null,
            userUniqueId: null,
            userPicture: null,
            authStatus: false,
          });
        }
      } else {
        setAuth({
          ...auth,
          loading: false,
          userId: null,
          userUniqueId: null,
          userPicture: null,
          authStatus: false,
        });
      }
    }
  }, [loginData.data]);
  useEffect(() => {
    const onbeforeunloadFn = () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("userLoginStatus");
      localStorage.removeItem("user_picture");
      localStorage.removeItem("username");
      localStorage.removeItem("wallet_address");
    };

    window.addEventListener("beforeunload", onbeforeunloadFn);
    return () => {
      window.removeEventListener("beforeunload", onbeforeunloadFn);
    };
  }, []);

  return (
    <authContext.Provider
      value={{
        auth,
        context,
        handleConnector,
        loginConnectors,
        activatingConnector,
        hanldeLogout,
        supportedChains,
        getProviderSinger,
        getBalance
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
