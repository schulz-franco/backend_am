const { Router } = require("express");
const router = Router();
const verifyToken = require("../middleware/verifyToken");
const multer = require('multer');
const upload = multer({ dest: 'public/profiles' });

const updateController = require("../controllers/updateUser");
const getUserData = require("../controllers/getUserData");

router.put("/update", verifyToken, upload.single('image'), updateController);
router.get("/get/:userId", verifyToken, getUserData)

module.exports = router;