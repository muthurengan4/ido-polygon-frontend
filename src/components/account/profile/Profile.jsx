import React, { useState, useEffect , useContext} from 'react'
import { Link } from 'react-router-dom';
import AddProjectContractCheck from '../../Projects/AddProjectCheck';
import EditProfile from './EditProfile';
import ProfileActionConfirmation from './ProfileActionConfirmation';
import Verification from './Verification';
import { connect } from "react-redux";
import { fetchUserDetailsStart } from '../../store/actions/UserAction';
import { authContext } from '../auth/AuthProvider';

const Profile = (props) => {

  const [activeTab, setActiveTab] = useState('profile');

  const [logoutConfirmation , setLogoutConfirmation] = useState(false);

  const handleTabChange = (name) => {
    setActiveTab(name)
  }

  const handleCancel = () => {
    setActiveTab('profile')
  }

  const handleLogoutConfirmation = (status) => {
    setLogoutConfirmation(status)
  }

  const { hanldeLogout ,auth } = useContext(authContext);

  // useEffect(() => {
  //   if(!auth.loading && auth.accounts != ""){
  //     if (props.profileDetails.loading) props.dispatch(fetchUserDetailsStart());
  //   }
  // }, [auth.accounts , auth.loading]);

  useEffect(() => {
    if(!auth.loading){
      if (props.profileDetails.loading) props.dispatch(fetchUserDetailsStart());
    }
  }, [auth.accounts])

  return (
    <>
      <div id="profile">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding">
            {/* <div>
              <ul className="profile-progress-bar no-margin">
                <li className="completed">
                  <span className="completed">
                    <svg className="woox-icon profile-Completed-icon"><use xlinkHref="#icon-check-mark-2"></use></svg>
                  </span>
                  <div className="info-text">
                    <h5>Register Account</h5>
                    <p>Founder at blocksync ventures</p>
                  </div>
                </li>
                <li className="">
                  <span className="">2</span>
                  <div className="info-text">
                    <h4>2FA</h4>
                    <p>secure your account with 2 factor.</p>
                  </div>
                </li>
                <li>
                  <span className="">3</span>
                  <div className="info-text">
                    <h4>Deposit Funds</h4>
                    <p>add cash or crypto funds to your wallet.</p>
                  </div>
                </li>
              </ul>
            </div> */}
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-5 no-padding">
              <div className="col-lg-8 col-md-6 col-sm-12 col-xs-12">
                {activeTab === "profile" ? (
                  props.profileDetails.loading ? "Loading" :
                    <>
                      <div className="profileDetails">
                        <div className="user-picture">
                          <img src={props.profileDetails.data.picture !== null ? props.profileDetails.data.picture : window.location.origin + "/assets/img/author3-320.jpg"} alt="avatar" />
                        </div>
                      </div>
                      <div className="user-details">
                        <h5 className="c-primary">{props.profileDetails.data.name}</h5>
                      </div>
                    </>
                ) : activeTab === 'editprofile' && (
                  <EditProfile handleCancel={handleCancel} />
                ) 
                
                }
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                <div className="profile-options mt-lg-5">
                  <button className="btn not-btn text-capitalize text-center mb-3" onClick={() => handleTabChange('editprofile')} >
                    <h4 className=" text-capitalize text-center secondary-text">
                      Edit Profile
                    </h4>
                  </button>

                  {/* <h6 className=" text-capitalize text-center" onClick={() => handleTabChange('verification')}>
                    verification
                  </h6> */}
                  <button className="btn not-btn text-capitalize text-center mb-3" onClick={() => handleLogoutConfirmation(true)} >
                    <h4 className="m-0 text-capitalize text-center secondary-text">logout</h4> 
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProfileActionConfirmation 
          status={logoutConfirmation} 
          onClose={handleLogoutConfirmation}
          warningMessage="Are you sure, want to logout.?"
          confirmMessage="logout"
          onConfirm={hanldeLogout}
        />
      </div>
    </>
  )
}

const mapStateToPros = (state) => ({
  profileDetails: state.users.profile,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(Profile)
