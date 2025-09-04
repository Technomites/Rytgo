//import { GetAllRequestConst, GetAllPackagesConst, getAllFeatureConst, GetAllNotificationConst, GetUserProfileConst, UpdateUserProfile, UpdateUserImage, setelectFeature } from "../Action/ActionConstants"
import {SET_NOTIFICATIONCOUNT} from '../Types/types';

export const NotificationCount = count => {
  return async dispatch => {
    dispatch({
      type: SET_NOTIFICATIONCOUNT,
      NotificationCount: count,
    });
  };
};

// export const getAllRequest = (token) => {
//     return async dispatch => {
//         var myHeaders = new Headers();
//         myHeaders.append("Authorization", `Bearer ${token}`);

//         var requestOptions = {
//             method: 'GET',
//             headers: myHeaders,
//             redirect: 'follow'
//         };

//         await fetch(`${BaseURL}/api/v1/vendor/customerrequest?take=10`, requestOptions)
//             .then(response => response.json())
//             .then(result => {

//                 const carRequest = result?.carRequests

//                 const properTyRequest = result?.propertyRequests
//                 let allMergeRequest = []
//                 for (const key in carRequest) {
//                     allMergeRequest.push(carRequest[key])
//                 }
//                 for (const key in properTyRequest) {
//                     allMergeRequest.push(properTyRequest[key])
//                 }

//                 dispatch({
//                     type: GetAllRequestConst.GET_ALL_REQUEST,
//                     allRequest: allMergeRequest,
//                     carRequest: carRequest,
//                     propertyRequest: properTyRequest
//                 })
//             })
//             .catch(error => console.log('abcd', error));
//     }
// }

// export const getAllPackages = (token) => {

//     return async dispatch => {
//         var myHeaders = new Headers();
//         myHeaders.append("Authorization", `Bearer ${token}`);

//         var requestOptions = {
//             method: 'GET',
//             headers: myHeaders,
//             redirect: 'follow'
//         };

//         await fetch(`${BaseURL}/api/v1/vendor/packages`, requestOptions)
//             .then(response => response.json())
//             .then(result => {

//                 if (result.packages) {
//                     dispatch({
//                         type: GetAllPackagesConst.GET_ALL_PACKAGE,
//                         allPackages: result.packages
//                     })
//                 }
//             })
//             .catch(error => console.log('error', error));
//     }
// }

// export const getAllNotification = (token) => {
//     return async dispatch => {
//         var myHeaders = new Headers();
//         myHeaders.append("Authorization", `Bearer ${token}`);

//         var requestOptions = {
//             method: 'GET',
//             headers: myHeaders,
//             redirect: 'follow'
//         };

//         fetch(`${BaseURL}//api/v1/en/notifications`, requestOptions)
//             .then(response => response.json())
//             .then(result => {
//                 if (result.notifications) {
//                     dispatch({
//                         type: GetAllNotificationConst.GET_ALL_NOTIFICATON,
//                         allNotifiction: result.notifications
//                     })
//                 }
//             })
//             .catch(error => console.log('error', error));
//     }
// }

// export const getUserProfileInfo = (token) => {
//     return async dispatch => {
//         var myHeaders = new Headers();
//         myHeaders.append("Authorization", `Bearer ${token}`);

//         var requestOptions = {
//             method: 'GET',
//             headers: myHeaders,
//             redirect: 'follow'
//         };

//         fetch(`${BaseURL}//api/v1/vendor/account/profile`, requestOptions)
//             .then(response => response.json())
//             .then(result => {

//                 if (result.profile) {
//                     dispatch({
//                         type: GetUserProfileConst.GET_USER_PROFILE,
//                         userProfile: result.profile
//                     })
//                 }

//             })
//             .catch(error => console.log('error', error));
//     }
// }

// export const updateUserProfile = (token, name, email, mobileNo) => {
//     return async dispatch => {

//         dispatch({
//             type: UpdateUserProfile.UPDATE_PROFILE_REQUEST
//         })

//         var myHeaders = new Headers();
//         myHeaders.append("Authorization", `Bearer ${token}`);
//         myHeaders.append("Content-Type", "application/json");

//         var raw = JSON.stringify({
//             "Name": name,
//             "EmailAddress": email,
//             "MobileNo": mobileNo
//         });

//         var requestOptions = {
//             method: 'PUT',
//             headers: myHeaders,
//             body: raw,
//             redirect: 'follow'
//         };

//         await fetch(`${BaseURL}//api/v1/vendor/account/profile`, requestOptions)
//             .then(response => response.json())
//             .then(result => {

//                 if (result.profile) {

//                     dispatch({
//                         type: UpdateUserProfile.UPDATE_PROFILE_SUCC,
//                         message: result.message
//                     })

//                 } else {

//                     dispatch({
//                         type: UpdateUserProfile.UPDATE_PROFILE_FAIL,
//                         message: result.message
//                     })
//                 }

//             })
//             .catch(error => console.log('error', error));
//     }
// }

// export const deleteResMessage = () => {
//     return async dispatch => {
//         dispatch({
//             type: "DELETE_RES_RESSAGE"
//         })
//     }
// }

// export const userProfileImage = (token, pickImage) => {
//     return async dispatch => {
//         try {
//             // let type = data.uri.split('.');
//             let response = await RNFetchBlob.fetch(
//                 'PUT',
//                 `${BaseURL}/api/v1/vendor/account/profile/photo`,

//                 {
//                     'Content-Type': 'multipart/form-data',
//                     Authorization: 'Bearer ' + token,
//                 },
//                 [
//                     {
//                         name: 'profile',
//                         filename: 'abc.jpg',
//                         type: pickImage.mime,

//                         data: RNFetchBlob.wrap(pickImage.path),
//                     },
//                 ],
//             );

//             let res = await response.json();

//             if (res.status === "success") {
//                 dispatch({
//                     type: UpdateUserImage.UPDATE_IMAGE_SUCC
//                 })
//             } else {
//                 dispatch({
//                     type: UpdateUserImage.UPDATE_IMAGE_FAIL
//                 })
//             }

//         } catch (error) {
//             console.log("error")
//         }
//     };
// }

// export const addFeatureAction = (token, type) => {
//     console.log(type, "HERE")
//     return async dispatch => {

//         dispatch({
//             type: getAllFeatureConst.GET_ALL_FEATURE_REQ
//         })
//         var myHeaders = new Headers();
//         myHeaders.append("Authorization", `Bearer ${token}`);

//         var requestOptions = {
//             method: 'GET',
//             headers: myHeaders,
//             redirect: 'follow'
//         };

//         await fetch(`${BaseURL}//api/v1/${type}/filter/en/features`, requestOptions)
//             .then(response => response.json())
//             .then(result => {

//                 if (result.status) {
//                     const data = result.data
//                     for (const key in data) {
//                         data[key]["select"] = false
//                         data[key]["FeatureID"] = data[key].id
//                     }

//                     dispatch({
//                         type: getAllFeatureConst.GET_ALL_FEATURE_SUCC,
//                         result: data
//                     })

//                 } else {
//                     dispatch({
//                         type: getAllFeatureConst.GET_ALL_FEATURE_FAIL,

//                     })
//                 }

//             })
//             .catch(error => console.log('error', error));
//     }
// }
