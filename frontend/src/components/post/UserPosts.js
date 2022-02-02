import PostList from "./PostList";
import {getUserPosts} from "../../store/slices/post";

const UserPosts = () => {
    return (
        <PostList func={getUserPosts} buttonName={"Edit"}/>
    )
}

export default UserPosts;