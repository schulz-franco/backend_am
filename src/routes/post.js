const { Router } = require("express");
const router = Router();
const verifyToken = require("../middleware/verifyToken");
const multer = require("multer");
const upload = multer({ dest: "public/images" });

const createPostController = require("../controllers/createPost");
const getAllPostController = require("../controllers/getAllPost");
const getUserPostController = require("../controllers/getUserPost");
const likePostController = require("../controllers/likePost");
const commentsPostController = require("../controllers/commentPost");

router.post(
  "/create",
  verifyToken,
  upload.single("image"),
  createPostController
);
router.post("/like", verifyToken, likePostController);
router.post("/comment", verifyToken, commentsPostController);
router.get("/get/:page", verifyToken, getAllPostController);
router.get("/get/user/:userId/:page", verifyToken, getUserPostController);

module.exports = router;
