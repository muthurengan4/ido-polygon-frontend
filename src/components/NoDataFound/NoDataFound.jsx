import React from "react";
import { connect } from "react-redux";
import "./NoDataFound.css";

const NoDataFound = (props) => {
 
  return (
    <>
      <div className="main-wrapper no-data-found-sec">
        <div className="contianer">
          <div className="no-data-found-img-sec">
              <img 
              src={
                window.location.origin + "/assets/images/no-data-found-img.svg"
              }
              alt="user-image" className="no-data-found-img" />
          </div>
        </div>
      </div>

      
    </>
  );
};

const mapStateToPros = (state) => ({
  cards: state.cards.cardDetails,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(NoDataFound);
