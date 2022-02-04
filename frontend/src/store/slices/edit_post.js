import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {URL} from "../../utils/constants";

export const editPost = createAsyncThunk(
    'editPost/getPost',
    async (arg, {getState, extra}) => {
        return axios.get(`${URL}/user-posts/${arg}`)
            .then(response => response.data);
    }
);

export const saveTagName = createAsyncThunk(
    'editPost/getPost',
    async (arg, {getState, extra}) => {
        return axios.get(`${URL}/user-posts/${arg}/tag-name`)
            .then(response => response.data);
    }
);

// const saveRecognizedFaces = createAsyncThunk();
const initialState = {
    post: null,
    status: null
}

const editPostSlice = createSlice({
    name: 'editPost',
    initialState,
    reducers: {},
    extraReducers: {
        [editPost.fulfilled]: (state, action) => {
            state.status = 'success';
            state.post = action.payload;
        },
        [editPost.pending]: (state, action) => {
            state.status = 'sending';
        },
        [editPost.rejected]: (state, action) => {
            state.status = 'error';
        }
    }
});

export default editPostSlice.reducer;