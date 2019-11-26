import React from "react";
import { FaFilter } from "react-icons/fa";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from "reactstrap";
import { connect } from "react-redux";

import { getItems, itemsFilterChange, clearItems } from "redux/actions/getItem";
import { allTeams } from "utils/common";
// @ts-ignore
import colors from "assets/css/colors.scss";

const { theme } = colors;

function FilterBar(props) {
  const { filters, dispatch, favourite_team } = props;
  const onSortChange = order => {
    dispatch(itemsFilterChange({ sort: "season", order, skip: 0 }));
    dispatch(clearItems());
    dispatch(getItems());
  };
  const onClickPredict = () => {
    props.history.push("/predict-result");
    dispatch(itemsFilterChange({ sort: "", order: "", search: "" }));
  };
  return (
    <div
      className="Home_filterBar center"
      style={{
        backgroundColor: favourite_team ? allTeams[favourite_team].color : theme
      }}
    >
      <h5 className="title">MATCHES</h5>
      <Button color="success" className="predict-btn" onClick={onClickPredict}>
        Predict Result
      </Button>
      <UncontrolledDropdown>
        <DropdownToggle tag="a" className="nav-link">
          <div className="sort btn center">
            <div className="description">Sort</div>
            <FaFilter size={20} />
          </div>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem
            active={filters.order === "asc" ? true : false}
            onClick={onSortChange.bind(this, "asc")}
            style={{
              backgroundColor:
                filters.order === "asc"
                  ? favourite_team
                    ? allTeams[favourite_team].color
                    : theme
                  : "none"
            }}
          >
            Sort by season asc
          </DropdownItem>
          <DropdownItem
            active={filters.order === "desc" ? true : false}
            onClick={onSortChange.bind(this, "desc")}
            style={{
              backgroundColor:
                filters.order === "desc"
                  ? favourite_team
                    ? allTeams[favourite_team].color
                    : theme
                  : "none"
            }}
          >
            Sort by season desc
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    filters: state.itemsReducer.filters,
    favourite_team: state.userReducer.favourite_team
  };
};
export default connect(mapStateToProps)(FilterBar);
