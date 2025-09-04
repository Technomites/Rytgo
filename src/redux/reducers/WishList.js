import {SET_WISHLIST, RESET_WISHLIST} from '../Types/types';

const initialState = {
  wishlist: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_WISHLIST:
      return {
        ...state,
        wishlist: [...state.wishlist, ...action.data],
      };
    case RESET_WISHLIST:
      return {
        ...state,
        wishlist: [],
      };
  }
  return state;
};
