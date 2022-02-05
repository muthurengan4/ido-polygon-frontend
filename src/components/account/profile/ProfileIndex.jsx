import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import ProjectDetails from "../projectDetails/ProjectDetails";
import Wallet from "../wallet/Wallet";
import { connect } from "react-redux";
import { fetchUserDetailsStart } from "../../store/actions/UserAction";
import PaymentDetails from "../paymentDetails/PaymentDetails";
import OwnProjects from "../Ownprojects/OwnProjects";
import InvestedProjects from "../investedProjects/InvestedProjects";

const ProfileIndex = (props) => {
  useEffect(() => {
    if (props.profile.loading) props.dispatch(fetchUserDetailsStart());
  }, []);

  const [activeProfileTab, setActiveProfileTab] = useState(
    props.location.state ? props.location.state.activeIndex : 1
  );

  const hanldeActiveProfileTab = (index) => {
    setActiveProfileTab(index);
  };

  const RenderComponent = (index) => {
    switch (index) {
      case 1:
        return <Profile profileDetails={props.profile} />;

      case 2:
        return <Wallet />;

      case 3:
        return <PaymentDetails />;

      case 4:
        return (
          <OwnProjects
            handleAddProjectModal={props.handleAddProjectModal}
            profileDetails={props.profile}
          />
        );

      case 5:
        return <InvestedProjects />;

      default:
        return <Profile />;
    }
  };

  return (
    <>
      <section className="other_page_layouts">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="tabs tabs--style6">
                <ul role="tablist">
                  <li
                    className={`tab-control ${
                      activeProfileTab == 1 ? "active" : ""
                    }`}
                  >
                    <a
                      className="control-item"
                      onClick={() => hanldeActiveProfileTab(1)}
                    >
                      <h6 className="tab-title">Profile</h6>
                    </a>
                  </li>
                  <li
                    className={`tab-control ${
                      activeProfileTab == 2 ? "active" : ""
                    }`}
                  >
                    <a
                      className="control-item"
                      onClick={() => hanldeActiveProfileTab(2)}
                    >
                      <h6 className="tab-title">Wallet</h6>
                    </a>
                  </li>
                  <li
                    className={`tab-control ${
                      activeProfileTab == 3 ? "active" : ""
                    }`}
                  >
                    <a
                      className="control-item"
                      onClick={() => hanldeActiveProfileTab(3)}
                    >
                      <h6 className="tab-title">My Subscriptions</h6>
                    </a>
                  </li>
                  <li
                    className={`tab-control ${
                      activeProfileTab == 4 ? "active" : ""
                    }`}
                  >
                    <a
                      className="control-item"
                      onClick={() => hanldeActiveProfileTab(4)}
                    >
                      <h6 className="tab-title">Your Projects</h6>
                    </a>
                  </li>
                  <li
                    className={`tab-control ${
                      activeProfileTab == 5 ? "active" : ""
                    }`}
                  >
                    <a
                      className="control-item"
                      onClick={() => hanldeActiveProfileTab(5)}
                    >
                      <h6 className="tab-title">Invested Projects</h6>
                    </a>
                  </li>
                </ul>
                <div className="tab-content customTabWidth">
                  {RenderComponent(activeProfileTab)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const mapStateToPros = (state) => ({
  profile: state.users.profile,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(ProfileIndex);
