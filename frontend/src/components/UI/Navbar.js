import React from 'react';
import {AppBar, Box, IconButton, Toolbar, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import LOGO from '../../img/logo.png';
import {isAuthenticated} from "../../store/auth/auth";

const Navbar = (props) => {
    const isAuth = isAuthenticated();
    console.log(isAuth);
    return (
        <AppBar position="static" style={{
            marginBottom: "2rem"
        }}>
            <Toolbar>
                <IconButton>
                    <NavLink to="/">
                        <img src={LOGO} alt="logo" width="30px"/>
                    </NavLink>
                </IconButton>
                <Box flexGrow={1}/>
                <NavLink to='/signup'>
                    <IconButton>
                        <Typography variant="h6" style={{color: "white"}}>Sign Up</Typography>
                    </IconButton>
                </NavLink>
                <NavLink to='/login'>
                    <IconButton>
                        <Typography variant="h6" style={{color: "white"}}>Login</Typography>
                    </IconButton>
                </NavLink>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;