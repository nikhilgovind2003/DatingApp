import { createSlice } from "@reduxjs/toolkit";

// Initial state from sessionStorage or default values
const initialState = {
    isAuthenticated: sessionStorage.getItem('isAuthenticated') === 'true',
    userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : null,
    myProfile: null,
    token: sessionStorage.getItem('token'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signup: (state, action) => {
            const { isAuthenticated, userInfo, myProfile, token } = action.payload;
            sessionStorage.setItem('isAuthenticated', String(isAuthenticated));
            sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
            sessionStorage.setItem('myProfile', JSON.stringify(myProfile));
            sessionStorage.setItem('token', token);
            state.isAuthenticated = isAuthenticated;
            state.userInfo = userInfo;
            state.myProfile = myProfile;
            state.token = token;
        },
        login: (state, action) => {
            console.log(action.payload)
            const { isAuthenticated, userInfo, myProfile, token } = action.payload;
            sessionStorage.setItem('isAuthenticated', String(isAuthenticated));
            sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
            sessionStorage.setItem('myProfile', JSON.stringify(myProfile));
            sessionStorage.setItem('token', token);
            state.isAuthenticated = isAuthenticated;
            state.userInfo = userInfo;
            state.myProfile = myProfile;
            state.token = token;
        },
        logout: (state) => {
            sessionStorage.removeItem('isAuthenticated');
            sessionStorage.removeItem('userInfo');
            sessionStorage.removeItem('userInfo');
            sessionStorage.removeItem('token');
            state.isAuthenticated = false;
            state.userInfo = null;
            state.myProfile = null;
            state.token = null;
        }
    }
});

export const { signup, login, logout } = authSlice.actions;

export default authSlice.reducer;
