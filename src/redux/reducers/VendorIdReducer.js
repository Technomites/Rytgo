import {SET_VENDORID} from '../Types/types';
const initialState = {
  vendorid: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_VENDORID:
      return {
        ...state,
        vendorid: action.vendorId,
      };
    // case SET_CARFILTER:
    //   return {
    //     ...state,
    //     carFilter: action.filterData,
    //   };
  }
  return state;
};
