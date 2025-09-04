//import { GetAllRequestConst, GetAllPackagesConst, getAllFeatureConst, GetAllNotificationConst, GetUserProfileConst, UpdateUserProfile, UpdateUserImage, setelectFeature } from "../Action/ActionConstants"
import {SET_GUESTPOPUP, RESET_GUESTPOPUP} from '../Types/types';

export const openGuestPopup = data => {
  return async dispatch => {
    dispatch({
      type: SET_GUESTPOPUP,
      IsVisble: true,
    });
  };
};

export const closeGuestPopup = data => {
  return async dispatch => {
    dispatch({
      type: RESET_GUESTPOPUP,
      IsVisble: false,
    });
  };
};
