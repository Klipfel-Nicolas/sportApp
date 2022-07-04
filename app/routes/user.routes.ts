import { Router } from "express";
import { signUp, signIn, logout, AuthentificateUser } from "../controllers/auth.controller";
import { getAllUsers, userInfo, updateUser, deleteUser, followUser, unfollowUser } from "../controllers/user.controller";
import { AuthMiddleware } from '../middleware/auth.middleware';
import { uploadProfil } from "../controllers/upload.controller";

const multer = require('multer');
const upload = multer();

export const userRoutes = (router: Router) => {
    //Authentification
    router.post("/api/user/register", signUp);
    router.post("/api/user/login", signIn);
    router.get("/api/user/logout", AuthMiddleware, logout);

    //user
    router.get("/api/user/authentificate", AuthMiddleware, AuthentificateUser);
    router.get("/api/user/", AuthMiddleware, getAllUsers);
    router.get("/api/user/:id", AuthMiddleware, userInfo);
    router.put("/api/user/:id", AuthMiddleware, updateUser);
    router.delete("/api/user/:id", AuthMiddleware, deleteUser);
    router.patch("/api/user/follow/:id", AuthMiddleware, followUser);
    router.patch("/api/user/unfollow/:id", AuthMiddleware, unfollowUser);

    //Upload
    router.post('/upload', upload.single('file'), AuthMiddleware, uploadProfil)
}
