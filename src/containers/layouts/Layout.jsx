import React from "react";
import { connect } from "react-redux";

import Header from "./Header";
import LoadingSpinner from "components/LoadingSpinner";
import getImage from "utils/images";
import { allTeams } from "utils/common";
// @ts-ignore
import colors from "assets/css/colors.scss";

const { theme } = colors;

const Layout = props => {
  const { loading, favourite_team } = props;
  return (
    <React.Fragment>
      <div
        className="fixed-body"
        style={{
          backgroundColor: favourite_team
            ? allTeams[favourite_team].color
            : theme,
          opacity: 0.8,
          backgroundImage: `url(${getImage(
            favourite_team ? allTeams[favourite_team].bg : "defaultBg"
          )})`,
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}
      ></div>
      {loading && (
        <div className="loading">
          <LoadingSpinner />
        </div>
      )}
      <Header />
      <div className="main-app">{props.children}</div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.loadingReducer.loadState,
    favourite_team: state.userReducer.favourite_team
  };
};
export default connect(mapStateToProps)(Layout);
