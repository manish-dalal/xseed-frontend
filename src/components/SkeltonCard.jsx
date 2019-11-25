import React from "react";
import { connect } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { allTeams } from "utils/common";
// @ts-ignore
import colors from "assets/css/colors.scss";

const { theme } = colors;

function SkeltonCard(props) {
  const { key, favourite_team } = props;
  return (
    <div
      className="MatchCard"
      key={key}
      style={{
        borderTopColor: favourite_team ? allTeams[favourite_team].color : theme,
        display: "block",
        height: 140,
        margin: "10px 0px"
      }}
    >
      <SkeletonTheme
        color="rgba(227, 247, 250, 0.8)"
        highlightColor={favourite_team ? allTeams[favourite_team].color : theme}
      >
        <p style={{ margin: "20px 10px 0" }}>
          <Skeleton count={4} />
        </p>
      </SkeletonTheme>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    favourite_team: state.userReducer.favourite_team
  };
};
export default connect(mapStateToProps)(SkeltonCard);
