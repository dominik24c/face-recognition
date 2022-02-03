import PostList from "./PostList";
import {getUserPosts} from "../../store/slices/post";
import {useNavigate} from "react-router-dom";

const UserPosts = () => {
    const navigate = useNavigate();

    const editPostHandler = (id) => {
        navigate(`/user-posts/${id}`);
    }

    return (
        <PostList func={getUserPosts} buttonName={"Edit"} buttonClickHandler={editPostHandler}/>
    )
}

export default UserPosts;