import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Post from "./Post";
import {Grid} from "@mui/material";

const PostList = (props) => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.post.posts);
    const func = props.func;

    useEffect(() => {
        dispatch(func());
    }, [dispatch, func]);

    const renderPosts = () => {
        return posts.map(post => {
            return <Post key={post.id}
                         post_picture={post.post_picture}
                         title={post.title}
                         description={post.description}
                         buttonName={props.buttonName}
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