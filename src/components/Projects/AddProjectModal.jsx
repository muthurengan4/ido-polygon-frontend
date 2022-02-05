import React, { useState, useEffect } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import {
  addProjectStart,
  sendProjectTokenAdminStart,
  sendProjectTokenAdminRestart,
  resetAddProjectData
} from "../store/actions/ProjectActions";
import { connect } from "react-redux";
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";
import Web3 from "web3";
import Token from "../../abis/Token.json";
import {
  getErrorNotificationMessage,
  getSuccessNotificationMessage,
} from "../Helper/NotificationMessage";
import { createNotification } from "react-redux-notify";
import AddProjectConfirmation from "./AddProjectConfirmation";
import { useHistory } from "react-router";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import configuration from "react-global-configuration";

var today = new Date();
today.setDate(today.getDate());

const now = new Date();
const yesterdayBegin = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate() + 1
);
const todayNoon = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate() + 2
);

const AddProjectModal = (props) => {
  // Crypto variables
  const [walletAddress, setWalletAddress] = useState("");

  const [loadinBlockchain, setLoadingBlockchain] = useState(true);

  const [loading, setLoading] = useState(true);

  const [account, setAccount] = useState("");

  const [ethBalance, setEthBalance] = useState("");

  const [token, setToken] = useState("");

  const [tokenBalance, setTokenBalance] = useState("");

  const [ethSwap, setEthSwap] = useState("");

  const [output, setOutput] = useState(0);

  const [etherAmountEntered, setEtherAmountEntered] = useState(0);

  const [submitButtonContent, setSubmitButtonContent] = useState("");

  const [contractIsValid, setContractIsValid] = useState(false);

  // End crypto variables

  // Crypto functions

  const [checkContractButtonContent, setCheckContractButtonContent] = useState("");

  const loadWeb3 = async (contractAddress) => {
    // event.preventDefault();

    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      console.log("Etherum enabled", contractAddress.contract_address);
      setLoadingBlockchain(false);
      loadBlockchainData(contractAddress.contract_address);
      return true;
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      setLoadingBlockchain(false);
      loadBlockchainData(contractAddress.contract_address);
      return true;
    } else {
      setCheckContractButtonContent("");
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
      return false;
    }
  };

  const loadBlockchainData = async (contractAddress) => {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);

    const ethBalance = await web3.eth.getBalance(accounts[0]);
    setEthBalance(ethBalance);

    // Load Token
    const networkId = await web3.eth.net.getId();
    const tokenData = Token.networks[networkId];
    try {
      if (tokenData) {
        const token = new web3.eth.Contract(Token.abi, contractAddress);
        setToken(token);
        let tokenBalance = await token.methods.balanceOf(accounts[0]).call();
        setTokenBalance(tokenBalance.toString());
        let totalSupply = await token.methods.totalSupply().call();
        let tokenSymbol = await token.methods.symbol().call();
        let tokenDecimals = await token.methods.decimals().call();
        let tokenName = await token.methods.name().call();
        console.log("Token symbol", tokenDecimals);
        setProjectInputDetails({
          ...projectInputDetails,
          total_tokens: window.web3.utils.fromWei(totalSupply, "Ether"),
          token_symbol: tokenSymbol.toString(),
          decimal_points: tokenDecimals.toString(),
          name: tokenName.toString(),
          contract_address: contractAddress,
        });
        setContractIsValid(true);
        setCheckContractButtonContent("");
      } else {
        window.alert("Token contract not deployed to detected network.");
        setContractIsValid(false);
        setCheckContractButtonContent("");
      }
    } catch (error) {
      const notificationMessage = getErrorNotificationMessage(
        "Contract address is wrong. Please try again..."
      );
      props.dispatch(createNotification(notificationMessage));
      setCheckContractButtonContent("");
    }

    setLoading(false);
  };

  const transferToken = async (projectInputDetails) => {
    const web3 = new Web3(window.ethereum);

    // Decimal
    const decimals = web3.utils.toBN(projectInputDetails.decimal_points);

    // Amount of token
    const tokenAmount = web3.utils.toBN(projectInputDetails.allowed_tokens);

    // Amount as Hex - contract.methods.transfer(toAddress, tokenAmountHex).encodeABI();
    const tokenAmountHex =
      "0x" + tokenAmount.mul(web3.utils.toBN(10).pow(decimals)).toString("hex");

    const sendTokenToAddress = await token.methods
      .approve(account, tokenAmountHex)
      .send({ from: account })
      .on("transactionHash", (hash) => {
        console.log("Approve hash", hash);

        const adminWalletAddress = configuration.get(
          "configData.admin_wallet_address"
        );
        token.methods
          .transferFrom(
            account,
            // "0x6F73C4C39f31408Eec80AE3182bA0aCbCE4565BA", // Admin wallet address
            adminWalletAddress, // Admin wallet address
            tokenAmountHex
          )
          .send({
            from: account,
          })
          .on("error", (error) => {
            let notificationMessage;
            if (error.message == undefined) {
              notificationMessage = getErrorNotificationMessage(
                "transaction failed. Please try again. "
              );
            } else {
              notificationMessage = getErrorNotificationMessage(
                error.message
              );
            }
            props.dispatch(createNotification(notificationMessage));
            handleAddProjectConfirmation(false);
          })
          .once("receipt", (receipt) => {
            console.log("Loading the transaction....", hash);
            setSubmitButtonContent("");
            setAddProjectConfirmation(false);
            props.dispatch(
              sendProjectTokenAdminStart({
                from_wallet_address: account,
                from_payment_id: receipt.transactionHash,
                total: projectInputDetails.total_tokens,
                project_id: projectInputDetails.project_id,
              })
            );
          });
        //console.log()
      }).on("error", (error) => {
        let notificationMessage;
        if (error.message == undefined) {
          notificationMessage = getErrorNotificationMessage(
            "transaction failed. Please try again. "
          );
        } else {
          notificationMessage = getErrorNotificationMessage(
            error.message
          );
        }
        props.dispatch(createNotification(notificationMessage));
        handleAddProjectConfirmation(false);
      });
  }

  const { status } = props;

  const [value, onChange] = useState([yesterdayBegin, todayNoon]);

  const [projectInputDetails, setProjectInputDetails] = useState({
    name: "",
    total_tokens: "",
    allowed_tokens: "",
    exchange_rate: "",
    token_symbol: "",
    picture: "",
    contract_address: "",
    description: "",
    website: "",
    twitter_link: "",
    facebook_link: "",
    telegram_link: "",
    medium_link: "",
    start_time: "",
    end_time: "",
    decimal_points: "",
  });

  const history = useHistory();


  const handleAddProject = (values) => {


    console.log(values);

    const startTime = moment(value[0]).format("DD-MM-YYYY HH:MM:SS");
    const endTime = moment(value[1]).format("DD-MM-YYYY  HH:MM:SS");

    const newProjectDetails = {
      ...values,
      contract_address: projectInputDetails.contract_address,
      start_time: startTime,
      end_time: endTime,
    };
    props.dispatch(addProjectStart(newProjectDetails));
  };

  const [addProjectConfirmation, setAddProjectConfirmation] = useState(false);

  const [skipinitalRender, setSkipInitialRender] = useState(false);

  const handleAddProjectConfirmation = (status) => {
    setAddProjectConfirmation(status);
  };

  useEffect(() => {
    setSkipInitialRender(true);
    props.dispatch(sendProjectTokenAdminRestart());
    props.dispatch(sendProjectTokenAdminRestart());
  }, []);

  // Transfer allowed token to admin wallet

  const transferTokenToAdminWallet = (event) => {
    console.log("token transfer");
    setSubmitButtonContent("Processing...");
    event.preventDefault();
    // call crypto function to transfer the project token to admin wallet.
    transferToken(props.addProject.data);
    props.dispatch(resetAddProjectData())
  };


  useEffect(() => {
    if (!props.addProject.loading) {
      if (props.addProject.addStatus) {
        setProjectInputDetails({
          name: "",
          total_tokens: "",
          allowed_tokens: "",
          exchange_rate: "",
          token_symbol: "",
          picture: "",
          contract_address: "",
          description: "",
          website: "",
          twitter_link: "",
          facebook_link: "",
          telegram_link: "",
          medium_link: "",
          start_time: "",
          end_time: "",
          decimal_points: "",
        });
      }
      setContractIsValid(false);
      props.handleAddProjectModal(null);
    }
  }, [props.addProject.addStatus]);


  const contractSchema = Yup.object().shape({
    contract_address: Yup.string().required("contract address is required *"),
  });

  const addProjectSchema = Yup.object().shape({
    name: Yup.string().required("Project Name is required *"),
    total_tokens: Yup.number().required("Total Tokens is required *"),
    allowed_tokens: Yup.number().required("Allowed Tokens is required *"),
    exchange_rate: Yup.number().required("Exchange Rate is required *"),
    token_symbol: Yup.string().required("Token symbol is required *"),
    picture: Yup.mixed().required("Image is Required *"),
    description: Yup.string().required("Description is required *"),
    website: Yup.string().required("Website is required *"),
    twitter_link: Yup.string(),
    medium_link: Yup.string(),
    decimal_points: Yup.number().required("Decimal Points is required *"),
  });

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);

  const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };


  return (
    <>
      <div
        id="authModal"
        className={`overflow-y-scroll ${status ? "show" : ""}`}
      >
        <div className="authModalWrapper no-padding">
          {!contractIsValid && (
            <div
              className="wrapper"
            //onClick={() => props.handleAddProjectModal(null)}
            ></div>
          )}
          <div
            className={`modal-body addProject-modal ${contractIsValid
              ? "col-lg-11 col-md-10 col-xs-11 col-sm-11 "
              : "col-md-10 col-xs-11 col-sm-11"
              } ${status ? "show" : ""}`}
          >
            <div className="headerwrapper">
              <h4 className="text-center text-capitalize primary-text">Add Project</h4>
              <div
                className="modal-close"
                onClick={() => props.handleAddProjectModal(null)}
              >
                <svg className="woox-icon">
                  <use xlinkHref="#icon-error-circle"></use>
                </svg>
              </div>
            </div>
            {contractIsValid ? (
              <>
                <div
                  className="outside-scroll"
                //onClick={() => props.handleAddProjectModal(null)}
                ></div>
                <Formik
                  initialValues={{
                    name: projectInputDetails.name,
                    total_tokens: projectInputDetails.total_tokens,
                    allowed_tokens: "",
                    exchange_rate: "",
                    token_symbol: projectInputDetails.token_symbol,
                    picture: "",
                    description: "",
                    website: "",
                    twitter_link: "",
                    facebook_link: "",
                    telegram_link: "",
                    medium_link: "",
                    decimal_points: projectInputDetails.decimal_points,
                    contract_address: projectInputDetails.contract_address,
                  }}
                  validationSchema={addProjectSchema}
                  onSubmit={(values) => {
                    handleAddProject(values);
                  }}
                >
                  {({
                    touched,
                    errors,
                    isSubmitting,
                    resetForm,
                    isValidating,
                    setFieldValue,
                  }) => (
                    <Form className="form--search form--search-transparent w-100 mt-4 mb-4 ">
                      <div className="row">
                        {/* <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mb30">
                              <label htmlFor="username" className="custom-label mb-3 ml-0 text-capitalize">user name *</label>
                              <input
                                id="username"
                                className=" no-padding"
                                name="name" 
                                placeholder="username"
                                type="text"
                                onChange={(event) => hanldeProjectInputDetails(event)}
                                value={projectInputDetails.name}
                              />
                            </div> */}
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb30 addproject-between">
                          <label
                            htmlFor="ProjectName"
                            className="custom-label ml-0 text-capitalize primary-text"
                          >
                            Project Name{" "}
                            <abbr className="required" title="required">
                              *
                            </abbr>
                          </label>
                          <Field
                            id="ProjectName"
                            className={`no-padding form-control ${touched.name && errors.name ? "is-invalid" : ""
                              }`}
                            name="name"
                            placeholder="Project Name"
                            type="text"
                          // onChange={(event) => hanldeProjectInputDetails(event)}
                          // value={projectInputDetails.name}
                          />
                          <ErrorMessage
                            component="div"
                            name="name"
                            className="invalid-feedback mt-3"
                          />
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb30 addproject-between">
                          <label
                            htmlFor="date"
                            className="custom-label ml-0  text-capitalize"
                          >
                            Start & End Date{" "}
                            <abbr className="required" title="required">
                              *
                            </abbr>
                          </label>
                          <div
                            id="customReactDateTimeCalender"
                            className="w-100"
                          >
                            {/* <DatePicker   
                                startDate={date.startDate}
                                endDate={date.endDate}
                                onChange={onRangeChange}
                                minDate={today}
                                selectsRange  
                              /> */}
                            <DateTimeRangePicker
                              onChange={onChange}
                              value={value}
                              format={"dd-M-y h:mm:ss a"}
                              minDate={yesterdayBegin}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mb30 addproject-between">
                          <label
                            htmlFor="TotalTokens"
                            className="custom-label ml-0  text-capitalize"
                          >
                            Total Tokens{" "}
                            <abbr className="required" title="required">
                              *
                            </abbr>
                          </label>
                          <Field
                            id="TotalTokens"
                            className={`no-padding form-control ${touched.total_tokens && errors.total_tokens
                              ? "is-invalid"
                              : ""
                              }`}
                            name="total_tokens"
                            placeholder="Total Tokens"
                            type="number"
                          // onChange={(event) => hanldeProjectInputDetails(event)}
                          // value={projectInputDetails.total_tokens}
                          />
                          <ErrorMessage
                            component="div"
                            name="total_tokens"
                            className="invalid-feedback mt-3"
                          />
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mb30">
                          <label
                            htmlFor="AllowedTokens"
                            className="custom-label ml-0 text-capitalize"
                          >
                            Allowed Tokens{" "}
                            <abbr className="required" title="required">
                              *
                            </abbr>
                          </label>
                          <Field
                            id="number"
                            className={`no-padding form-control ${touched.allowed_tokens && errors.allowed_tokens
                              ? "is-invalid"
                              : ""
                              }`}
                            name="allowed_tokens"
                            placeholder="Allowed Tokens"
                            type="number"
                          // onChange={(event) => hanldeProjectInputDetails(event)}
                          // value={projectInputDetails.allowed_tokens}
                          />
                          <ErrorMessage
                            component="div"
                            name="allowed_tokens"
                            className="invalid-feedback mt-3"
                          />
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mb30">
                          <label
                            htmlFor="ExchangeRate"
                            className="custom-label ml-0 text-capitalize"
                          >
                            Exchange Rate{" "}
                            <abbr className="required" title="required">
                              *
                            </abbr>
                          </label>
                          <Field
                            id="ExchangeRate"
                            className={`no-padding form-control ${touched.exchange_rate && errors.exchange_rate
                              ? "is-invalid"
                              : ""
                              }`}
                            name="exchange_rate"
                            placeholder="Exchange Rate"
                            type="number"
                          // onChange={(event) => hanldeProjectInputDetails(event)}
                          // value={projectInputDetails.exchange_rate}
                          />
                          <ErrorMessage
                            component="div"
                            name="exchange_rate"
                            className="invalid-feedback mt-3"
                          />
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mb30">
                          <label
                            htmlFor="TokenSymbol"
                            className="custom-label ml-0 text-capitalize"
                          >
                            Token Symbol{" "}
                            <abbr className="required" title="required">
                              *
                            </abbr>
                          </label>
                          <Field
                            id="TokenSymbol"
                            className={`no-padding form-control ${touched.token_symbol && errors.token_symbol
                              ? "is-invalid"
                              : ""
                              }`}
                            name="token_symbol"
                            placeholder="Token Symbol"
                            type="text"
                          // onChange={(event) => hanldeProjectInputDetails(event)}
                          // value={projectInputDetails.token_symbol}
                          />
                          <ErrorMessage
                            component="div"
                            name="token_symbol"
                            className="invalid-feedback mt-3"
                          />
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mb30">
                          <label
                            htmlFor="picture"
                            className="custom-label ml-0 text-capitalize"
                          >
                            Select Picture{" "}
                            <abbr className="required" title="required">
                              *
                            </abbr>
                          </label>
                          <input
                            id="picture"
                            className={`no-padding form-control ${touched.picture && errors.picture
                              ? "is-invalid"
                              : ""
                              }`}
                            name="picture"
                            placeholder="Select Picture"
                            type="file"
                            accept="image/*"
                            // onChange={(event) => handleChangeImage(event)}
                            onChange={(event) => {
                              setFieldValue("picture", event.target.files[0]);
                            }}
                          />
                          <ErrorMessage
                            component="div"
                            name="picture"
                            className="invalid-feedback mt-3"
                          />
                        </div>

                        <div className="col-lg-4 makesameheight col-md-6 col-sm-12 col-xs-12 mb30">
                          <label
                            htmlFor="picture"
                            className="custom-label ml-0 text-capitalize"
                          >
                            Decimal Points{" "}
                            <abbr className="required" title="required">
                              *
                            </abbr>
                          </label>
                          <Field
                            id="decimal_points"
                            className={`no-padding form-control ${touched.decimal_points && errors.decimal_points
                              ? "is-invalid"
                              : ""
                              }`}
                            name="decimal_points"
                            placeholder="Decimal Points"
                            type="text"
                          // onChange={(event) => hanldeProjectInputDetails(event)}
                          // value={projectInputDetails.decimal_points}
                          />
                          <ErrorMessage
                            component="div"
                            name="decimal_points"
                            className="invalid-feedback mt-3"
                          />
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb30">
                          <label
                            htmlFor="desc"
                            className="custom-label ml-0 text-capitalize"
                          >
                            Description{" "}
                            <abbr className="required" title="required">
                              *
                            </abbr>
                          </label>
                          <Field
                            id="desc"
                            className={`no-padding form-control ${touched.description && errors.description
                              ? "is-invalid"
                              : ""
                              }`}
                            name="description"
                            placeholder="Description"
                            type="text"
                            as="textarea"
                          // onChange={(event) => hanldeProjectInputDetails(event)}
                          // value={projectInputDetails.description}
                          />
                          <ErrorMessage
                            component="div"
                            name="description"
                            className="invalid-feedback mt-3"
                          />
                        </div>
                      </div>
                      <h5 className="text-muted text-capitalize mt-3 mb-3 letter-2">
                        Social Settings
                      </h5>
                      <div className="custom-hr"></div>
                      <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mb30">
                          <label
                            htmlFor="Website"
                            className="custom-label mb-3 ml-0 text-capitalize"
                          >
                            Website{" "}
                            <abbr className="required" title="required">
                              *
                            </abbr>
                          </label>
                          <Field
                            id="Website"
                            className={`no-padding form-control ${touched.website && errors.website
                              ? "is-invalid"
                              : ""
                              }`}
                            name="website"
                            placeholder="Website"
                            type="text"
                          // onChange={(event) => hanldeProjectInputDetails(event)}
                          // value={projectInputDetails.website}
                          />
                          <ErrorMessage
                            component="div"
                            name="website"
                            className="invalid-feedback mt-3"
                          />
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mb30">
                          <label
                            htmlFor="TelegramLink"
                            className="custom-label mb-3 ml-0 text-capitalize"
                          >
                            Telegram Link
                          </label>
                          <Field
                            id="TelegramLink"
                            className={`no-padding form-control ${touched.telegram_link && errors.telegram_link
                              ? "is-invalid"
                              : ""
                              }`}
                            name="telegram_link"
                            placeholder="Telegram Link"
                            type="text"
                          // onChange={(event) => hanldeProjectInputDetails(event)}
                          // value={projectInputDetails.telegram_link}
                          />
                          <ErrorMessage
                            component="div"
                            name="telegram_link"
                            className="invalid-feedback mt-3"
                          />
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mb30">
                          <label
                            htmlFor="Medium"
                            className="custom-label mb-3 ml-0 text-capitalize"
                          >
                            Medium Link
                          </label>
                          <Field
                            id="Medium"
                            className={`no-padding form-control ${touched.medium_link && errors.medium_link
                              ? "is-invalid"
                              : ""
                              }`}
                            name="medium_link"
                            placeholder="Medium Link"
                            type="text"
                          // onChange={(event) => hanldeProjectInputDetails(event)}
                          // value={projectInputDetails.medium_link}
                          />
                          <ErrorMessage
                            component="div"
                            name="medium_link"
                            className="invalid-feedback mt-3"
                          />
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mb30">
                          <label
                            htmlFor="Facebook"
                            className="custom-label mb-3 ml-0 text-capitalize"
                          >
                            Facebook Link
                          </label>
                          <Field
                            id="Facebook"
                            className={`no-padding form-control ${touched.facebook_link && errors.facebook_link
                              ? "is-invalid"
                              : ""
                              }`}
                            name="facebook_link"
                            placeholder="Facebook Link"
                            type="text"
                          // onChange={(event) => hanldeProjectInputDetails(event)}
                          // value={projectInputDetails.facebook_link}
                          />
                          <ErrorMessage
                            component="div"
                            name="facebook_link"
                            className="invalid-feedback mt-3"
                          />
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mb30">
                          <label
                            htmlFor="Twitter"
                            className="custom-label mb-3 ml-0 text-capitalize"
                          >
                            Twitter Link
                          </label>
                          <Field
                            id="Twitter"
                            className={`no-padding form-control ${touched.twitter_link && errors.twitter_link
                              ? "is-invalid"
                              : ""
                              }`}
                            name="twitter_link"
                            placeholder="Twitter Link"
                            type="text"
                          // onChange={(event) => hanldeProjectInputDetails(event)}
                          // value={projectInputDetails.twitter_link}
                          />
                          <ErrorMessage
                            component="div"
                            name="twitter_link"
                            className="invalid-feedback mt-3"
                          />
                        </div>
                      </div>
                      <div className="buttoncancelsavewrapper mt-3">
                        <button
                          type="reset"
                          className="btn btn--medium btn--transparent btn--primary"
                          // onClick={handleResetInput}
                          onClick={resetForm}
                        >
                          reset
                        </button>
                        <button
                          type="submit"
                          className="btn btn--medium btn--primary"
                          // onClick={handleAddProject}
                          disabled={props.addProject.buttonDisable}
                        >
                          {props.addProject.loadingButtonContent !== null
                            ? props.addProject.loadingButtonContent
                            : "Add Project"}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </>
            ) : (
              <>
                <Formik
                  initialValues={{
                    contract_address: "",
                  }}
                  validationSchema={contractSchema}
                  onSubmit={(values) => {
                    loadWeb3(values);
                    setCheckContractButtonContent("Processing...");
                  }}
                >
                  {({ touched, errors, isSubmitting }) => (
                    <Form className="form--search form--search-transparent w-100 mt-4 mb-4">
                      <div className="row no-margin w-100 align-items-center checkcontractWrapper">
                        <div className="w-100 col-lg-12 col-md-12 col-xs-12 no-padding">
                          <p className="mt-0 mb-3 text-capitalize">
                            {" "}
                            <span className="custom-required text-bold ">
                              NOTE
                            </span>{" "}
                            : check contract to add new project
                          </p>
                        </div>
                        <div className="col-lg-8 makesameheight col-md-8 col-sm-12 col-xs-12 mb-3 no-padding">
                          <label
                            htmlFor="picture"
                            className="custom-label ml-0 text-capitalize"
                          >
                            contract address
                          </label>
                          <Field
                            id="picture"
                            className={`no-padding form-control ${touched.contract_address &&
                              errors.contract_address
                              ? "is-invalid"
                              : ""
                              }`}
                            name="contract_address"
                            placeholder="Contract Address"
                            type="text"
                          // onChange={(event) => hanldeProjectInputDetails(event)}
                          // value={projectInputDetails.contract_address}
                          />
                          <ErrorMessage
                            component="div"
                            name="contract_address"
                            className="invalid-feedback mt-3 mb-md-3"
                          />
                        </div>
                        <div className="col-lg-4 makesameheight col-md-4 col-sm-12 col-xs-12">
                          <button
                            type="submit"
                            className="btn btn--medium btn--transparent btn--primary"
                            // onClick={event => loadWeb3(event, projectInputDetails.contract_address)}
                            disabled={checkContractButtonContent != "" ? true : false}
                          >
                            {checkContractButtonContent != "" ? checkContractButtonContent : "Check Contract"}
                          </button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </>
            )}
          </div>
        </div>
      </div>
      {/* <AddProjectConfirmation
        status={addProjectConfirmation}
        handleAddProjectConfirmation={handleAddProjectConfirmation}
        addproject={props.addProject}
        transferTokenToAdminWallet={transferTokenToAdminWallet}
        submitButtonContent={submitButtonContent}
      /> */}
    </>
  );
};

const mapStateToPros = (state) => ({
  addProject: state.projectReducer.addProject,
  sendProTokenAdmin: state.projectReducer.sendProTokenAdmin,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(AddProjectModal);
