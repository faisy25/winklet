const express = require("express");
const router = express.Router();

const {
  verifyIsLoggedIn,
  verifyIsAdmin
} = require("../middlewares/verifyAuthToken");

const {
  getUsers,
  registerUser,
  loginUser,
  updateUserProfile,
  getUserProfile,
  writeReview,
  getUser,
  updateUser,
  deleteUser
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);

// user logged in
router.use(verifyIsLoggedIn);
router.put("/profile", updateUserProfile);
router.get("/profile/:id", getUserProfile);
router.post("/review/:productId", writeReview);

// admin routes
router.use(verifyIsAdmin);
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
