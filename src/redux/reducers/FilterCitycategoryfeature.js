import {
  CITYConst,
  PROPERTYCATEGORYConst,
  PROPERTYFEATUREConst,
  CARCATEGORYConst,
  CARPROPERTYConst,
  CLEARALLCITIESPROPERTIESCATEGORIES,
} from '../Types/types';
const initialState = {
  loader: true,
  cities: [],
  propertyCategory: [],
  propertyFeatures: [],
  carCategory: [],
  carFeatures: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CITYConst.FILTERCITY_SUCC:
      console.log('success');
      return {
        ...state,
        cities: action.data.cities,
      };
    case PROPERTYCATEGORYConst.FILTERPROPERTYC_SUCC:
      return {
        ...state,
        propertyCategory: action.data,
      };
    case PROPERTYFEATUREConst.FILTERPROPERTYF_SUCC:
      return {
        ...state,
        propertyFeatures: action.data,
      };
    case CARCATEGORYConst.FILTERCARC_SUCC:
      return {
        ...state,
        carCategory: action.data,
        loader: action.loder,
      };
    case CARPROPERTYConst.FILTERCARF_SUCC:
      return {
        ...state,
        carFeatures: action.data,
        loader: action.loder,
      };
    case CLEARALLCITIESPROPERTIESCATEGORIES.RESET_ALL:
      return {
        ...state,
        loader: true,
        cities: [],
        propertyCategory: [],
        propertyFeatures: [],
        carCategory: [],
        carFeatures: [],
      };
  }
  return state;
};
