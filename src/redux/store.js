import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from './features/auth/authSlice';

const store = configureStore({
    reducer: {
        userAuth: AuthReducer
    },
});

export default store;