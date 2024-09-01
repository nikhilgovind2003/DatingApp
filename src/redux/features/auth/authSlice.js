import { createSlice } from "@reduxjs/toolkit";

// Initial state from sessionStorage or default values
const initialState = {
    isAuthenticated: sessionStorage.getItem('isAuthenticated') === 'true',
    userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : null,
    token: sessionStorage.getItem('token'),
    tokenExpiry: sessionStorage.getItem('tokenExpiry')
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signup: (state, action) => {
            const { isAuthenticated, userInfo, token, tokenExpiry } = action.payload;
            sessionStorage.setItem('isAuthenticated', String(isAuthenticated));
            sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('tokenExpiry', tokenExpiry);
            state.isAuthenticated = isAuthenticated;
            state.userInfo = userInfo;
            state.token = token;
            state.tokenExpiry = tokenExpiry;
        },
        login: (state, action) => {
            const { isAuthenticated, userInfo, token, tokenExpiry } = action.payload;
            sessionStorage.setItem('isAuthenticated', String(isAuthenticated));
            sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('tokenExpiry', tokenExpiry);
            state.isAuthenticated = isAuthenticated;
            state.userInfo = userInfo;
            state.token = token;
            state.tokenExpiry = tokenExpiry;
        },
        logout: (state) => {
            sessionStorage.removeItem('isAuthenticated');
            sessionStorage.removeItem('userInfo');
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('tokenExpiry');
            state.isAuthenticated = false;
            state.userInfo = null;
            state.token = null;
            state.tokenExpiry = null;
        }
    }
});

export const { signup, login, logout } = authSlice.actions;

export default authSlice.reducer;
