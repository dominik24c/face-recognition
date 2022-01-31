import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const signUpUser = createAsyncThunk(
    'auth/signUpUser',
    async (arg, {getState, extra}) => {
        const data = {
            username: arg.username,
            email: arg.email,
            password1: arg.password,
            password2: arg.confirm_password
        }
        console.log(data);

        return axios.post(`${URL}/auth/registration/`, data, {
            crossDomain: true
        }).then(response => response.data);
    });

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (arg, {getState, extra}) => {
        return axios.post(`${URL}/auth/login/`, arg, {
            crossDomain: true
        }).then(response => response.data);
    }
)
const initialState = {
    token: null,
    signUpStatus: null,
    loginStatus: null,
    signUpErrorMessage: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        isAuthenticated:(state,action)=>{
            return !!state.token;
        }
    },
    extraReducers: {
        [signUpUser.pending]: (state, action) => {
            state.signUpStatus = 'sending';
        },
        [signUpUser.fulfilled]: (state, action) => {
            state.signUpStatus = 'success';
            state.token = action.payload.key;
        },
        [signUpUser.rejected]: (state, action) => {
            state.signUpStatus = 'error';
            const payload = action.payload
            if(payload && payload.username){
                state.signUpErrorMessage = payload.username.join(', ');
            }
        },

        [loginUser.pending]: (state, action) => {
            state.loginStatus = 'sending';
        },
        [loginUser.fulfilled]: (state, action) => {
            state.loginStatus = 'success';
            state.token = action.payload.key;
        },
        [loginUser.rejected]: (state, action) => {
            state.loginStatus = 'error';
        },

    }
})

export const {isAuthenticated} = authSlice.actions;

export default authSlice.reducer;