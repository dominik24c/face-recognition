import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {authHeader} from "../../utils/auth";
import {URL} from "../../utils/constants";

export const getPosts = createAsyncThunk(
    'post/getPost',
    async (arg, {getState, extra}) => {
        console.log(getState().auth)
        const token = getState().auth.token;
        console.log(token);
        return axios.get(`${URL}/posts/`, {
            crossDomain: true, headers: {
                ...authHeader(token)
            }
        }).then(response => response.data);
    }
)

export const createPost = createAsyncThunk(
    'post/createPost',
    async (arg, {getState, extra}) => {
        const token = getState().auth.token;
        const formData = new FormData();
        formData.append('title', arg.title);
        formData.append('description', arg.description);
        formData.append('post_picture', arg.post_picture);

        return axios.post(`${URL}/posts/`, formData, {
            crossDomain: true, headers: {
                ...authHeader(token)
            }
        }).then(response => response.data);
    }
)

const initialState = {
    posts: [],
    status: null,
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
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
        }

    }
})

export default postSlice.reducer;