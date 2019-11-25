import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import getImages from "utils/images";
import { allTeams } from "utils/common";
// @ts-ignore
import colors from "assets/css/colors.scss";

const { theme } = colors;

function MatchCard(props) {
  const { item, favourite_team, key, style, history } = props;
  const { date, team1, team2, venue, city, season = "" } = item;
  const onClick = () => {
    history.push("/item-detail", { item });
  };
  if (!date && !team1 && !team2 && !venue && !city && !season) {
    return (
      <div
        className="MatchCard"
        key={key}
        style={{
          ...style,
          borderTopColor: favourite_team
            ? allTeams[favourite_team].color
            : theme,
          display: "block",
          height: 140,
          margin: "20px 0px"
        }}
      >
        <SkeletonTheme
          color="rgba(227, 247, 250, 0.8)"
          highlightColor={
            favourite_team ? allTeams[favourite_team].color : theme
          }
        >
          <p style={{ margin: "20px 10px 0" }}>
            <Skeleton count={4} />
          </p>
        </SkeletonTheme>
      </div>
    );
  }
  return (
    <div key={key} style={style}>
      <h6 className="marginPadding">{date ? date : season}</h6>
      <div
        className="MatchCard"
        onClick={onClick}
        style={{
          borderTopColor: favourite_team
            ? allTeams[favourite_team].color
            : theme
        }}
      >
        <div className="left-image-view MatchCard_imageView">
          <img
            src={getImages(allTeams[team1].icon)}
            className="teamImage"
            alt=""
          />
        </div>

        <div className="MatchCard_detail">
          <div className="team-name">{team1}</div>
          <h6 className="marginPadding">VS</h6>
          <div className="team-name">{team2}</div>
          <div className="venue">{`${venue}, ${city}`}</div>
        </div>
        <div className="right-image-view MatchCard_imageView">
          <img
            src={getImages(allTeams[team2].icon)}
            className="teamImage"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    favourite_team: state.userReducer.favourite_team
  };
};
const MatchCardWithRouter = withRouter(props => <MatchCard {...props} />);
export default connect(mapStateToProps)(MatchCardWithRouter);
