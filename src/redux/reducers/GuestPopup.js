import {SET_GUESTPOPUP, RESET_GUESTPOPUP} from '../Types/types';

const initialState = {
  popup: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GUESTPOPUP:
      return {
        ...state,
        popup: true,
      };
    case RESET_GUESTPOPUP:
      return {
        ...state,
        popup: false,
      };
  }
  return state;
};
