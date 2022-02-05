import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {URL} from "../../utils/constants";

export const getPosts = createAsyncThunk(
    'post/getPost',
    async (arg, {getState, extra}) => {
        return axios.get(`${URL}/posts/`);
    }
);

export const getUserPosts = createAsyncThunk(
    'post/getUserPosts',
    async (arg, {getState, extra}) => {
        return axios.get(`${URL}/user-posts/`);
    }
);

export const createPost = createAsyncThunk(
    'post/createPost',
    async (arg, {getState, extra}) => {
        const formData = new FormData();
        formData.append('title', arg.title);
        formData.append('description', arg.description);
        formData.append('post_picture', arg.post_picture);

        return axios.post(`${URL}/posts/`, formData);
    }
);

export const detailPost = createAsyncThunk(
    'post/detailPost',
    async (arg, {getState, extra}) => {
        return axios.get(`${URL}/posts/${arg}`);
    }
);

const initialState = {
    posts: [],
    status: null,
    post: null
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        resetPost: (state, action) => {
            state.post = null;
        }
    },
    extraReducers: {
        [getPosts.pending]: (state, action) => {
            state.status = 'sending';
        },
        [getPosts.fulfilled]: (state, action) => {
            state.status = 'success';
            console.log(action.payload);
            state.posts = action.payload;
        },
        [getPosts.rejected]: (state, action) => {
            state.status = 'error';
            console.log(action);
        },
        [getUserPosts.pending]: (state, action) => {
            state.status = 'sending';
        },
        [getUserPosts.fulfilled]: (state, action) => {
            state.status = 'success';
            console.log(action.payload);
            state.posts = action.payload;
        },
        [getUserPosts.rejected]: (state, action) => {
            state.status = 'error';
            console.log(action);
        },
        [detailPost.pending]: (state, action) => {
            state.status = 'sending';
        },
        [detailPost.fulfilled]: (state, action) => {
            state.status = 'success';
            console.log(action.payload);
            state.post = action.payload;
        },
        [detailPost.rejected]: (state, action) => {
            state.status = 'error';
        }

    }
})

export const {resetPost} = postSlice.actions;

export default postSlice.reducer;