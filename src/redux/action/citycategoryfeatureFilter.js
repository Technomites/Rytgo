import {
  CITYConst,
  PROPERTYCATEGORYConst,
  PROPERTYFEATUREConst,
  CARCATEGORYConst,
  CARPROPERTYConst,
  CLEARALLCITIESPROPERTIESCATEGORIES,
} from '../Types/types';

export const getCities = (language, accessToken) => {
  return async dispatch => {
    //var myHeaders = new Headers();
    //myHeaders.append('Authorization', `Bearer ${token}`);
    //myHeaders.append('Content-Type', 'application/json');

    let requestConfig = {
      method: 'GET',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      //body: body,
    };

    fetch(
      `https://portal.nowbuysell.com/api/v1/${language}/cities`,
      requestConfig,
    )
      .then(response => response.json())
      .then(res => {
        // if (res.status === 'success') {
        dispatch({
          type: CITYConst.FILTERCITY_SUCC,
          data: res,
        });
        // }
        // else{
        //   dispatch({
        //     type: CITYConst.FILTERCITY_FAIL
        //     //data: result.data,
        //   });
      })

      .catch(error => console.log('error', error));
  };
};

export const getcategoryProperty = (language, accessToken) => {
  return async dispatch => {
    //var myHeaders = new Headers();
    //myHeaders.append('Authorization', `Bearer ${token}`);
    //myHeaders.append('Content-Type', 'application/json');

    let requestConfig = {
      method: 'GET',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      //body: body,
    };

    fetch(
      `https://portal.nowbuysell.com/api/v1/property/filter/${language}/categories`,
      requestConfig,
    )
      .then(response => response.json())
      .then(res => {
        // if (res.status === 'success') {
        const notifications = res.data;
        for (const key in notifications) {
          notifications[key]['isSelected'] = 'false';
        }
        // console.log(JSON.stringify(notifications) + 'ddddddd');

        dispatch({
          type: PROPERTYCATEGORYConst.FILTERPROPERTYC_SUCC,
          data: notifications,
        });
        // }
        // else{
        //   dispatch({
        //     type: PROPERTYCATEGORYConst.FILTERPROPERTYC_FAIL
        //     //data: result.data,
        //   });

        // }
      })
      .catch(error => console.log('error', error));
  };
};

export const getfeatureProperty = (language, accessToken) => {
  return async dispatch => {
    //var myHeaders = new Headers();
    //myHeaders.append('Authorization', `Bearer ${token}`);
    //myHeaders.append('Content-Type', 'application/json');

    let requestConfig = {
      method: 'GET',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      //body: body,
    };
    // v1/property/filter/${languagee}/features`
    fetch(
      `https://portal.nowbuysell.com/api/v1/property/filter/${language}/features`,
      requestConfig,
    )
      .then(response => response.json())
      .then(res => {
        // if (res.status === 'success') {
        const notifications = res.data;
        for (const key in notifications) {
          notifications[key]['isSelected'] = 'false';
        }
        dispatch({
          type: PROPERTYFEATUREConst.FILTERPROPERTYF_SUCC,
          data: notifications,
        });
        // }
        // else{
        //   dispatch({
        //     type: PROPERTYFEATUREConst.FILTERPROPERTYF_FAIL,
        //     //data: result.data,
        //   });

        // }
      })
      .catch(error => console.log('error', error));
  };
};

export const getcategoryCar = (language, accessToken) => {
  return async dispatch => {
    //var myHeaders = new Headers();
    //myHeaders.append('Authorization', `Bearer ${token}`);
    //myHeaders.append('Content-Type', 'application/json');

    let requestConfig = {
      method: 'GET',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      //body: body,
    };

    fetch(
      `https://portal.nowbuysell.com/api/v1/car/filter/${language}/categories`,
      requestConfig,
    )
      .then(response => response.json())
      .then(res => {
        // if (res.status === 'success') {
        const notifications = res.data;
        for (const key in notifications) {
          notifications[key]['isSelected'] = 'false';
        }
        dispatch({
          type: CARCATEGORYConst.FILTERCARC_SUCC,
          data: notifications,
          loder: false,
        });
        // }
        // else{
        //   dispatch({
        //     type: PROPERTYCATEGORYConst.FILTERPROPERTYC_FAIL
        //     //data: result.data,
        //   });

        // }
      })
      .catch(error => console.log('error', error));
  };
};

export const getfeatureCar = (language, accessToken) => {
  return async dispatch => {
    //var myHeaders = new Headers();
    //myHeaders.append('Authorization', `Bearer ${token}`);
    //myHeaders.append('Content-Type', 'application/json');

    let requestConfig = {
      method: 'GET',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      //body: body,
    };
    // v1/property/filter/${languagee}/features`
    fetch(
      `https://portal.nowbuysell.com/api/v1/car/filter/${language}/features`,
      requestConfig,
    )
      .then(response => response.json())
      .then(res => {
        // if (res.status === 'success') {
        const notifications = res.data;
        for (const key in notifications) {
          notifications[key]['isSelected'] = 'false';
        }
        dispatch({
          type: CARPROPERTYConst.FILTERCARF_SUCC,
          data: notifications,
          loder: false,
        });
        // }
        // else{
        //   dispatch({
        //     type: PROPERTYFEATUREConst.FILTERPROPERTYF_FAIL,
        //     //data: result.data,
        //   });

        // }
      })
      .catch(error => console.log('error', error));
  };
};

export const claearallcitiescategoriesandproperties = data => {
  return async dispatch => {
    dispatch({
      type: CLEARALLCITIESPROPERTIESCATEGORIES.RESET_ALL,
      data: [],
    });
  };
};
