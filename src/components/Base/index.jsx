import React, { Component, useEffect, useState, useContext } from "react";
import { createBrowserHistory as createHistory } from "history";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import configuration from "react-global-configuration";
import { apiConstants } from "../Constant/constants";
import NotFoundIndex from "../Handlers/ErrorPages/NotFoundIndex";
import NoDataFound from "../NoDataFound/NoDataFound";
import { setTranslations, setLanguage } from "react-multi-lang";
import en from "../translation/en.json";
import pt from "../translation/pt.json";
import LandingPageIndex from "../LandingPage/LandingPageIndex";
import MainLayout from "../Layouts/MainLayout";
import ConnectWallet from "../Wallet/ConnectWallet";
import EmptyLayout from "../Layouts/EmptyLayout";
import TestingLayout from "../Layouts/TestingLayout";
import Projects from "../Projects/Projects";
import BuyToken from "../Wallet/BuyToken";
import ProfileIndex from "../account/profile/ProfileIndex";
import StackingIndex from "../stacking/StackingIndex";
import Projectscomingsoon from "../Projects/Projectscomingsoon";
import SingleProjectIndex from "../Projects/SingleProjectIndex";
import SubscriptionIndex from "../subscription/SubscriptionIndex";
import EditProject from "../Projects/EditProject";
import Logout from "../account/auth/Logout";
import StaticPages from "../staticpages/StaticPages";
import AdminSendTokenUser from "../AdminAccess/AdminSendTokenUser";
import AddProjectTransctionStatus from "../transactiion/AddProjectTransctionStatus";
import ProfileLayout from "../Layouts/ProfileLayout";
import ProfileSideBar from "../account/profile/ProfileSideBar";
import Profile from "../account/profile/Profile";
import Wallet from "../account/wallet/Wallet";
import PaymentDetails from "../account/paymentDetails/PaymentDetails";
import OwnProjects from "../account/Ownprojects/OwnProjects";
import InvestedProjects from "../account/investedProjects/InvestedProjects";
import LogoutLayout from "../Layouts/LogoutLayout";
import { authContext } from "../account/auth/AuthProvider";
import ContactUs from "../LandingPage/ContactUs";

const history = createHistory();
const $ = window.$;

setTranslations({ pt, en });

const AppRoute = ({
  component: Component,
  layout: Layout,
  screenProps: ScreenProps,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => (
      <Layout screenProps={ScreenProps} {...props} {...rest}>
        <Component {...props} />
      </Layout>
    )}
    isAuthed
  />
);

const PrivateRoute = ({
  component: Component,
  layout: Layout,
  screenProps: ScreenProps,
  authentication,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      authentication === true ? (
        <Layout screenProps={ScreenProps} {...props} {...rest}>
          <Component {...props} authRoute={true} />
        </Layout>
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const App = () => {

  let userId = localStorage.getItem("userId");
  let accessToken = localStorage.getItem("accessToken");
  let userLoginStatus = localStorage.getItem("userLoginStatus");

  const [loading, setLoading] = useState(true);

  const [authentication, setAuthntication] = useState(
    userId && accessToken && userLoginStatus == "true" ? true : false
  );

  const { auth } = useContext(authContext);

  history.listen((location, action) => {
    userId = localStorage.getItem("userId");
    accessToken = localStorage.getItem("accessToken");
    userLoginStatus = localStorage.getItem("userLoginStatus");
    setLoading(true);
    setAuthntication(
      userId && accessToken && userLoginStatus == "true" ? true : false
    );
    document.body.scrollTop = 0;
  });

  useEffect(() => {
    setAuthntication(auth.authStatus);
      document.body.classList.remove("noBodyOverflow");
  }, [auth.authStatus]);

  return (
    <>
      <Helmet>
        <title>{configuration.get("configData.site_name")}</title>
        <link
          rel="icon"
          type="image/png"
          href={configuration.get("configData.site_icon")}
        // sizes="16x16"
        />
      </Helmet>
      <Switch>
        <AppRoute
          path={"/"}
          component={LandingPageIndex}
          exact
          layout={authentication ? MainLayout : EmptyLayout}
        />
        <AppRoute
          path={"/contact-us"}
          component={ContactUs}
          exact
          layout={authentication ? MainLayout : EmptyLayout}
        />
        <AppRoute
          path={"/wallet"}
          component={ConnectWallet}
          layout={MainLayout}
        />
        <AppRoute
          path={"/projects"}
          component={Projects}
          layout={authentication ? MainLayout : EmptyLayout}
        />
        <AppRoute
          path={"/buytoken"}
          component={BuyToken}
          layout={MainLayout}
        />
        {/* <PrivateRoute
        authentication={this.state.authentication}
        path={"/profile"}
        component={ProfileIndex}
        layout={MainLayout}
      /> */}
        <AppRoute
          path={"/staking"}
          component={StackingIndex}
          layout={authentication ? MainLayout : EmptyLayout}
        />
        <AppRoute
          path={"/projects-coming-soon"}
          component={Projectscomingsoon}
          layout={MainLayout}
        />
        <AppRoute
          path={"/single-project/:id"}
          component={SingleProjectIndex}
          layout={authentication ? MainLayout : EmptyLayout}
        />

        <PrivateRoute
          authentication={authentication}
          path={"/subscriptions"}
          component={SubscriptionIndex}
          layout={authentication ? MainLayout : EmptyLayout}
        />

        <AppRoute
          path={"/edit-project/:id"}
          component={EditProject}
          layout={MainLayout}
        />

        <AppRoute
          path={"/pages/:id"}
          component={StaticPages}
          layout={EmptyLayout}
        />

        <AppRoute path={"/logout"} component={Logout} layout={LogoutLayout} />

        <AppRoute
          path={"/send-token-user/:id"}
          component={AdminSendTokenUser}
          layout={authentication ? MainLayout : EmptyLayout}
        />

        {/* <PrivateRoute
              authentication={authentication}
              path={"/account/transaction-success/:id"}
              component={AddProjectTransctionStatus}
              layout={MainLayout}
            /> */}

        <PrivateRoute
          authentication={authentication}
          path={"/account/profile"}
          component={Profile}
          layout={ProfileLayout}
        />
        <PrivateRoute
          authentication={authentication}
          path={"/account/wallet"}
          component={Wallet}
          layout={ProfileLayout}
        />
        <PrivateRoute
          authentication={authentication}
          path={"/account/my-subscriptions"}
          component={PaymentDetails}
          layout={ProfileLayout}
        />
        {/* <PrivateRoute
              authentication={authentication}
              path={"/account/own-projects"}
              component={OwnProjects}
              layout={ProfileLayout}
            /> */}
        <PrivateRoute
          authentication={authentication}
          path={"/account/invested-projects"}
          component={InvestedProjects}
          layout={ProfileLayout}
        />

        <Route path="*" component={NotFoundIndex} />
      </Switch>
    </>
  );
};

export default App;
