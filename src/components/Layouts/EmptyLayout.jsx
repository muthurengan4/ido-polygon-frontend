import React, { useState , useEffect } from "react";
import { Link } from "react-router-dom";
import configuration from "react-global-configuration";
import { Notify } from "react-redux-notify";
import FooterIndex from "./Footer/FooterIndex";
import { connect } from "react-redux";
import Authheader from "./Header/Authheader";
import SubscriptionModal from "../Projects/SubscriptionModal";

const EmptyLayout = (props) => {

  // for test purpose subscriptionModal here remove it if not need for unathorized users 

  const [subscriptionModal , SetSubscriptionModal] = useState(null)


    // for test purpose subscriptionModal here remove it if not need for unathorized users 

  const hanldeSubscriptionModal = (status) => {
    SetSubscriptionModal(status)
  }


  return (
    <>
      <Notify position="TopRight" />
      <Authheader hanldeSubscriptionModal={hanldeSubscriptionModal} {...props}/>
      {React.cloneElement(props.children)}
      <FooterIndex />

      {/* for test purpose subscriptionModal here remove it if not need for unathorized users  */}
      
      <SubscriptionModal status={subscriptionModal} hanldeSubscriptionModal={hanldeSubscriptionModal} />
    </>
  );
};

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(null, mapDispatchToProps)(EmptyLayout);
