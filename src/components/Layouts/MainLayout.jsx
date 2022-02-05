import React, { Component } from "react";
// import HeaderIndex from "./Header/HeaderIndex";
import { Notify } from "react-redux-notify";
import FooterIndex from "./Footer/FooterIndex";
import HeaderIndex from "./Header/HeaderIndex";
import SubscriptionModal from "../Projects/SubscriptionModal";
import AddProjectModal from "../Projects/AddProjectModal";
import Authheader from "./Header/Authheader";

class MainLayout extends Component {
  state = {
    subscriptionModal: false,
  };

  hanldeSubscriptionModal = (status) => {
    this.setState({
      subscriptionModal: status,
    });
  };
  
  render() {
    return (
      <div className="">
        <Notify position="TopRight" />
        <HeaderIndex hanldeSubscriptionModal={this.hanldeSubscriptionModal} {...this.props} />
        {/* <AuthHeaderIndex /> */}
        {React.cloneElement(this.props.children, {
          hanldeSubscriptionModal: this.hanldeSubscriptionModal,
          handleAddProjectModal: this.handleAddProjectModal,
        })}
        <FooterIndex />
        <SubscriptionModal
          status={this.state.subscriptionModal}
          hanldeSubscriptionModal={this.hanldeSubscriptionModal}
        />
      </div>
    );
  }
}

export default MainLayout;
