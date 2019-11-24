import React, { useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import isEmpty from "lodash/isEmpty";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./layouts/Layout";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import ItemDetail from "./ItemDetail";
import Profile from "./Profile";
import PredictResult from "./PredictResult"

import APICaller from "utils/APICaller";
import { updateLoadingAction } from "redux/actions/loading";
import { saveUser, logout } from "redux/actions/user";

const Root = props => {
  const {
    history,
    dispatch,
    location: { pathname }
  } = props;
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!isEmpty(user)) {
      dispatch(saveUser(user));
      dispatch(updateLoadingAction(true));
      APICaller({
        method: "GET",
        reqUrl: "users/isloggedin"
      })
        .then(res => {
          delete res.data._id;
          dispatch(saveUser(res.data));
          if (res.data.favourite_team !== user.favourite_team) {
            localStorage.setItem(
              "user",
              JSON.stringify({
                ...user,
                favourite_team: res.data.favourite_team
              })
            );
          }
          dispatch(updateLoadingAction(false));
          !["/item-detail", "/profile", "/predict-result"].includes(pathname) &&
            history.push("/home");
        })
        .catch(err => {
          dispatch(updateLoadingAction(false));
          history.push("/login");
          if (err.response && err.response.data === "Unauthorized") {
            dispatch(logout());
          }
        });
    } else {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={SignUp} />

        <Route path="/home" exact component={Home} />
        <Route path="/item-detail" exact component={ItemDetail} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/predict-result" exact component={PredictResult} />

        <Redirect to="/login" />
      </Switch>
    </Layout>
  );
};

const RootWithRouter = withRouter(props => <Root {...props} />);
export default connect()(RootWithRouter);
