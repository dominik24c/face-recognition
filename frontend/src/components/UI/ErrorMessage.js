import React from 'react';
import {Typography} from "@mui/material";

const ErrorMessage = (props) => {
    return (
        <Typography variant="p" color="red">{props.children}</Typography>
    );
}

export default ErrorMessage;