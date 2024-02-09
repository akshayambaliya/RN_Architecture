import { failHelper, requestHelper, successHelper } from '../utils/reducer';

const {
    GET_USER_DATA_REQUEST,
    GET_USER_DATA_SUCCESS,
    GET_USER_DATA_FAIL,
} = require('../constants/index').default;

export const initialState = {
    userData: {}
};

export default function featureReducer(state = initialState, action = {}) {
    switch (action.type) {
        case GET_USER_DATA_REQUEST:
            return requestHelper(state, 'userData')
        case GET_USER_DATA_SUCCESS:
            return successHelper(state, action.payload, 'userData')
        case GET_USER_DATA_FAIL:
            return failHelper(state, state.payload, 'userData')
        default:
            return state;
    }
}
