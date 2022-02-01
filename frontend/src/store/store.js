import {configureStore} from "@reduxjs/toolkit";
import authReducer from './slices/auth';
import postReducer from './slices/post';


const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer,
    }
});

export default store;