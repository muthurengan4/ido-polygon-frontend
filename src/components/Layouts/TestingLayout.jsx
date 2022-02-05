import React, { Component } from "react";
import { Notify } from "react-redux-notify";
import TestingHeader from "./Header/TestingHeader";
import TestingFooter from "./Footer/TestingFooter";

class TestingLayout extends Component {
 state = {};
 render() {
  return (
   <div className="">
    <Notify position="TopRight" />
    {React.cloneElement(this.props.children)}
   </div>
  );
 }
}

export default TestingLayout;
