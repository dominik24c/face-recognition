import React, {useEffect, useState} from 'react';
import {Button, FormControl, Input, InputLabel, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../../store/slices/auth";
import {useNavigate} from "react-router-dom";
import ErrorMessage from "../UI/ErrorMessage";

const LoginPage = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();

    const status = useSelector(state => state.auth.loginStatus);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);

    const handleLogin = (data) => {
        dispatch(loginUser(data));
    }

    useEffect(() => {
        if (status === 'success') {
            navigate('/');
        } else if (status === 'error') {
            setErrorMessage(<ErrorMessage>Invalid Credentials!</ErrorMessage>);
        }
    }, [status, navigate]);

    return (
        <>
            <Typography variant="h3">Login</Typography>
            {errorMessage}
            <form onSubmit={handleSubmit(handleLogin)}>
                <ErrorMessage>{errors.username?.message}</ErrorMessage>
                <FormControl variant="standard">
                    <InputLabel>Username:</InputLabel>
                    <Input {...register('username', {required: 'This field is required!'})}/>
                </FormControl>
                <br/>
                <ErrorMessage>{errors.username?.password}</ErrorMessage>
                <FormControl variant="standard">
                    <InputLabel>Password:</InputLabel>
                    <Input type="password" {...register('password', {required: 'This field is required!'})}/>
                </FormControl>
                <br/>
                <Button type="submit" variant="contained" style={{marginTop:"1rem"}}>Login</Button>
            </form>
        </>
    );

}

export default LoginPage;