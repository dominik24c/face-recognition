import React, {useEffect, useState} from 'react';
import {Button, FormControl, Input, InputLabel, Typography} from "@mui/material";
import {useForm} from "react-hook-form";

import {signUpUser} from '../../store/auth/auth';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import ErrorMessage from "../UI/ErrorMessage";

const SignUpPage = () => {
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const status = useSelector(state => state.auth.signUpStatus);
    const errorMessage = useSelector(state => state.auth.signUpErrorMessage);
    const [errorMsg, setErrorMsg] = useState(null);


    const handleSignUp = (data) => {
        dispatch(signUpUser(data));
    }

    useEffect(() => {
        if (status === 'success') {
            navigate('/');
        } else if (status === 'error') {
            setErrorMsg(<Typography variant="p" color="red">{errorMessage}</Typography>);
        }
    }, [status, navigate,errorMessage]);

    return (
        <>
            <Typography variant="h4">Sign Up</Typography>
            {errorMsg}
            <form onSubmit={handleSubmit(handleSignUp)}>
                <ErrorMessage>{errors.username?.message}</ErrorMessage>
                <FormControl variant="standard">
                    <InputLabel>Username:</InputLabel>
                    <Input id="username"
                           {...register('username', {
                               required: "This field is required",
                           })}/>
                </FormControl>
                <br/>
                <ErrorMessage>{errors.email?.message}</ErrorMessage>
                <FormControl variant="standard">
                    <InputLabel>Email:</InputLabel>
                    <Input type="email" id="email" {...register('email', {
                        required: "This field is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address"
                        }
                    })}/>
                </FormControl>
                <br/>
                <ErrorMessage>{errors.password?.message}</ErrorMessage>
                <FormControl variant="standard">
                    <InputLabel>Password:</InputLabel>
                    <Input type="password" id="password" {
                        ...register('password', {
                            required: "This field is required", minLength: 8
                        })
                    }/>
                </FormControl>
                <br/>
                <ErrorMessage>{errors.confirm_password?.message}</ErrorMessage>
                <FormControl variant="standard">
                    <InputLabel>Confirm password:</InputLabel>
                    <Input type="password" id="confirm_password" {...register('confirm_password', {
                        required: "This field is required", minLength: 8,
                        validate: (value) => value === watch('password')
                    })}/>
                </FormControl>
                <br/>
                <Button type="submit" variant="contained">Sign Up</Button>
            </form>
        </>
    );

}

export default SignUpPage;