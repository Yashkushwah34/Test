import data from "../data.json";

export const GET_USER_DATA = "GET_USER_DATA";
export const UPDATE_USER_DATA = "UPDATE_USER_DATA";
export const UPDATE_USER_APPLICATION = "UPDATE_USER_APPLICATION";

export const gettingUserData = () => {
  return {
    type: GET_USER_DATA,
    payload: data,
  };
};

export const updateUserData = (data) => {
  return {
    type: UPDATE_USER_DATA,
    payload: data,
  };
};

export const updateUserApplication = (data) => {
  return {
    type: UPDATE_USER_APPLICATION,
    payload: data,
  };
};
