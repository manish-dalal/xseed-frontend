import React, { useRef, useCallback } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import debounce from "lodash/debounce";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import getImage from "utils/images";
import { getItems, itemsFilterChange, clearItems } from "redux/actions/getItem";
import { logout } from "redux/actions/user";
import { allTeams } from "utils/common";
// @ts-ignore
import colors from "assets/css/colors.scss";

const { theme } = colors;

const Header = props => {
  const {
    dispatch,
    filters,
    location: { pathname },
    favourite_team
  } = props;

  const { search = "" } = filters;
  const myInp = useRef(null);
  function loadData(searchValue) {
    dispatch(clearItems());
    dispatch(getItems());
  }
  const delayedQuery = useCallback(debounce(loadData, 300), []);

  const onSearch = event => {
    const {
      target: { value }
    } = event;
    dispatch(
      itemsFilterChange({ search: value, sort: "", order: "", skip: 0 })
    );

    if (value.length > 2) {
      delayedQuery(value);
    }
  };
  const clearSearch = () => {
    dispatch(itemsFilterChange({ search: "", sort: "", order: "", skip: 0 }));
    loadData("");
  };

  if (["/login", "/signup"].includes(pathname)) {
    return null;
  }

  const logoutFunction = () => {
    dispatch(logout());
    props.history.push("/login");
  };
  const moveToHome = () => {
    props.history.push("/home");
  };
  const moveToProfile = () => {
    props.history.push("/profile");
  };

  return (
    <div
      className="Header center"
      style={{
        backgroundColor: favourite_team ? allTeams[favourite_team].color : theme
      }}
    >
      <img
        src={getImage("logo")}
        alt="logo"
        style={{ maxWidth: "20%", maxHeight: 35, opacity: 0.8 }}
        onClick={moveToHome}
      />
      <div className="search-wrapper center">
        {pathname === "/home" ? (
          <div
            className="search center"
            onClick={() => {
              myInp.current.focus();
            }}
          >
            <FaSearch className="Header_icon search_icon" />
            <input
              className="search_input"
              placeholder="Search by team name"
              onChange={onSearch}
              value={search}
              ref={myInp}
            />
            {search.length ? (
              <IoMdClose size={25} onClick={clearSearch} />
            ) : null}
          </div>
        ) : (
          void 0
        )}
      </div>
      <div style={{ minWidth: 85 }}>
        <UncontrolledDropdown>
          <DropdownToggle tag="a" className="nav-link dropdown-link" caret>
            <FaUserCircle className="Header_icon" size={36} />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={moveToProfile}>Profile</DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={logoutFunction}>Log out</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    filters: state.itemsReducer.filters,
    favourite_team: state.userReducer.favourite_team
  };
};

const HeaderWithRouter = withRouter(props => <Header {...props} />);
export default connect(mapStateToProps)(HeaderWithRouter);
