import PostList from "./PostList";
import {getPosts} from "../../store/slices/post";
import {useNavigate} from "react-router-dom";

const AllPosts = () => {
     const navigate = useNavigate();

    const getPostHandler = (id) => {
        navigate(`/posts/${id}`);
    }

    return (
        <PostList func={getPosts} buttonName="Read" buttonClickHandler={getPostHandler}/>
    )
}

export default AllPosts;