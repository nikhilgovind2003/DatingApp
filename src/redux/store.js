import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from './features/auth/authSlice';
import { storyApi } from "./features/stories/storyApi";

const store = configureStore({
    reducer: {
        userAuth: AuthReducer,
        [storyApi.reducerPath]: storyApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(storyApi.middleware),
});

export default store;