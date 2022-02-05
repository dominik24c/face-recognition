import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {URL} from "../../utils/constants";

export const editPost = createAsyncThunk(
    'editPost/getPost',
    async (arg, {getState, extra}) => {
        return axios.get(`${URL}/user-posts/${arg}`);
    }
);

export const saveTagName = createAsyncThunk(
    'editPost/saveTagName',
    async (arg, {getState, extra}) => {
        return axios.put(`${URL}/face-recognition/tag-name/${arg.id}/`, arg.data);
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
    reducers: {
        resetPost: (state, action) => {
            state.post = null;
        }
    },
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
        },
        [saveTagName.fulfilled]: (state, action) => {
            state.status = 'success';
            // Update post
            const id = action.payload.id
            const face = state.post.recognized_faces.find(f => f.id === id);
            if (face) {
                face.tag_name = action.payload.tag_name;
            }
        },
        [saveTagName.pending]: (state, action) => {
            state.status = 'sending';
        },
        [saveTagName.rejected]: (state, action) => {
            state.status = 'error';
        }
    }
});

export const {resetPost} = editPostSlice.actions;

export default editPostSlice.reducer;