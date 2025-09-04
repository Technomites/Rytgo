import { Item } from "react-native-paper/lib/typescript/components/List/List"
import { GetAllRequestConst, GetAllPackagesConst, GetAllNotificationConst, getAllFeatureConst, GetUserProfileConst, UpdateUserProfile, setelectFeature } from "../Action/ActionConstants"
const initialState = {
    allRequest: null,
    carRequest: null,
    propertyRequest: null,

    allPackages: null,

    allNotifiction: null,

    userProfile: null,

    loader: false,
    profileMessage: null,

    allFeature: null

}

export default (state = initialState, action) => {

    switch (action.type) {
        case GetAllRequestConst.GET_ALL_REQUEST:
            state = {
                ...state,
                allRequest: action.allRequest,
                carRequest: action.carRequest,
                propertyRequest: action.propertyRequest

            }
            break

        case GetAllPackagesConst.GET_ALL_PACKAGE:
            state = {
                ...state,
                allPackages: action.allPackages

            }
            break

        case GetAllNotificationConst.GET_ALL_NOTIFICATON:
            state = {
                ...state,
                allNotifiction: action.allNotifiction

            }
            break

        case GetUserProfileConst.GET_USER_PROFILE:
            state = {
                ...state,
                userProfile: action.userProfile

            }
            break

        case UpdateUserProfile.UPDATE_PROFILE_REQUEST:
            state = {
                ...state,
                loader: true,
                profileMessage: null
            }
            break

        case UpdateUserProfile.UPDATE_PROFILE_SUCC:
            state = {
                ...state,
                loader: false,
                profileMessage: action.message
            }
            break


        case UpdateUserProfile.UPDATE_PROFILE_FAIL:
            state = {
                ...state,
                loader: false,
                profileMessage: action.message
            }
            break

        case getAllFeatureConst.GET_ALL_FEATURE_REQ:
            state = {
                ...state,
                loader: true
            }
            break

        case getAllFeatureConst.GET_ALL_FEATURE_SUCC:
            state = {
                ...state,
                loader: false,
                allFeature: action.result
            }
            break

        case getAllFeatureConst.GET_ALL_FEATURE_FAIL:
            state = {
                ...state,
                loader: false
            }
            break

        case setelectFeature.SELECT_FEATURE:
            const id = action.id
            state = {
                ...state,
                allFeature: state.allFeature.map((i) => {
                    if (i.id === id) {
                        i.select = !i.select
                    }
                    return i
                })
            }
        case "DELETE_RES_RESSAGE":
            state = {
                ...state,
                profileMessage: null
            }
            break
    }
    return state
}