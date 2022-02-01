import React from 'react';
import {Box, Typography} from "@mui/material";

const ErrorMessage = (props) => {
    if (!props.children) {
        return <Box sx={{mb: 3}}/>;
    }

    return (
        <>
            <Box sx={{mt: 2}}/>
            <Typography variant="p" color="red" style={{
                marginBottom: "25px",
                marginTop: "5px"
            }}>{props.children}</Typography>
            <br/>
            <Box sx={{mb: 2}}/>
        </>
    );
}

export default ErrorMessage;