import React, {useEffect} from "react";
import {Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {editPost, resetPost} from "../../store/slices/edit_post";
import {useParams} from "react-router-dom";
import Canvas from "./Canvas";

const PostEdit = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const id = params.postId;
    const post = useSelector(state => state.editPost.post);

    useEffect(() => {
        dispatch(editPost(id));
    }, [dispatch, id]);

    useEffect(() => {
        return () => dispatch(resetPost());
    }, [dispatch]);

    return (
        <>
            <Typography variant="h3">Post Edit</Typography>
            {post &&
                <Canvas post={post}/>
            }
        </>
    );
}


export default PostEdit;