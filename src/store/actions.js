import axios from '../Config/axios-baseUrl';

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_START = 'AUTH_START';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const SET_AUTH_REDIRECT_PATH = 'SET_AUTH_REDIRECT_PATH';

export const authStart = () => {
    return { type: AUTH_START };
};

export const authSuccess = (token, userId) => {
    return { type: AUTH_SUCCESS, idToken: token, userId: userId };
};

export const authFail = (error) => {
    return { type: AUTH_FAIL, error: error};
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    axios.post('/auth/logout')
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    return {
        type: AUTH_LOGOUT
    };
};

export const checkAuthTimeOut = (expireTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expireTime * 1000);
    };
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = JSON.stringify({
            email: email,
            passwd: password,
        });
        var config = {
            method: 'post',
            url: '/auth/login',
            headers: { 
                'Content-Type': 'application/json'
        },
            data : authData
        };
        axios(config)
            .then(response =>{
                localStorage.setItem('token', response.data.jwt);
                localStorage.setItem('userId', response.data.user.id);
                dispatch(authSuccess(response.data.jwt, response.data.user.id));
            })
            .catch(error =>{
                console.log('action auth error: ',error);
                dispatch(authFail(error.response.data.error));
            })
    }
};

export const onAuthRedirectPath = (path) => {
    return {
        type: SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(token, userId));
        }
    }
};