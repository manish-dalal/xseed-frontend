import React, { useEffect } from "react";
const keysMaping = {
  season: "Season",
  date: "Date",
  team1: "First Team",
  team2: "Second Team",
  toss_winner: "Toss winner team",
  toss_decision: "Toss decision",
  result: "Result",
  dl_applied: "Dl applied",
  winner: "Winner",
  win_by_runs: "Win by runs",
  win_by_wickets: "Win by wickets",
  player_of_match: "Player of match",
  venue: "Venue",
  city: "City",
  umpire1: "Umpire1",
  umpire2: "Umpire2",
  umpire3: "Umpire3"
};

const ItemDetail = props => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [props.location]);
  if (props.location && !props.location.state) {
    props.history.push("/home");
    return <div></div>;
  } else {
    const { item } = props.location.state;
    return (
      <div className="ItemDetail Home">
        <div className="ItemDetail_body">
          <h4 className="title">MATCH DETAILS</h4>
          {[
            "season",
            "date",
            "team1",
            "team2",
            "venue",
            "city",
            "toss_winner",
            "toss_decision",
            "result",
            "dl_applied",
            "winner",
            "win_by_runs",
            "win_by_wickets",
            "player_of_match",
            "umpire1",
            "umpire2",
            "umpire3"
          ].map((key, index) => (
            <div className="ItemDetail_body_row" key={index}>
              <h6 className="key">{keysMaping[key]}</h6>
              <h5 className="value">{item[key]}</h5>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default ItemDetail;
