const db = require("../config/db");

const createOrder = (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  const sql =
    "INSERT INTO ecommerce_orders (user_id, product_id, quantity) VALUES (?, ?, ?)";

  db.query(sql, [user_id, product_id, quantity], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(201).json({
      message: "Order Created Successfully"
    });
  });
};

const getOrders = (req, res) => {
  const { user_id}=req.query;
  const sql = `
    SELECT
      ecommerce_orders.id,
      ecommerce_orders.quantity,
      ecommerce_orders.status,
      ecommerce_orders.created_at,
      ecommerce_products.name,
      ecommerce_products.price
    FROM ecommerce_orders
    JOIN ecommerce_products
    ON ecommerce_orders.product_id = ecommerce_products.id
    Where ecommerce_orders.user_id=?
  `;

  db.query(sql,[user_id] ,(err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json(result);
  });
};

const deleteOrder = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM ecommerce_orders WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json({
      message: "Order Deleted Successfully"
    });
  });
};

const updateOrderStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const sql = "UPDATE ecommerce_orders SET status = ? WHERE id = ?";

  db.query(sql, [status, id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json({
      message: "Order Status Updated Successfully"
    });
  });
};

const placeOrder = (req, res) => {
  console.log("Place Order API Hit"); // Debugging line to check if the function is reached
  console.log(req.body); // Debugging line to check the request body
  const { user_id } = req.body;

  const getCartSql =
    "SELECT product_id, quantity FROM ecommerce_cart WHERE user_id = ?";

  db.query(getCartSql, [user_id], (err, cartItems) => {
    console.log(cartItems); // Debugging line to check the cart items
    if (err) return res.status(500).json(err);

    if (cartItems.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    const values = cartItems.map((item) => [
      user_id,
      item.product_id,
      item.quantity,
      "Pending" // Default status
    ]);

    console.log("Values:", values); // Debugging line to check the values to be inserted

    const insertSql =
      "INSERT INTO ecommerce_orders (user_id, product_id, quantity, status) VALUES ?";

    db.query(insertSql, [values], (err, result) => {
      console.log("Insert Result:", result); // Debugging line to check the result of the insert query
      console.log("Insert Error:", err); // Debugging line to check for errors in the insert query
      if (err) return res.status(500).json(err);

      const deleteSql = "DELETE FROM ecommerce_cart WHERE user_id = ?";

      db.query(deleteSql, [user_id], (err,result) => {
        console.log("Delete Result:", result); // Debugging line to check the result of the delete query
        console.log("Delete Error:", err); // Debugging line to check for errors in the delete query
        if (err) return res.status(500).json(err);
        console.log("Sending response"); // Debugging line to check if the response is being sent

        res.status(201).json({
          message: "Order Placed Successfully",
        });
      });
    });
  });
};

const getAllOrders = (req, res) => {
  const sql = `
    SELECT
    o.id,u.name AS user_name, p.name AS product_name, o.quantity, o.created_at, o.status
    FROM ecommerce_orders o
    JOIN ecommerce_users u ON o.user_id = u.id
    JOIN ecommerce_products p ON o.product_id = p.id
    ORDER BY o.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.status(200).json(results);
  });
};

module.exports = {
  createOrder,
  getOrders,
  deleteOrder,
  updateOrderStatus,
  placeOrder,
  getAllOrders
};