import { UserDetailsApi } from "./UserDetailsApi";

const {
    GET_USER_DATA_REQUEST,
    GET_USER_DATA_SUCCESS,
    GET_USER_DATA_FAIL
} = require('../constants/index').default

export function getRatesInformation(
    payload,
    success,
    fail
) {
    return (dispatch) =>
        dispatch({
            showLoader: true,
            types: [
                GET_USER_DATA_REQUEST,
                GET_USER_DATA_SUCCESS,
                GET_USER_DATA_FAIL,
            ],
            networkPromise: (apiConfig) =>
                new UserDetailsApi(apiConfig).postUserData(payload),
            handleSuccess: (success) => {
                console.log("Success", success)
            },
            handleFail: (error) => {
                console.log("error", error)
            },
        });
}