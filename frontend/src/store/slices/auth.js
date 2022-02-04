import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {getToken, setToken} from "../../utils/auth";
import {URL} from "../../utils/constants";

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

        return axios.post(`${URL}/auth/registration/`, data)
            .then(response => response.data);
    });

export const loginUser = createAsyncThunk(
    'slices/loginUser',
    async (arg, {getState, extra}) => {
        return axios.post(`${URL}/auth/login/`, arg).then(response => response.data);
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
        setTokenFromLocalStorage: (state, action) => {
            state.token = getToken();
        }
    },
    extraReducers: {
        [signUpUser.pending]: (state, action) => {
            state.signUpStatus = 'sending';
        },
        [signUpUser.fulfilled]: (state, action) => {
            state.signUpStatus = 'success';
            state.token = action.payload.key;
            setToken(state.token);
        },
        [signUpUser.rejected]: (state, action) => {
            state.signUpStatus = 'error';
            const payload = action.payload
            if (payload && payload.username) {
                state.signUpErrorMessage = payload.username.join(', ');
            }
        },

        [loginUser.pending]: (state, action) => {
            state.loginStatus = 'sending';
        },
        [loginUser.fulfilled]: (state, action) => {
            state.loginStatus = 'success';
            state.token = action.payload.key;
            setToken(state.token);
        },
        [loginUser.rejected]: (state, action) => {
            state.loginStatus = 'error';
        },

    }
})

export const {setTokenFromLocalStorage} = authSlice.actions;

export default authSlice.reducer;