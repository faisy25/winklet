const express = require("express");
const router = express.Router();

const {
  getCategories,
  newCatgeory,
  deleteCatgeory,
  saveAttr
} = require("../controllers/categoryController");

const {
  verifyIsLoggedIn,
  verifyIsAdmin
} = require("../middlewares/verifyAuthToken");

//Categories
router.get("/", getCategories);

router.use(verifyIsLoggedIn); //middleware user
router.use(verifyIsAdmin); //middleware admin

router.post("/", newCatgeory);
router.delete("/:category", deleteCatgeory);

// Attributes
router.post("/attr", saveAttr);

module.exports = router;
