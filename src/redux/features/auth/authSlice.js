import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Function to get initial state from cookies or sessionStorage
const getInitialState = () => {
    const userCookie = Cookies.get('user');
    const tokenCookie = Cookies.get('token');
    
    let user = null;
    let isAuthenticated = false;
    let token = tokenCookie || sessionStorage.getItem('token');

    if (userCookie) {
        try {
            const decodedUserCookie = decodeURIComponent(userCookie);
            const cleanedUserJson = decodedUserCookie.startsWith('j:')
                ? decodedUserCookie.slice(2)
                : decodedUserCookie;
            const parsedUser = JSON.parse(cleanedUserJson);
            user = parsedUser._doc || parsedUser;
            isAuthenticated = parsedUser.isAuthenticated || false;
        } catch (error) {
            console.error("Error parsing user cookie:", error);
        }
    }

    if (!isAuthenticated) {
        isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
        user = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : null;
    }

    const sessionProfile = sessionStorage.getItem('myProfile');
    const myProfile = sessionProfile && sessionProfile !== "undefined" ? JSON.parse(sessionProfile) : null;

    return {
        isAuthenticated,
        userInfo: user,
        myProfile,
        token,
    };
};

const initialState = getInitialState();

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
            sessionStorage.removeItem('myProfile'); // Fixed duplicate removeItem('userInfo')
            sessionStorage.removeItem('token');
            state.isAuthenticated = false;
            state.userInfo = null;
            state.myProfile = null;
            state.token = null;
        },
        setProfileData: (state, action) => {
            state.myProfile = action.payload;
            sessionStorage.setItem('myProfile', JSON.stringify(action.payload));
        }
    }
});


export const { signup, login, logout, setProfileData } = authSlice.actions;

export default authSlice.reducer;
