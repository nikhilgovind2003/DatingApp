import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        isAuthenticated: localStorage.getItem('isAuthenticated') ? localStorage.getItem('isAuthenticated') : false,
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
        token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
        tokenExpiry: localStorage.getItem('tokenExpiry') ? localStorage.getItem('tokenExpiry') : null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signup: (state, action) => {
            const { isAuthenticated, userInfo, token, tokenExpiry } = action.payload;
            localStorage.setItem('isAuthenticated', isAuthenticated);
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            localStorage.setItem('token', token);
            localStorage.setItem('tokenExpiry', tokenExpiry);
            state.isAuthenticated = true;
            state.userInfo = userInfo;
            state.token = token;
            state.tokenExpiry = tokenExpiry;
        },
        login: (state, action) => { 
            const { isAuthenticated, userInfo, token, tokenExpiry } = action.payload;
            localStorage.setItem('isAuthenticated', isAuthenticated);
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            localStorage.setItem('token', token);
            localStorage.setItem('tokenExpiry', tokenExpiry);
            state.isAuthenticated = true;
            state.userInfo = userInfo;
            state.token = token;
            state.tokenExpiry = tokenExpiry;
        },
        logout: (state) => {
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('userInfo');
            localStorage.removeItem('token');
            localStorage.removeItem('tokenExpiry');
            state.isAuthenticated = false;
            state.userInfo = null;
            state.token = null;
            state.tokenExpiry = null;
        }
    }
});

export const { signup, login, logout } = authSlice.actions;

export default authSlice.reducer;