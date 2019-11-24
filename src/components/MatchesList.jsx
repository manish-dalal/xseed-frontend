import React from "react";
import { AutoSizer, WindowScroller, List } from "react-virtualized";

import MatchCard from "./MatchCard";

const MatchesList = props => {
  const { matches } = props;
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
                        return (
                          <MatchCard
                            item={matches[index]}
                            {...{
                              index,
                              isScrolling,
                              isVisible,
                              key,
                              style
                            }}
                          />
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

export default MatchesList;
