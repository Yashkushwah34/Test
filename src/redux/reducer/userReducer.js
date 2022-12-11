import * as actionTypes from "../action/userAction";

const initialState = {
  data: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_DATA: {
      return {
        data: action.payload,
      };
    }
    case actionTypes.UPDATE_USER_DATA: {
      const newData = [...state.data];
      const index = newData.findIndex((item) => action.payload.id === item.id);
      newData[index].activeContract = action.payload.activeContract;
      newData[index].contractValue = action.payload.contractValue;
      newData[index].source = action.payload.source;
      newData[index]["totalSpend(12Months)"] =
        action.payload["totalSpend(12Months)"];
      newData[index]["totalSpend(YTD)"] = action.payload["totalSpend(YTD)"];

      return {
        data: newData,
      };
    }
    case actionTypes.UPDATE_USER_APPLICATION: {
      const newData = [...state.data];
      const userIndex = newData.findIndex(
        (item) => item.id === action.payload.userId
      );

      const applicationIndex = newData[userIndex].application.findIndex(
        (item) => item.id === action.payload.id
      );

      newData[userIndex].application[applicationIndex].name =
        action.payload.name;
      newData[userIndex].application[applicationIndex].category =
        action.payload.category;
      newData[userIndex].application[applicationIndex].licenseBought =
        action.payload.licenseBought;
      newData[userIndex].application[applicationIndex].appCovered =
        action.payload.appCovered;
      newData[userIndex].application[applicationIndex].billingFrequency =
        action.payload.billingFrequency;
      newData[userIndex].application[applicationIndex].paymentTerms =
        action.payload.paymentTerms;

      return { data: newData };
    }
    default:
      return state;
  }
};

export default reducer;
