import React from "react";
import { useEffect, useState ,useContext} from "react";
import { connect } from "react-redux";
import { fetchInvestedProjectsStart } from "../../store/actions/ProjectActions";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import configuration from "react-global-configuration";
import { getSuccessNotificationMessage } from "../../Helper/NotificationMessage";
import { createNotification } from "react-redux-notify";
import { Link } from "react-router-dom";
import { authContext } from "../auth/AuthProvider";

const InvestedProjects = (props) => {

  const { auth } = useContext(authContext);

  useEffect(() => {
    if(auth.accounts != "" && !auth.loading){
      props.dispatch(fetchInvestedProjectsStart());
    }
  }, [auth.accounts , auth.loading]);


  const [claimButtonContent, setClaimButtonContent] = useState("");

  const copyToClipboard = (data) => {
    navigator.clipboard.writeText(data);
    const notificationMessage = getSuccessNotificationMessage(
      "text copied to clipboard"
    );
    props.dispatch(createNotification(notificationMessage));
  };

  return (
    <>
      {props.investedproject.loading ? (
        "loading"
      ) : (
        <div id="invested-projects">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb30 no-padding">
            <div className="tableHeadingcustom d-flex justify-content-between">
              <h4 className="text-al secondary-text">Invested Projects</h4>
            </div>
            <div className="customtableWrapper">
              {props.investedproject.data.total > 0 ? (
                <div className="customtableWrapper">
                  <p className="text-gray mt-3">
                    <span className="text-primary">Note: </span>List of
                    investment - All the investment that you made will be
                    displayed here.{" "}
                  </p>
                  <table id="customTable" className="singleProejectsoon">
                    <thead></thead>
                    <thead>
                      <tr>
                        <th>Logo</th>
                        <th>Project</th>
                        <th>Staked Token</th>
                        <th>Unstaked Token</th>
                        <th>Wallet Address</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {props.investedproject.data.total > 0 &&
                        props.investedproject.data.invested_projects.map(
                          (invested_project, index) => (
                            <tr key={index}>
                              <td>
                                <img
                                  className="logo"
                                  src={invested_project.project.picture}
                                  alt={invested_project.name}
                                />
                              </td>
                              <td className="text-capitalize text-center">
                                {invested_project.project.name}
                              </td>
                              <td className="text-capitalize text-center">
                                {invested_project.stacked_formatted}
                              </td>
                              <td className="text-capitalize text-center">
                                {invested_project.unstacked_formatted}
                              </td>
                              <td className="text-capitalize text-center">
                                <button
                                  onClick={() =>
                                    copyToClipboard(
                                      invested_project.wallet_address
                                    )
                                  }
                                  className="copy-to-clip-btn"
                                >
                                  {invested_project.wallet_address}
                                </button>
                              </td>
                              <td className="greenText text-capitalize text-center">
                                {invested_project.status == 1
                                  ? "Success"
                                  : "Pending"}
                              </td>
                            </tr>
                          )
                        )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <>
                  <div className="d-flex justify-content-center mt-5">
                    <p>You haven't invested in any projects. </p>
                  </div>
                  <div className="d-flex justify-content-center">
                    <Link
                      to="/projects"
                      className="btn btn--large  btn--transparent btn--primary ml-3 text-capitalize secondry-button"
                    >
                      Start investing
                    </Link>
                  </div>{" "}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToPros = (state) => ({
  investedproject: state.projectReducer.investedproject,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(InvestedProjects);
