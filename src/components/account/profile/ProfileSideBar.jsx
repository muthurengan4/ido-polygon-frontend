import React from "react";
import { NavLink } from "react-router-dom";

const ProfileSideBar = (props) => {
  return (
    <>
      <section className="other_page_layouts">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="tabs tabs--style6 layout">
                <ul role="tablist">
                  <NavLink
                    to="/account/profile"
                    className="tab-control"
                    activeClassName="active"
                  >
                    <li className="control-item">
                      <div>
                        <h6 className="tab-title">Profile</h6>
                      </div>
                    </li>
                  </NavLink>
                  <NavLink
                    to="/account/wallet"
                    className="tab-control"
                    activeClassName="active"
                  >
                    <li className="control-item">
                      <div>
                        <h6 className="tab-title">Wallet</h6>
                      </div>
                    </li>
                  </NavLink>
                  {/* <NavLink
                    to="/account/my-subscriptions"
                    className="tab-control"
                    activeClassName="active"
                  >
                    <li className="control-item">
                      <div>
                        <h6 className="tab-title">My Subscriptions</h6>
                      </div>
                    </li>
                  </NavLink> */}
                  {/* <NavLink
                    to="/account/own-projects"
                    className="tab-control"
                    activeClassName="active"
                  >
                    <li className="control-item">
                      <div>
                        <h6 className="tab-title">Your Projects</h6>
                      </div>
                    </li>
                  </NavLink> */}
                  <NavLink
                    to="/account/invested-projects"
                    className="tab-control"
                    activeClassName="active"
                  >
                    <li className="control-item">
                      <div>
                        <h6 className="tab-title">Invested Projects</h6>
                      </div>
                    </li>
                  </NavLink>
                </ul>
                <div className="tab-content customTabWidth">{props.tab}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileSideBar;
