import React from "react";
import { AutoSizer, WindowScroller, List } from "react-virtualized";

import getImages from "utils/images";
import { allTeams } from "utils/common";
import { connect } from "react-redux";

// @ts-ignore
import colors from "assets/css/colors.scss";

const { theme } = colors;

const MatchesList = props => {
  const { matches, history, favourite_team } = props;
  const onClick = item => {
    history.push("/item-detail", { item });
  };
  return (
    <div className="MatchesList">
      <div className="app-container">
        <WindowScroller>
          {({
            height,
            isScrolling,
            registerChild,
            onChildScroll,
            scrollTop
          }) => (
            <div className="WindowScroller">
              <AutoSizer disableHeight>
                {({ width }) => (
                  <div ref={registerChild}>
                    <List
                      autoHeight
                      height={height}
                      width={width}
                      scrollTop={scrollTop}
                      isScrolling={isScrolling}
                      onScroll={onChildScroll}
                      overscanRowCount={4}
                      rowCount={matches.length}
                      rowHeight={180}
                      rowRenderer={({
                        index,
                        isScrolling,
                        isVisible,
                        key,
                        style
                      }) => {
                        const {
                          date,
                          team1,
                          team2,
                          venue,
                          city,
                          season = ""
                        } = matches[index];

                        return (
                          <div key={key} style={style}>
                            <h6 className="marginPadding">
                              {date ? date : season}
                            </h6>
                            <div
                              className="MatchCard"
                              onClick={onClick.bind(this, matches[index])}
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
                      }}
                    />
                  </div>
                )}
              </AutoSizer>
            </div>
          )}
        </WindowScroller>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    favourite_team: state.userReducer.favourite_team
  };
};
export default connect(mapStateToProps)(MatchesList);
