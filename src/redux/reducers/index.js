//import loading from './loading';
//import error from './error';
//import auth from './auth';
//import config from './config';
//import popup from './popup';
//import cart from './cart';

import {combineReducers} from 'redux';
import WishList from './WishList';
import Filter from './FilterReducer';
import Notifcations from './NotificationReducer';
import GuestPopup from './GuestPopup';
import VendorId from './VendorIdReducer';
import FilterCitycategoryfeature from './FilterCitycategoryfeature';

export const rootReducer = combineReducers({
  withList: WishList,
  propertyFilter: Filter,
  Notifications: Notifcations,
  GuestPopup: GuestPopup,
  VendorId: VendorId,
  FilterCitycategoryfeature: FilterCitycategoryfeature,
});
// //export {loading, error, auth, config, popup, cart, wishlist};
// export {wishlist};
export default rootReducer;
