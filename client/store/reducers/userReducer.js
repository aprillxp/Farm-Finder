import {
  INVESTOR_FETCH_SUCCESS,
  USER_FETCH_SUCCESS,
} from "../actions/actionType";

const initialState = {
  access_token: "",
  role: "",
  userId: "",
  user: {},
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case INVESTOR_FETCH_SUCCESS:
      return {
        ...state,
        access_token: action.token,
        role: action.role,
        userId: action.userId,
      };
    case USER_FETCH_SUCCESS:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
}
