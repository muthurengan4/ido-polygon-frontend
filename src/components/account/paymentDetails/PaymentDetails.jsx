import React, { useEffect , useContext } from "react";
import { connect } from "react-redux";
import { fetchMySubscriptionStart } from "../../store/actions/SubscriptionAction";
import configuration from "react-global-configuration";
import { authContext } from "../auth/AuthProvider";

const PaymentDetails = (props) => {

  const { auth } = useContext(authContext);

  useEffect(() => {
    if(auth.accounts != "" && !auth.loading){
      props.dispatch(fetchMySubscriptionStart());
    }
  }, [auth.accounts , auth.loading]);

  return (
    <>
      <div id="payment-details">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-3 mb-xs-0 px-xs-0">
          <div className="tableHeadingcustom">
            <h4 className="text-al secondary-text">My Subscriptions</h4>
          </div>
          <div className="customtableWrapper">
            <p className="text-gray mt-3">
              <span className="text-primary">Note: </span>List of subscriptions
              which you already subscribed to.{" "}
            </p>

            {props.subscriptions.loading ? (
              <div className="d-flex justify-content-center mt-5">
                <p className="text-center">Loading...</p>
              </div>
            ) : props.subscriptions.data.length > 0 ? (
              <table id="customTable" className="custom-table-border">
                <thead>
                  <tr>
                    <th className="text-capitalize">no</th>
                    <th className="text-capitalize">Subscription</th>
                    {/* <th className="text-capitalize">Subscribed</th> */}
                    <th className="text-capitalize">expire</th>
                    <th className="text-capitalize">validity</th>
                    <th className="text-capitalize">Price</th>
                    <th className="text-capitalize">No of Projects</th>
                    <th className="text-capitalize">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {props.subscriptions.data.map((sub, i) => (
                    <tr>
                      <td className="text-capitalize">{i + 1}</td>
                      <td className="text-capitalize">
                        {sub.subscription_name}
                      </td>
                      {/* <td className="text-capitalize">{sub.paid_date}</td> */}
                      <td className="text-capitalize">{sub.expiry_date}</td>
                      <td className="text-capitalize">{sub.plan_formatted}</td>
                      <td className="text-capitalize">
                        {sub.amount_formatted}
                      </td>
                      <td className="text-capitalize">{sub.no_of_projects}</td>
                      <td className="text-capitalize">
                        {sub.status_formatted}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="d-flex justify-content-center mt-5">
                <p>No data Found...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  subscriptions: state.subscriptions.mySubscription,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(PaymentDetails);
