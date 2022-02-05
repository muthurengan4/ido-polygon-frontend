import React, { useState } from "react";
import ProfileSideBar from "../account/profile/ProfileSideBar";
import { Notify } from "react-redux-notify";
import FooterIndex from "./Footer/FooterIndex";
import HeaderIndex from "./Header/HeaderIndex";
import SubscriptionModal from "../Projects/SubscriptionModal";
import AddProjectModal from "../Projects/AddProjectModal";

const ProfileLayout = (props) => {
  const [subscriptionModal, setSubScriptionModal] = useState(false);

  const hanldeSubscriptionModal = (status) => {
    setSubScriptionModal(status);
  };

  return (
    <>
      <Notify position="TopRight" />
      <HeaderIndex
        hanldeSubscriptionModal={hanldeSubscriptionModal}
        {...props}
      />
      <ProfileSideBar
        tab={React.cloneElement(props.children, {
          hanldeSubscriptionModal: hanldeSubscriptionModal,
        })}
      />
      <FooterIndex />
      <SubscriptionModal
        status={subscriptionModal}
        hanldeSubscriptionModal={hanldeSubscriptionModal}
      />
    </>
  );
};

export default ProfileLayout;
