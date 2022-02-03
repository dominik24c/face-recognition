import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Post from "./Post";
import {Grid} from "@mui/material";
import {Outlet} from 'react-router-dom';
const PostList = (props) => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.post.posts);
    const func = props.func;

    useEffect(() => {
        dispatch(func());
    }, [dispatch, func]);

    const renderPosts = () => {
        return posts.map(post => {
            const id = post.id;
            return <Post key={id}
                         id={id}
                         post_picture={post.post_picture}
                         title={post.title}
                         description={post.description}
                         buttonName={props.buttonName}
                         buttonClickHandler={props.buttonClickHandler.bind(this, id)}
            />
        })

    }
    return (
        <Grid container spacing={2}>
            {renderPosts()}
        </Grid>
    );
}

export default PostList;