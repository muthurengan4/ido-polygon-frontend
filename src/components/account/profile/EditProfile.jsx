import React, { useState , useContext, useEffect } from "react";
import { connect } from "react-redux";
import {
  editUserDetails,
  updateUserDetailsStart,
  fetchUserDetailsStart
} from "../../store/actions/UserAction";

const EditProfile = (props) => {

  const [profileInputData, setProfileInputData] = useState({
    name: "",
  });

  const [image, setImage] = useState({
    picture: "",
    cover: "",
  });

  const handleChangeImage = (event) => {
    if (event.currentTarget.type === "file") {
      console.log(event.target)
      setProfileInputData({
        ...profileInputData,
        [event.currentTarget.name]: event.currentTarget.files[0],
      });
      let reader = new FileReader();
      let file = event.currentTarget.files[0];

      if (event.currentTarget.name === "cover") {
        reader.onloadend = () => {
          setImage({ ...image, cover: reader.result });
        };
      }

      if (event.currentTarget.name === "picture") {
        reader.onloadend = () => {
          setImage({ ...image, picture: reader.result });
        };
      }

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.keys(profileInputData).length > 0)
      props.dispatch(updateUserDetailsStart(profileInputData));
    else props.dispatch(updateUserDetailsStart());
  };

  return props.profile.loading ? (
    "Loading.."
  ) : (
    <>
      <div className="profileDetails mb-3">
        <div className="user-picture editProfileImage">
          <input
            id="name"
            className="editprofileInput no-padding"
            name="picture"
            placeholder="Name"
            type="file"
            accept="image/*"
            onChange={handleChangeImage}
          />
          <img
            src={
              props.profile.data.picture !== null
                ? image.picture != "" ? image.picture : props.profile.data.picture
                : window.location.origin + "/assets/img/author3-320.jpg"
            }
            alt="avatar"
          />
          <span>
            <i class="far fa-image"></i>
          </span>
        </div>
      </div>
      <form
        method="get"
        className="form--search form--search-transparent"
        onSubmit={handleSubmit}
      >
        <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb30">
          <label htmlFor="name" className="custom-label mb-3">
            Name
          </label>
          <input
            id="name"
            className=" no-padding"
            name="name"
            placeholder="Name"
            type="text"
            value={props.profile.data.name}
            onChange={(event) => {
              props.dispatch(
                editUserDetails(
                  event.currentTarget.name,
                  event.currentTarget.value
                )
              );
            }}
          />
        </div>

        <div className="buttoncancelsavewrapper mt-3">
          <button
            type="button"
            className="btn btn--medium btn--transparent btn--primary"
            onClick={() => {props.handleCancel(); props.dispatch(fetchUserDetailsStart())}}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn--medium btn--primary ml-3 blacktext"
            onClick={handleSubmit}
            disabled={props.profileInputData.buttonDisable}
          >
            {props.profileInputData.loadingButtonContent !== null
              ? props.profileInputData.loadingButtonContent
              : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
};

const mapStateToPros = (state) => ({
  profile: state.users.profile,
  profileInputData: state.users.profileInputData,
  profileDetails: state.users.profile,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(EditProfile);
