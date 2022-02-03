import {configureStore} from "@reduxjs/toolkit";
import authReducer from './slices/auth';
import postReducer from './slices/post';
import editPostReducer from './slices/edit_post';

const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer,
        editPost: editPostReducer
    }
});

export default store;