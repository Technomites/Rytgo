import {
  SET_PROPERTYFILTER,
  SET_CARFILTER,
  SETPAGINATION_Count,
} from '../Types/types';
const initialState = {
  propertyFilter: null,
  carFilter: null,
  paginationValue: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PROPERTYFILTER:
      return {
        ...state,
        propertyFilter: action.filterData,
      };
    case SET_CARFILTER:
      return {
        ...state,
        carFilter: action.filterData,
      };
    case SETPAGINATION_Count:
      return {
        ...state,
        paginationValue: action.value,
      };
  }
  return state;
};
