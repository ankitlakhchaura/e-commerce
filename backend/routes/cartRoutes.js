const express = require("express");
const router = express.Router();

const { addToCart, getCart, deleteFromCart,updateCartItem } = require("../controllers/cartController");

router.post("/add", addToCart);
router.get("/:user_id", getCart);
router.delete("/:id", deleteFromCart);
router.put("/:id", updateCartItem);
module.exports = router;