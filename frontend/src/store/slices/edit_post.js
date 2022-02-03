import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {URL} from "../../utils/constants";
import {authHeader} from "../../utils/auth";

export const editPost = createAsyncThunk(
    'editPost/getPost',
    async (arg, {getState, extra}) => {
        const token = getState().auth.token;
        return axios.get(`${URL}/user-posts/${arg}`, {
            headers: {
                ...authHeader(token)
            },
            crossDomain: true,
        }).then(response => response.data);
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