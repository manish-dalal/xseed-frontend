import ActionTypes from "../constants/ActionTypes";

const initialState = {
  items: [],
  itemsApiInProgress: false,
  totalItemCount: 1,
  filters: {
    search: "",
    sort: "",
    order: "",
    limit: 20,
    skip: 0
  }
};

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_ITEMS:
      return Object.assign({}, state, {
        itemsApiInProgress: true
      });
    case ActionTypes.GET_ITEMS_FAILURE:
      return Object.assign({}, state, {
        itemsApiInProgress: false
      });
    case ActionTypes.GET_ITEMS_SUCCESS:
      return Object.assign({}, state, {
        items: [...state.items, ...action.payload[0]],
        totalItemCount: action.payload[1],
        itemsApiInProgress: false,
        filters: {
          ...state.filters,
          skip: state.filters.skip + state.filters.limit
        }
      });
    case ActionTypes.CLEAR_ITEMS_LIST:
      return Object.assign({}, state, {
        items: []
      });
    case ActionTypes.ITEMS_FILTER_CHANGE: {
      return Object.assign({}, state, {
        filters: { ...state.filters, ...action.payload }
      });
    }
    default:
      return state;
  }
};

export default itemsReducer;
