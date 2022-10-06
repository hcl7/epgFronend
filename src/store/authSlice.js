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
    },
    reducers: {
        logout: (state) => {
            try{
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
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
                state.isAuthenticated = true;
                state.authRedirectPath = '/';
                state.message = action.payload.message
            }
        },
        checkAuthState: (state) =>{
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
        dispatch(setAuth(response.data));
    }
    catch (error){
        throw new Error(error);
    }
}

export const { logout, setAuth, checkAuthState } = authSlice.actions;

export default authSlice.reducer;