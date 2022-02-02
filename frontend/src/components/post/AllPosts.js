import PostList from "./PostList";
import {getPosts} from "../../store/slices/post";

const AllPosts = () => {
    return (
        <PostList func={getPosts} buttonName="Read"/>
    )
}

export default AllPosts;