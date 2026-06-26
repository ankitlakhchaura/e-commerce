const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const { addProduct,getProducts,getProductById,deleteProduct,updateProduct } = require("../controllers/productController");

router.post("/add", addProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);
router.put("/:id",(req, res, next)=>{
    console.log("PUT route reached");
    next();
}, verifyToken, updateProduct);
module.exports = router;