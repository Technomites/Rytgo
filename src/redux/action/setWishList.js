import {SET_WISHLIST, RESET_WISHLIST} from '../Types/types';

export const setWishlist = (token, pagniationData, language) => {
  //console.log('dispatch' + pagniationData.PriceMax);
  //console.log(language + 'lan');
  //alert(language);
  return async dispatch => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      Skip: pagniationData.Skip,
      PageSize: pagniationData.PageSize,
      PriceMin: 0,
      PriceMax: pagniationData.PriceMax,
      FeaturedOnly: true,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      'https://portal.nowbuysell.com/api/v1/car/filter/' + language + '/get',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        dispatch({
          type: SET_WISHLIST,
          data: result.data,
        });
      })
      .catch(error => console.log('error', error));
  };
};

export const claearWishLIST = data => {
  return async dispatch => {
    dispatch({
      type: RESET_WISHLIST,
      data: [],
    });
  };
};
