import React from 'react';
import {Button, FormControl, Input, InputLabel, TextField, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import {makeStyles} from "@mui/styles";
import ErrorMessage from "../UI/ErrorMessage";
import {useDispatch} from "react-redux";
import {createPost} from "../../store/slices/post";

const useStyles = makeStyles({
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block'
    }
});

const PostCreate = () => {
    const classes = useStyles();

    const {register, handleSubmit, formState: {errors}} = useForm();
    const dispatch = useDispatch();

    const handleCreatePost = (data) => {
        console.log(data.image[0]);
        const utilizedData = {
            title: data.title,
            description: data.description,
            post_picture: data.image[0],
        };
        dispatch(createPost(utilizedData));
    }

    return (
        <>
            <Typography variant="h3">Create Post</Typography>
            <form onSubmit={handleSubmit(handleCreatePost)}>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <FormControl>
                    <InputLabel>Title:</InputLabel>
                    <Input id="title" variant="standard"
                           {...register('title', {
                               required: "This field is required!",
                               minLength: {
                                   value: 5,
                                   message: "Minimum 5 characters exceeded for title!"
                               },
                               maxLength: {
                                   value: 100,
                                   message: "Maximum 100 characters exceeded for title!"
                               }
                           })}/>
                </FormControl>
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <FormControl>
                    <TextField id="description"
                               className={classes.field}
                               label="Description"
                               variant="outlined"
                               fullWidth
                               rows={10}
                               multiline
                               {...register('description', {
                                   required: "This field is required!",
                                   minLength: {
                                       value: 5,
                                       message: "Minimum 5 characters exceeded for title!"
                                   },
                                   maxLength: {
                                       value: 500,
                                       message: "Maximum 500 characters exceeded for title!"
                                   }
                               })}/>
                </FormControl>
                <ErrorMessage>{errors.image?.message}</ErrorMessage>
                <FormControl>
                    <input type="file" id="img" accept="image/*"
                           {...register('image', {required: "This field is required!"}
                           )}/>
                </FormControl>
                <br/>
                <Button type="submit" variant="contained" style={{marginTop: "1rem"}}>Create</Button>
            </form>
        </>
    );
}

export default PostCreate;