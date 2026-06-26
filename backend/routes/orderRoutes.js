const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrders,
  deleteOrder,
  updateOrderStatus,
  placeOrder,
  getAllOrders
} = require("../controllers/orderController");

router.post("/add", createOrder);
router.post("/", placeOrder);
router.get("/", getOrders);
router.get("/all", getAllOrders);
router.delete("/:id", deleteOrder);
router.put("/:id", updateOrderStatus);
module.exports = router;