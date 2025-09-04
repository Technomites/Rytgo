//import { GetAllRequestConst, GetAllPackagesConst, getAllFeatureConst, GetAllNotificationConst, GetUserProfileConst, UpdateUserProfile, UpdateUserImage, setelectFeature } from "../Action/ActionConstants"
import {
  SET_PROPERTYFILTER,
  SET_CARFILTER,
  SETPAGINATION_Count,
} from '../Types/types';

export const propertyFilter = data => {
  return async dispatch => {
    dispatch({
      type: SET_PROPERTYFILTER,
      filterData: data,
    });
  };
};

export const carFilter = data => {
  return async dispatch => {
    dispatch({
      type: SET_CARFILTER,
      filterData: data,
    });
  };
};

export const setPaginationCount = value => {
  return async dispatch => {
    dispatch({
      type: SETPAGINATION_Count,
      value: value,
    });
  };
};
