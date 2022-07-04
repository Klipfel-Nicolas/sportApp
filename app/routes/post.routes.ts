import { Router } from "express";;
import { readPost, createPost, updatePost, deletePost, likePost, unlikePost, commentPost, editCommentPost, deleteCommentPost } from "../controllers/post.controller";
import { AuthMiddleware } from '../middleware/auth.middleware';
const multer = require('multer');
const upload = multer();


export const postRoutes = (router: Router) => {
    //Post
    router.get("/api/post/", AuthMiddleware, readPost);
    router.post("/api/post/", AuthMiddleware, upload.single('file'), createPost);
    router.put("/api/post/:id", AuthMiddleware, updatePost);
    router.delete("/api/post/:id", AuthMiddleware, deletePost);
    router.patch("/api/post/like-post/:id", AuthMiddleware, likePost);
    router.patch("/api/post/unlike-post/:id", AuthMiddleware, unlikePost);

    //comments
    router.patch('/api/post/comment-post/:id', AuthMiddleware, commentPost);
    router.patch('/api/post/edit-comment-post/:id', AuthMiddleware, editCommentPost);
    router.patch('/api/post/delete-comment-post/:id', AuthMiddleware, deleteCommentPost);
}
