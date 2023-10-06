import {
  FARMS_FETCH_FAILED,
  FARMS_FETCH_REQUEST,
  FARMS_FETCH_SUCCESS,
  FARMS_FETCH_BYID_SUCCESS,
  FARMS_FETCH_BYVERIFIED_SUCCESS,
} from "../actions/actionType";

const initialState = {
  farms: [],
  farm: {},
  loading: false,
  verified: [],
};

export default function farmReducer(state = initialState, action) {
  switch (action.type) {
    case FARMS_FETCH_REQUEST:
      return { ...state, loading: true };
    case FARMS_FETCH_SUCCESS:
      return { ...state, farms: action.payload, loading: false };
    case FARMS_FETCH_FAILED:
      return { ...state, loading: false };
    case FARMS_FETCH_BYID_SUCCESS:
      return { ...state, farm: action.payload, loading: false };
    case FARMS_FETCH_BYVERIFIED_SUCCESS:
      return { ...state, verified: action.verified };
    default:
      return state;
  }
}
