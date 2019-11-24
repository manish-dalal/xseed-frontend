import ActionTypes from "../constants/ActionTypes";

export const getItems = () => {
  return {
    type: ActionTypes.GET_ITEMS
  };
};

export const clearItems = () => {
  return {
    type: ActionTypes.CLEAR_ITEMS_LIST
  };
};

export const itemsFilterChange = payload => ({
  type: ActionTypes.ITEMS_FILTER_CHANGE,
  payload
});
