const router = require('express').Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const uploadController = require("../controllers/upload.controller");
const multer = require('multer');
const upload = multer();

//Authentification
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

//user
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.patch("/follow/:id", userController.followUser);
router.patch("/unfollow/:id", userController.unfollowUser);

/**
 * Upload
 */
 router.post('/upload', upload.single('file'), uploadController.uploadProfil)

module.exports = router;