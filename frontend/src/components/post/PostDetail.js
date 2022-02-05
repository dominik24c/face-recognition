import React, {useEffect} from 'react';
import {Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {detailPost, resetPost} from "../../store/slices/post";
import {useParams} from "react-router-dom";
import DetectedFaceDetail from "./DetectedFaceDetail";

const PostDetail = () => {
    const dispatch = useDispatch();
    const params = useParams();

    const post = useSelector(state => state.post.post)
    const id = params.postId;

    useEffect(() => {
        dispatch(detailPost(id))
    }, [dispatch, id]);

      useEffect(() => {
        return () => dispatch(resetPost());
    }, [dispatch]);

    let template = null;

    if (post) {
        template = (<>
            <Typography variant="h3">{post.title}</Typography>
            <DetectedFaceDetail post={post}/>
            <br/>
            <Typography variant="p">{post.description}</Typography>
        </>);
    }
    return (
        <>
            {post && template}
        </>
    );
}

export default PostDetail;