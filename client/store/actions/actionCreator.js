import {
  FARMS_FETCH_REQUEST,
  FARMS_FETCH_SUCCESS,
  FARMS_FETCH_FAILED,
  INVESTOR_FETCH_SUCCESS,
  INVEST_FETCH_REQUEST,
  INVEST_FETCH_SUCCESS,
  BALANCE_FETCH_SUCCESS,
  USER_FETCH_SUCCESS,
  FARMS_FETCH_BYVERIFIED_SUCCESS,
} from "./actionType";
import axios from "axios";

const alert = (msg, bg) => {
  Swal.fire({
    text: `${msg}`,
    timer: 2000,
    showCloseButton: true,
    customClass: {
      confirmButton: "icon",
      popup: `${bg}`,
    },
    toast: true,
    position: "top-right",
  });
};

const base_url = "https://114f-180-241-183-225.ngrok-free.app/";

export const farmsFetchRequest = (data) => {
  return { type: FARMS_FETCH_REQUEST, payload: data };
};
export const investFetchRequest = (data) => {
  return { type: INVEST_FETCH_REQUEST, payload: data };
};

export const farmsFetchFailed = (data) => {
  return { type: FARMS_FETCH_FAILED, payload: data };
};

export const fetchFarmsSuccess = (role, token) => {
  return (dispatch) => {
    dispatch(farmsFetchRequest());
    if (role === "investor") {
      fetch(base_url + "farms")
        .then((res) => res.json())
        .then((data) => {
          const action = { type: FARMS_FETCH_SUCCESS, payload: data };
          dispatch(action);
        })
        .catch((err) => {
          console.log(err, ">>>> action");
          dispatch(farmsFetchFailed(err));
        });
    } else if (role === "farmer") {
      fetch(base_url + "farms/my-farms/farm", {
        headers: { access_token: token },
      })
        .then((res) => res.json())
        .then((data) => {
          const action = { type: FARMS_FETCH_SUCCESS, payload: data };
          dispatch(action);
        })
        .catch((err) => {
          console.log(err, ">>>> action");
          dispatch(farmsFetchFailed(err));
        });
    }
  };
};

export const fetchInvestorSuccess = (userId, token, role, user) => {
  return { type: INVESTOR_FETCH_SUCCESS, userId, token, role, user };
};

export const fetchUserSuccess = (id, role) => {
  return (dispatch) => {
    if (role === "investor") {
      fetch(base_url + "users/investors/" + id)
        .then((res) => res.json())
        .then((data) => {
          const action = { type: USER_FETCH_SUCCESS, user: data };
          dispatch(action);
        })
        .catch((err) => console.log(err));
    } else if (role === "farmer") {
      fetch(base_url + "users/farmers/" + id)
        .then((res) => res.json())
        .then((data) => {
          const action = { type: USER_FETCH_SUCCESS, user: data };
          dispatch(action);
        })
        .catch((err) => console.log(err));
    }
  };
};

export const fetchInvestSuccess = (token) => {
  return (dispatch) => {
    dispatch(investFetchRequest());
    fetch(base_url + "invests", { headers: { access_token: token } })
      .then((res) => res.json())
      .then((data) => {
        const action = { type: INVEST_FETCH_SUCCESS, invest: data };
        dispatch(action);
      })
      .catch((err) => console.log(err));
  };
};

export const fetchBalanceSuccess = (token) => {
  return (dispatch) => {
    fetch(base_url + "balances", { headers: { access_token: token } })
      .then((res) => res.json())
      .then((data) => {
        const action = { type: BALANCE_FETCH_SUCCESS, recent: data };
        dispatch(action);
      })
      .catch((err) => console.log(err));
  };
};

export const fetchFarmsVerifiedSuccess = (token) => {
  return (dispatch) => {
    fetch(base_url + "farms/my-farms/farms", {
      headers: { access_token: token },
    })
      .then((res) => res.json())
      .then((data) => {
        const action = { type: FARMS_FETCH_BYVERIFIED_SUCCESS, verified: data };
        dispatch(action);
      })
      .catch((err) => console.log(err));
  };
};
