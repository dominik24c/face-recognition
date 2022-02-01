import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getPosts} from "../../store/slices/post";
import Post from "./Post";
import {Grid} from "@mui/material";

const PostList = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.post.posts);

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    const renderPosts = () => {
        return posts.map(post => {
            return <Post key={post.id}
                         post_picture={post.post_picture}
                         title={post.title}
                         description={post.description}
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