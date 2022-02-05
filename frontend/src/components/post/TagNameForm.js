import React, {useEffect} from "react";
import {Button, FormControl, Input, InputLabel, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import ErrorMessage from "../UI/ErrorMessage";
import {useDispatch} from "react-redux";
import {saveTagName} from "../../store/slices/edit_post";

const TagNameForm = ({id, tagName}) => {
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const dispatch = useDispatch();

    const saveTagNameHandler = (data) => {
        dispatch(saveTagName({id, data}));
    }

    useEffect(() => {
        reset({
            tag_name: tagName
        });
    }, [reset, tagName,id])


    return (
        <form onSubmit={handleSubmit(saveTagNameHandler)}>
            <ErrorMessage>{errors.tag_name?.message}</ErrorMessage>
            <FormControl>
                <InputLabel>Tag Name:</InputLabel>
                <Input
                    {...register('tag_name', {
                        required: 'This field is required!'
                    })}
                    defaultValue={tagName || ''}/>
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