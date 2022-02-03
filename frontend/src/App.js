import './App.css';
import {Route, Routes} from "react-router-dom";
import NotFoundPage from "./components/errors/NotFoundPage";
import SignUpPage from "./components/auth/SignUpPage";
import LoginPage from "./components/auth/LoginPage";
import HomePage from "./components/post/Home";
import {Container} from "@mui/material";
import Navbar from "./components/UI/Navbar";
import PostCreate from "./components/post/PostCreate";
import {useDispatch} from "react-redux";
import {setTokenFromLocalStorage} from "./store/slices/auth";
import AllPosts from "./components/post/AllPosts";
import UserPosts from "./components/post/UserPosts";
import PostEdit from "./components/post/PostEdit";
import PostDetail from "./components/post/PostDetail";

function App() {
    const dispatch = useDispatch();

    dispatch(setTokenFromLocalStorage());

    return (
        <>
            <Navbar/>
            <Container>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/signup" element={<SignUpPage/>}/>
                    <Route path="/posts/create" element={<PostCreate/>}/>
                    <Route path="/posts" element={<AllPosts/>}/>
                    <Route path="/posts/:postId" element={<PostDetail/>}/>
                    <Route path="/user-posts" element={<UserPosts/>}/>
                    <Route path="/user-posts/:postId" element={<PostEdit/>}/>
                    <Route path='*' exact element={<NotFoundPage/>}/>
                </Routes>
            </Container>
        </>
    );
}

export default App;
