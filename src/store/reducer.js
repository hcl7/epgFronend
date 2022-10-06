import * as actionTypes from './actions';
import { updateObject } from '../hoc/utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

const setAuthStart = (state, action ) => {
    return updateObject(state, { error: null, loading: true});
}

const setAuthSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken, 
        userId: action.userId, 
        error: null, 
        loading: false
    });
}

const setAuthFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: true});
}

const setAuthLogout = (state, action) => {
    return updateObject(state, {token: null, userId: null});
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {authRedirectPath: action.path});
};

export const reducer = (state = initialState, action ) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return setAuthStart(state, action);
        case actionTypes.AUTH_SUCCESS: return setAuthSuccess(state, action);
        case actionTypes.AUTH_FAIL: return setAuthFail(state, action);
        case actionTypes.AUTH_LOGOUT: return setAuthLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        default: return state;
    }
};

export default reducer;