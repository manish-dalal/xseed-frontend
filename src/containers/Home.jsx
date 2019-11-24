import React, { useEffect } from "react";
import { connect } from "react-redux";
import InfiniteScrolling from "react-infinite-scrolling";
import { FaSearchMinus } from "react-icons/fa";

import { getItems } from "redux/actions/getItem";
import FilterBar from "components/FilterBar";
import MatchesList from "components/MatchesList";

const Home = props => {
  const { dispatch, items, history, itemsApiInProgress } = props;
  useEffect(() => {
    dispatch(getItems());
    // eslint-disable-next-line
  }, []);

  const loadMore = () => {
    !itemsApiInProgress && dispatch(getItems());
  };

  return (
    <div className="Home">
      {items.length ? (
        <>
          <FilterBar history={history} />
          <div className="center Home_body_container">
            <InfiniteScrolling handleBottomReach={loadMore}>
              <MatchesList matches={items} history={history} />
            </InfiniteScrolling>
          </div>
        </>
      ) : (
        <div className="Home_noResult">
          <FaSearchMinus size={60} />
          <h4 className="title">No result found</h4>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = state => {
  return {
    loading: state.loadingReducer.loadState,
    items: state.itemsReducer.items,
    itemsApiInProgress: state.itemsReducer.itemsApiInProgress
  };
};
export default connect(mapStateToProps)(Home);
