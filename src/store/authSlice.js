import axios from '../Config/axios-baseUrl';
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: '',
        userId: 0,
        error: null,
        loading: false,
        isAuthenticated: false,
        authRedirectPath: '/login',
        message: '',
        apiKey: '',
    },
    reducers: {
        logout: (state) => {
            try{
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                localStorage.removeItem('apikey');
                axios.post('/auth/logout')
                .then(function (response) {
                    console.log(response.data.message);
                })
                .catch(function (error) {
                    throw new Error(error);
                });
                state.token = null;
                state.userId = null;
                state.isAuthenticated = false;
                state.authRedirectPath = '/login';
            }
            catch (err){
                throw new Error(err);
            }
            
        },
        setAuth: (state, action) => {
            console.log('action: ', action.payload);
            if(action.payload.jwt !== null){
                state.token = localStorage.getItem('token');
                state.userId = localStorage.getItem('userId');
                state.apiKey = localStorage.getItem('apikey');
                state.isAuthenticated = true;
                state.authRedirectPath = '/';
                state.message = action.payload.message;
            }
        },
        setSignup: (state, action) => {
            state.message = action.payload.message;
        },
        checkAuthState: (state) => {
            const token = localStorage.getItem('token');
            if(!token){
                state.isAuthenticated = false;
                state.authRedirectPath = '/login';
            }
            else {
                state.isAuthenticated = true;
                state.authRedirectPath = '/';
                state.token = localStorage.getItem('token');
                state.userId = localStorage.getItem('userId');
                state.apiKey = localStorage.getItem('apikey');
            }
        }
    }
});

export const login = (data) => async (dispatch) =>{
    const authData = JSON.stringify({
        email: data.email,
        passwd: data.passwd,
    });
    var config = {
        method: 'post',
        url: '/auth/login',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : authData
    };
    try{
        const response = await axios(config);
        localStorage.setItem('token', response.data.jwt);
        localStorage.setItem('userId', response.data.user.id);
        localStorage.setItem('apikey', response.data.user.apikey);
        dispatch(setAuth(response.data));
    }
    catch (error){
        throw new Error(error);
    }
}

export const signup = (data) => async (dispatch) =>{
    const signupData = JSON.stringify({
        usr: data.usr,
        fname: data.fname,
        lname: data.lname,
        company: data.company,
        email: data.email,
        passwd: data.passwd,
    });
    var config = {
        method: 'post',
        url: '/auth/register',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : signupData
    };
    try{
        const response = await axios(config);
        dispatch(setSignup(response.data));
        console.log(response.data);
    }
    catch (error){
        throw new Error(error);
    }
}

export const { logout, setAuth, setSignup, checkAuthState } = authSlice.actions;

export default authSlice.reducer;