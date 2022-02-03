import React from "react";
import {Button, FormControl, Input, InputLabel} from "@mui/material";
import {useForm} from "react-hook-form";
import ErrorMessage from "../UI/ErrorMessage";
import {useDispatch} from "react-redux";

const TagNameForm = (props) => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const dispatch = useDispatch();

    const saveTagNameHandler = (data) => {
        console.log(data);
        // dispatch()
    }

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
        </form>
    );
}


export default TagNameForm;