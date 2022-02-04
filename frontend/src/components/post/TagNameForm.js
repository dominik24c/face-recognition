import React, {useEffect} from "react";
import {Button, FormControl, Input, InputLabel, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import ErrorMessage from "../UI/ErrorMessage";
import {useDispatch} from "react-redux";

const TagNameForm = (props) => {
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const dispatch = useDispatch();
    const id = props.id;

    const saveTagNameHandler = (data) => {
        console.log(data);
        // dispatch()
    }

    useEffect(()=>{
        reset();
    },[reset, id])

    console.log(props.tagName);

    return (
        <form onSubmit={handleSubmit(saveTagNameHandler)}>
            <ErrorMessage>{errors.tag_name?.message}</ErrorMessage>
            <FormControl>
                <InputLabel>Tag Name:</InputLabel>
                <Input
                    {...register('tag_name', {
                        required: 'This field is required!'
                    })}
                    defaultValue={props.tagName || ''}/>
            </FormControl>
            <br/>
            <Button variant="contained"
                    style={{marginTop: 10}}
                    type="submit"
                    >Save Tag</Button>
            <Typography variant="h6">{id}</Typography>
        </form>
    );
}


export default TagNameForm;