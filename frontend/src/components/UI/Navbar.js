import React from 'react';
import {AppBar, Box, IconButton, Toolbar, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import LOGO from '../../img/logo.png';
import {useSelector} from "react-redux";

const Navbar = (props) => {
    const token = useSelector(state => state.auth.token);
    const isAuth = !!token;
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
                {!isAuth && <>
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
                </>
                }
                {isAuth && <>
                    <NavLink to='/posts/create'>
                        <IconButton>
                            <Typography variant="h6" style={{color: "white"}}>Create Post</Typography>
                        </IconButton>
                    </NavLink>
                    <NavLink to='/posts'>
                        <IconButton>
                            <Typography variant="h6" style={{color: "white"}}>Posts</Typography>
                        </IconButton>
                    </NavLink>
                    <NavLink to='/user-posts'>
                        <IconButton>
                            <Typography variant="h6" style={{color: "white"}}>Your Posts</Typography>
                        </IconButton>
                    </NavLink>
                </>}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;