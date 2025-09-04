import {SET_NOTIFICATIONCOUNT} from '../Types/types';
const initialState = {
  count: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATIONCOUNT:
      return {
        ...state,
        count: action.NotificationCount,
      };
    // case SET_CARFILTER:
    //   return {
    //     ...state,
    //     carFilter: action.filterData,
    //   };
  }
  return state;
};
