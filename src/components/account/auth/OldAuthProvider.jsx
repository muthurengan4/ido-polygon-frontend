import React, { createContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";
import {
  getErrorNotificationMessage,
  getSuccessNotificationMessage,
} from "../../Helper/NotificationMessage";
import { createNotification } from "react-redux-notify";
import { userLoginStart } from "../../store/actions/UserAction";
import Token from "../../../abis/Token.json";
import configuration from "react-global-configuration";

export const authContext = createContext({});

const AuthProvider = ({ children }, props) => {

  const netID = configuration.get("configData.network_id") ? configuration.get("configData.network_id") : 1337;
  const chainIDhexacode = configuration.get("configData.chain_id_hexacode") ? configuration.get("configData.chain_id_hexacode") : "0x38";

  const userId = localStorage.getItem("userId");
  const accessToken = localStorage.getItem("accessToken");
  const userLoginStatus = localStorage.getItem("userLoginStatus");

  const loginData = useSelector((state) => state.users.loginInputData);

  const [auth, setAuth] = useState({
    loading: true,
    accounts: "",
    connectWalletStatus: false,
    authStatus:
      userId && accessToken && userLoginStatus == "true" ? true : false,
    ethBalance: null,
    logoutStatus: localStorage.getItem("inital_connect"),
    chainStatus: false,
    tokenBalance: null,
    tokenData: null,
    userId: null,
    userUniqueId: null,
    userPicture: null,
  });

  const dispatch = useDispatch();

  const connectWallet = async () => {
    console.log("connecting wallet");
    setAuth({ ...auth, connectWalletStatus: true });
    console.log(auth);
    try {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        const network = await window.web3.eth.net.getId();
        console.log("network", network, netID)
        if (network !== Number(netID)) {
          changeNetwork();
        } else {
          await window.ethereum.enable();
          console.log("Etherum enabled");
          setAuth({ ...auth, connectWalletStatus: true });
          console.log("First true");
          //checkAccountChange();
          //metamaskDisconnect();
          getWalletAddress();
          //saveAccountDetails()
        }
        return true;
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        setAuth({ ...auth, connectWalletStatus: true });
        //checkAccountChange();
        //metamaskDisconnect();
        getWalletAddress();
        console.log("Second true");
        //saveAccountDetails()
        return true;
      } else {
        setAuth({ ...auth, connectWalletStatus: false });
        const notificationMessage = getErrorNotificationMessage(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
        dispatch(createNotification(notificationMessage));
        return false;
      }
    } catch (error) {
      let notificationMsg;
      if (error.message) {
        notificationMsg = error.message;
      } else {
        notificationMsg =
          "Something went wrong. Please refresh the page and try again.";
      }
      const notificationMessage = getErrorNotificationMessage(notificationMsg);
      dispatch(createNotification(notificationMessage));
      setAuth({ ...auth, connectWalletStatus: false });
    }
  };

  const checkAccountChange = async (givenProvider) => {
    window.ethereum.on("accountsChanged", async function (accounts) {
      const web3 = window.web3;

      const network = await web3.eth.net.getId();
      console.log("networ", network);
      if (network !== Number(netID)) {
        //must be on mainnet or Testnet
        console.log("Only this");
        onAcountChange(false, false);
        changeNetwork();
      } else {
        //Do this check to detect if the user disconnected their wallet from the Dapp
        if (accounts && accounts[0]) onAcountChange(accounts[0], true);
        else {
          /*
            @Arg1 : account address (String)
            @Arg2 : isAuthenticated (bool) 
          */
          onAcountChange(false, false);

          /*
            @Arg1 : chain ID (Int)
            @Arg2 : isAuthenticated (bool) 
          */
          onNetworkChange(false, false);
        }
      }
    });
    window.ethereum.on("chainChanged", (chainId) => {
      // Handle the new chain.
      // Correctly handling chain changes can be complicated.
      // We recommend reloading the page unless you have good reason not to.
      console.log("chain changed. ");
      setAuth({ ...auth, chainStatus: true });
      // const notificationMessage = getSuccessNotificationMessage(
      //   "Signed out successfully"
      // );
      // dispatch(createNotification(notificationMessage));
      // if(!auth.chainStatus){
      //   console.log("old chain")
      //   setAuth({...auth , chainStatus : true})
      // }else{
      //   console.log("new chain")
      // }
    });
  };

  useEffect(() => {
    if (auth.chainStatus) {
      console.log("chain status", auth.chainStatus);
      console.log(auth, netID, chainIDhexacode);
      hanldeLogout();
    }
  }, [auth.chainStatus]);

  const metamaskDisconnect = async () => {
    window.ethereum.on("disconnect", async function () {
      console.log("On disconnect");
      hanldeLogout();
    });
  };

  const onAcountChange = (arg1, arg2) => {
    console.log("Arsf1", arg1);
    console.log("Arsdf2", arg2);
    saveAccountDetails();
  };

  const onNetworkChange = (arg1, arg2) => {
    console.log("Ar1", arg1);
    console.log("Ar2", arg2);
    setAuth({ ...auth, accounts: arg1, authStatus: arg2 });
    // hanldeLogout();
  };

  const getWalletAddress = async () => {
    let web3 = window.web3;
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      try {
        // Network ID
        const networkId = await web3.eth.net.getId();
        console.log("Networkid", networkId);

        if (networkId === Number(netID)) {
          saveAccountDetails();
        } else {
          changeNetwork();
        }
      } catch (error) {
        const notificationMessage = getErrorNotificationMessage(
          "Something went wrong. Please refresh the page and try again."
        );
        dispatch(createNotification(notificationMessage));
        setAuth({ ...auth, connectWalletStatus: false });
      }
    } else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider);
      try {
        // Network ID
        const networkId = await web3.eth.net.getId();
        console.log("Networkid", networkId);

        if (networkId === Number(netID)) {
          saveAccountDetails();
        } else {
          changeNetwork();
        }
      } catch (error) {
        const notificationMessage = getErrorNotificationMessage(
          "Something went wrong. Please refresh the page and try again."
        );
        dispatch(createNotification(notificationMessage));
        setAuth({ ...auth, connectWalletStatus: false });
      }
    }
  };

  const changeNetwork = async () => {
    // MetaMask injects the global API into window.ethereum
    if (window.ethereum) {
      try {
        // check if the chain to connect to is installed
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: chainIDhexacode }], // chainId must be in hexadecimal numbers
        });
        console.log('chnage network auth' + auth);
        // if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        console.log('if con' + auth);
        // checkAccountChange();
        // getWalletAddress();
        // metamaskDisconnect();
        // }
        await window.ethereum.enable();
        console.log("Etherum enabled");
        if (!auth.chainStatus) {
          saveAccountDetails();
        }
        //saveAccountDetails();
      } catch (error) {
        // This error code indicates that the chain has not been added to MetaMask
        // if it is not, then install it into the user MetaMask
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  //https://data-seed-prebsc-1-s1.binance.org:8545/
                  chainId: "0x38",
                  rpcUrls: ["https://bsc-dataseed1.ninicoin.io"],
                  chainName: "Smart Chain - MainNet",
                  nativeCurrency: {
                    name: "Binance",
                    symbol: "BNB", // 2-6 characters long
                    decimals: 18,
                  },
                  blockExplorerUrls: ["https://.bscscan.com"],
                },
              ],
            });
            await window.ethereum.enable();
            console.log("Etherum enabled");
            saveAccountDetails();
          } catch (addError) {
            console.error(addError);
            setAuth({ ...auth, connectWalletStatus: false });
          }
        }
        console.error(error);
      }
    } else {
      // if no window.ethereum then MetaMask is not installed
      alert(
        "MetaMask is not installed. Please consider installing it: https://metamask.io/download.html"
      );
      setAuth({ ...auth, connectWalletStatus: false });
    }
  };

  const hanldeLogout = () => {
    console.log("logout");
    if (auth.chainStatus) {
      setAuth({
        ...auth,
        loading: false,
        accounts: "",
        connectWalletStatus: false,
        ethBalance: null,
        logoutStatus: "true",
        authStatus: false,
        chainStatus: false,
        tokenBalance: null,
        tokenData: null,
        userId: null,
        userUniqueId: null,
        userPicture: null,
      });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("userLoginStatus");
      localStorage.removeItem("user_picture");
      localStorage.removeItem("username");
      localStorage.removeItem("wallet_address");
      localStorage.setItem("inital_connect", false);
    } else {
      setAuth({
        ...auth,
        loading: false,
        accounts: "",
        connectWalletStatus: false,
        ethBalance: null,
        logoutStatus: "true",
        authStatus: false,
        chainStatus: false,
        tokenBalance: null,
        tokenData: null,
        userId: null,
        userUniqueId: null,
        userPicture: null,
      });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("userLoginStatus");
      localStorage.removeItem("user_picture");
      localStorage.removeItem("username");
      localStorage.removeItem("wallet_address");
      localStorage.setItem("inital_connect", false);
      //window.location = "/";
    }
  };

  const saveAccountDetails = async () => {
    console.log("logging ");
    try {
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      console.log("logging 2", accounts);
      if (accounts.length > 0) {
        const ethBalance = await web3.eth.getBalance(accounts[0]);
        const ethBalanceFormated = await web3.utils
          .fromWei(ethBalance, "Ether")
          .substring(0, 5);
        const networkId = await web3.eth.net.getId();
        const tokenData = Token.networks[networkId];
        let tokens = null;
        let token = null;
        if (tokenData) {
          token = new web3.eth.Contract(Token.abi, tokenData.address);
          let tokenBalance = await token.methods.balanceOf(accounts[0]).call();
          tokens = window.web3.utils
            .fromWei(tokenBalance.toString(), "Ether")
            .substring(0, 5);
        } else {
          window.alert("Token contract not deployed to detected network.");
        }
        localStorage.setItem("inital_connect", true);
        console.log(loginData);
        setAuth({
          ...auth,
          accounts: accounts[0],
          tokenData: token,
          tokenBalance: tokens,
          chainStatus: false,
          connectWalletStatus: false,
          ethBalance: ethBalanceFormated,
          logoutStatus: localStorage.getItem("inital_connect"),
        });
        if (!loginData.loading) {
          dispatch(userLoginStart({ wallet_address: accounts[0] }));
        }
      } else {
        hanldeLogout();
        // const notificationMessage = getSuccessNotificationMessage(
        //   "Signed out successfully"
        // );
        // dispatch(createNotification(notificationMessage));
      }
    } catch (error) {
      setAuth({ ...auth, connectWalletStatus: false, authStatus: false });
      console.log("error", error);
    }
  };

  const checkConnection = async () => {
    let web3 = window.web3;

    setAuth({ ...auth, connectWalletStatus: true, loading: true });
    // Check if browser is running Metamask
    console.log("checking connection");
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
    } else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider);
    }

    try {
      const networkId = await web3.eth.net.getId();
      const network = await web3.eth.net.getId();
      console.log("Networkid", networkId);

      if (networkId === Number(netID)) {
        await web3.eth.getAccounts().then(async (response) => {
          if (response.length > 0) {
            console.log("effect save");
            saveAccountDetails();
          } else {
            setAuth({ ...auth, connectWalletStatus: false, loading: false });
          }
        });
      } else {
        console.log("change network");
        changeNetwork()
      }
    } catch (e) {
      const notificationMessage = getErrorNotificationMessage(
        "Something went wrong. Please refresh the page and try again."
      );
      dispatch(createNotification(notificationMessage));
      setAuth({ ...auth, connectWalletStatus: false });
    }
  };

  useEffect(() => {
    if (auth.logoutStatus === "true") {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);

        checkAccountChange();
        // getWalletAddress();
        // metamaskDisconnect();
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        checkAccountChange();
        // getWalletAddress();
        // metamaskDisconnect();
      }
    }
  }, [auth.logoutStatus]);

  useEffect(() => {
    if (auth.logoutStatus === "true") {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        checkConnection();
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        checkConnection();
      }
    }
  }, []);

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
    <authContext.Provider value={{ auth, connectWallet, hanldeLogout }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
