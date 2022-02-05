import React, { useEffect, useState , useContext } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchOwnProjectsStart,
  deleteOwnProjectsStart,
  sendProjectTokenAdminStart,
  resetAddProjectData
} from "../../store/actions/ProjectActions";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import AddProjectModal from "../../Projects/AddProjectModal";
import { fetchUserDetailsStart } from "../../store/actions/UserAction";
import Web3 from "web3";
import AddProjectConfirmation from "../../Projects/AddProjectConfirmation";
import configuration from "react-global-configuration";
import Token from "../../../abis/Token.json";
import { useHistory } from "react-router";
import { getErrorNotificationMessage } from "../../Helper/NotificationMessage";
import { createNotification } from "react-redux-notify";
import {authContext} from '../../account/auth/AuthProvider'

const OwnProjects = (props) => {

  const { auth } = useContext(authContext);

  useEffect(() => {
    if(auth.accounts != "" && !auth.loading){
      if (props.profileDetails.loading) props.dispatch(fetchUserDetailsStart());
      props.dispatch(fetchOwnProjectsStart());
    }
  }, [auth.loading , auth.accounts]);
  

  const [addProjectModal, setAddProjectModal] = useState(false);

  const handleDeleteProject = (id) => {
    props.dispatch(deleteOwnProjectsStart({ project_id: id }));
  };

  const handleAddProjectModal = (status) => {
    setAddProjectModal(status);
  };

  const history = useHistory();

  const web3 = new Web3(window.ethereum);

  useEffect(() => {
    if (addProjectModal) {
      document.body.classList.add("noBodyOverflow");
    } else {
      document.body.classList.remove("noBodyOverflow");
    }
  }, [addProjectModal]);

  // Crypto variables
  const [walletAddress, setWalletAddress] = useState("");

  const [loadinBlockchain, setLoadingBlockchain] = useState(true);

  const [loading, setLoading] = useState(true);

  const [account, setAccount] = useState(localStorage.getItem("wallet_address"));

  const [ethBalance, setEthBalance] = useState("");

  const [token, setToken] = useState("");

  const [tokenBalance, setTokenBalance] = useState("");

  const [ethSwap, setEthSwap] = useState("");

  const [output, setOutput] = useState(0);

  const [etherAmountEntered, setEtherAmountEntered] = useState(0);

  const [submitButtonContent, setSubmitButtonContent] = useState("");

  const [contractIsValid, setContractIsValid] = useState(false);

  const [addProjectConfirmation, setAddProjectConfirmation] = useState(false);

  const [projectDetails, setProjectDetails] = useState({
    data: {}
  })

  const [skipinitalRender, setSkipInitialRender] = useState(false);

  const handleAddProjectConfirmation = (status, _projectDetails) => {
    setAddProjectConfirmation(status);
    setProjectDetails({ ...projectDetails, data: _projectDetails });
  };

  

  // const transferToken = async (projectInputDetails) => {

  //   const web3 = window.web3;

  //   const accounts = await web3.eth.getAccounts();
  //   setAccount(accounts[0]);

  //   const ethBalance = await web3.eth.getBalance(accounts[0]);
  //   setEthBalance(ethBalance);

  //   // Load Token
  //   const networkId = await web3.eth.net.getId();
  //   const tokenData = Token.networks[networkId];
  //   if (tokenData) {
  //     const token = new web3.eth.Contract(Token.abi, projectInputDetails.contract_address);
  //     setToken(token);

  //     // Decimal
  //     const decimals = web3.utils.toBN(projectInputDetails.decimal_points);

  //     // Amount of token
  //     const tokenAmount = web3.utils.toBN(projectInputDetails.allowed_tokens);

  //     // Amount as Hex - contract.methods.transfer(toAddress, tokenAmountHex).encodeABI();
  //     const tokenAmountHex =
  //       "0x" + tokenAmount.mul(web3.utils.toBN(10).pow(decimals)).toString("hex");

  //     await token.methods
  //       .approve(account, tokenAmountHex)
  //       .send({ from: account })
  //       .on("transactionHash", (hash) => {
  //         console.log("Approve hash", hash);

  //         const adminWalletAddress = configuration.get(
  //           "configData.admin_wallet_address"
  //         );
  //         token.methods
  //           .transferFrom(
  //             account,
  //             // "0x6F73C4C39f31408Eec80AE3182bA0aCbCE4565BA", // Admin wallet address
  //             adminWalletAddress, // Admin wallet address
  //             tokenAmountHex
  //           )
  //           .send({
  //             from: account,
  //           })
  //           .on("error", (error) => {
  //             let notificationMessage;
  //             if (error.message == undefined) {
  //               notificationMessage = getErrorNotificationMessage(
  //                 "transaction failed. Please try again. "
  //               );
  //             } else {
  //               notificationMessage = getErrorNotificationMessage(
  //                 error.message
  //               );
  //             }
  //             props.dispatch(createNotification(notificationMessage));
  //             handleAddProjectConfirmation(false);
  //           })
  //           .once("receipt", (receipt) => {
  //             console.log("Loading the transaction....", hash);
  //             setSubmitButtonContent("");
  //             setAddProjectConfirmation(false);
  //             props.dispatch(
  //               sendProjectTokenAdminStart({
  //                 from_wallet_address: account,
  //                 from_payment_id: receipt.transactionHash,
  //                 total: projectInputDetails.total_tokens,
  //                 project_id: projectInputDetails.project_id,
  //               })
  //             );
  //           });
  //         //console.log()
  //       }).on("error", (error) => {
  //         let notificationMessage;
  //         if (error.message == undefined) {
  //           notificationMessage = getErrorNotificationMessage(
  //             "transaction failed. Please try again. "
  //           );
  //         } else {
  //           notificationMessage = getErrorNotificationMessage(
  //             error.message
  //           );
  //         }
  //         props.dispatch(createNotification(notificationMessage));
  //         handleAddProjectConfirmation(false);
  //       });
  //   } else {
  //     window.alert("Token contract not deployed to detected network.");
  //   }
  // }

  const transferToken = async (projectInputDetails) => {
    if (auth.BUSDXTokenData) {
      const token = new web3.eth.Contract(Token.abi, projectInputDetails.contract_address);
      setToken(token);

      // Decimal
      const decimals = web3.utils.toBN(projectInputDetails.decimal_points);

      // Amount of token
      const tokenAmount = web3.utils.toBN(projectInputDetails.allowed_tokens);

      // Amount as Hex - contract.methods.transfer(toAddress, tokenAmountHex).encodeABI();
      const tokenAmountHex =
        "0x" + tokenAmount.mul(web3.utils.toBN(10).pow(decimals)).toString("hex");

      await token.methods
        .approve(auth.accounts, tokenAmountHex)
        .send({ from: auth.accounts })
        .on("transactionHash", (hash) => {
          console.log("Approve hash", hash);

          const adminWalletAddress = configuration.get(
            "configData.admin_wallet_address"
          );
          token.methods
            .transferFrom(
              auth.accounts,
              // "0x6F73C4C39f31408Eec80AE3182bA0aCbCE4565BA", // Admin wallet address
              adminWalletAddress, // Admin wallet address
              tokenAmountHex
            )
            .send({
              from: auth.accounts,
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
                  from_wallet_address: auth.accounts,
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
    } else {
      window.alert("Token contract not deployed to detected network.");
    }
  }

  // // Transfer allowed token to admin wallet

  // const transferTokenToAdminWallet = (event) => {
  //   console.log("token transfer");
  //   event.preventDefault();
  //   // call crypto function to transfer the project token to admin wallet.
  //   transferToken(projectDetails.data);
  // };

  const transferTokenToAdminWallet = (event) => {
    console.log("token transfer");
    setSubmitButtonContent("Processing...");
    event.preventDefault();
    // call crypto function to transfer the project token to admin wallet.
    transferToken(Object.keys(props.addProject.data).length === 0  ? projectDetails.data : props.addProject.data);
  };


  useEffect(() => {
    //new project confirmation popup
    if (!props.addProject.loading && skipinitalRender) {
      handleAddProjectConfirmation(true);
    }
    setSkipInitialRender(true)
  }, [props.addProject.data]);


  useEffect(() => {
    if (!props.sendProTokenAdmin.loading && skipinitalRender) {
      history.push({
        pathname: `/account/transaction-success/${props.sendProTokenAdmin.data.project_owner_transaction_unique_id}}`,
        state: props.sendProTokenAdmin,
      });
    }
  }, [props.sendProTokenAdmin.data]);

  useEffect(() => {
    if (addProjectConfirmation) {
      document.body.classList.add("noBodyOverflow");
    } else {
      document.body.classList.remove("noBodyOverflow");
    }
  }, [addProjectConfirmation])

  return (
    <>
      {props.ownProject.loading ? (
        "loading"
      ) : (
        <div id="own-projects">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb30 no-padding">
            <div className="tableHeadingcustom d-flex justify-content-between">
              <h4 className="text-al secondary-text">Your Projects</h4>

              {props.ownProject.data.user_type == 1 ? (
                <div className="d-flex align-items-center">
                  {props.profileDetails.data.remaining_projects == 0 ? (
                    <Link
                      to={"/subscriptions"}
                      className="btn btn--medium  btn--transparent btn--primary ml-3 text-capitalize white-button"
                    >
                      Subscribe
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className="btn btn--medium  btn--transparent btn--primary ml-3 text-capitalize white-button"
                      onClick={() => handleAddProjectModal(true)}
                    >
                      Add Project
                    </button>
                  )}
                </div>
              ) : (
                <div>
                  <a
                    href="/subscriptions"
                    className="btn btn--medium  btn--transparent btn--primary ml-3 text-capitalize white-button"
                  >
                    Subscribe Now
                  </a>
                </div>
              )}
            </div>
            {props.ownProject.data.total_projects > 0 ? (
              <div className="customtableWrapper">
                <p className="text-gray mt-3">
                  <span className="text-primary">Note: </span>List of the
                  project that you have created will be displayed here with
                  basic details.{" "}
                </p>
                <table id="customTable" className="singleProejectsoon">
                  <thead></thead>
                  <thead>
                    <tr>
                      <th>Logo</th>
                      <th>Project</th>
                      <th>Exchange Rate</th>
                      <th>Total Token</th>
                      <th>Allowed Token</th>
                      <th>Purchased</th>
                      <th>Access</th>
                      <th>Investors</th>
                      <th>Progress</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.ownProject.data.projects.map((project, index) => (
                      <tr key={index}>
                        <td>
                          <img
                            className="logo"
                            src={project.picture}
                            alt={project.name}
                          />
                        </td>
                        <td className="text-capitalize text-center">
                          <Link
                            to={`/single-project/${project.project_unique_id}`}
                          >
                            {project.name}
                          </Link>
                        </td>
                        <td className="text-capitalize text-center">
                          {project.exchange_rate}
                        </td>
                        <td className="text-capitalize text-center">
                          {project.total_tokens_formatted}
                        </td>
                        <td className="text-capitalize text-center">
                          {project.allowed_tokens_formatted}
                        </td>
                        <td className="text-capitalize text-center">
                          {project.total_tokens_purchased > "1000" ?
                            <>
                              {web3.utils
                                .fromWei(project.total_tokens_purchased, "Ether")
                                .substring(0, 5)}{" "} {project.token_symbol}
                            </>
                            : project.total_tokens_purchased}

                        </td>
                        <td className="text-capitalize text-center">
                          {project.access_type}
                        </td>
                        <td className="text-capitalize text-center">
                          {project.total_users_participated}
                        </td>
                        <td>
                          <div className="circle-big">
                            <CircularProgressbar
                              value={
                                project.total_tokens_purchased != 0
                                  ? (project.total_tokens_purchased /
                                    project.allowed_tokens) *
                                  100
                                  : 0
                              }
                              strokeWidth={10}
                            />
                          </div>
                        </td>
                        <td className="greenText text-capitalize">
                          {project.publish_status}
                        </td>
                        <td>
                          <div className="projectActionbtn">
                            {project.publish_status == "closed" ? (
                              "-"
                            ) : (
                              <>
                                <Link
                                  to={`/edit-project/${project.project_unique_id}`}
                                  className="buttonwrapper editButton"
                                >
                                  <i class="far fa-edit"></i>
                                </Link>
                                {project.is_paid == 0 ?
                                  <button
                                    type="button"
                                    className="buttonwrapper editButton btn--transparent"
                                    onClick={() =>
                                      handleAddProjectConfirmation(true, project)
                                    }
                                  >
                                    <i className="far fa-money-bill-alt"></i>
                                  </button>
                                  : ""}
                                <button
                                  type="button"
                                  className="buttonwrapper deletebutton btn--transparent"
                                  onClick={() =>
                                    handleDeleteProject(project.project_id)
                                  }
                                >
                                  <i class="fas fa-trash"></i>
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <>
                <div className="d-flex justify-content-center mt-5">
                  <p>No Projects added yet.</p>
                </div>
                {props.ownProject.data.user_type != 1 ? (
                  <div className="d-flex justify-content-center">
                    <p className="text-muted">
                      Note: You haven't subscribed yet. Please subscribe to add
                      project.
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </>
            )}
          </div>
        </div>
      )}
      {addProjectModal && (
        <AddProjectModal
          status={addProjectModal}
          handleAddProjectModal={handleAddProjectModal}
        />
      )}
      {addProjectConfirmation && (
        <AddProjectConfirmation
          status={addProjectConfirmation}
          handleAddProjectConfirmation={handleAddProjectConfirmation}
          addproject={Object.keys(props.addProject.data).length === 0  ? projectDetails : props.addProject}
          transferTokenToAdminWallet={transferTokenToAdminWallet}
          submitButtonContent={submitButtonContent}
        />
      )}
    </>
  );
};

const mapStateToPros = (state) => ({
  ownProject: state.projectReducer.ownProject,
  addProject: state.projectReducer.addProject,
  profileDetails: state.users.profile,
  sendProTokenAdmin: state.projectReducer.sendProTokenAdmin,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(OwnProjects);
