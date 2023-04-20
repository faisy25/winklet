const express = require("express");
const router = express.Router();

const {
  verifyIsLoggedIn,
  verifyIsAdmin
} = require("../middlewares/verifyAuthToken");

const {
  getProducts,
  getProductById,
  getBestsellers,
  adminGetProducts,
  adminCreateProduct,
  adminDeleteProduct,
  adminUpdateProduct,
  adminUpload,
  adminDeleteProductImage
} = require("../controllers/productController");

//best sellers (sales)
router.get("/bestsellers", getBestsellers);

// search filter through categories,attributes rating
router.get("/search/:searchQuery", getProducts);
router.get("/category/:categoryName", getProducts);
router.get("/category/:categoryName/search/:searchQuery", getProducts);

//products
router.get("/", getProducts);
router.get("/get-one/:id", getProductById);

// admin product routes
router.use(verifyIsLoggedIn);
router.use(verifyIsAdmin);
router.get("/admin", adminGetProducts);
router.delete("/admin/:id", adminDeleteProduct);
router.delete("/admin/image/:imagePath/:productId", adminDeleteProductImage);
router.put("/admin/:id", adminUpdateProduct);
router.post("/admin/upload", adminUpload);
router.post("/admin", adminCreateProduct);

module.exports = router;
