import { all, call, put, takeLatest, select } from "redux-saga/effects";
import ActionTypes from "../constants/ActionTypes";
import APICaller from "utils/APICaller";

export function* getItems() {
  const filters = yield select(state => state.itemsReducer.filters);
  let { search = "", sort = "", order = "", limit = 20, skip = 0 } = filters;
  let url = `posts?limit=${limit}`;
  if (search.length || sort.length || order.length || skip) {
    search = search.trim().toLowerCase();
    sort = order === "desc" ? `-${sort}` : sort;
    url = `${url}&filter=${search}&sort=${sort}&skip=${skip}`;
  }
  try {
    const response = yield call(APICaller, { method: "GET", reqUrl: url });
    yield put({
      type: ActionTypes.GET_ITEMS_SUCCESS,
      payload: response.data
    });
  } catch (err) {
    yield put({
      type: ActionTypes.GET_ITEMS_FAILURE,
      payload: []
    });
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.GET_ITEMS, getItems)]);
}
