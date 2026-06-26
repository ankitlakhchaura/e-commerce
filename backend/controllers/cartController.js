const db = require("../config/db");

const addToCart = (req, res) => {
    const { user_id, product_id, quantity } = req.body;

db.query(
  "SELECT * FROM ecommerce_cart WHERE user_id=? AND product_id=?",
  [user_id, product_id],
  (err, result) => {

    if (err) return res.status(500).json(err);

    if (result.length > 0) {

      db.query(
        "UPDATE ecommerce_cart SET quantity = quantity + ? WHERE user_id=? AND product_id=?",
        [quantity, user_id, product_id],
        (err,result) => {
            console.log(result);

          if (err) return res.status(500).json(err);

          res.json({ message: "Quantity Updated" });

        }
      );

    } else {

      db.query(
        "INSERT INTO ecommerce_cart(user_id,product_id,quantity) VALUES(?,?,?)",
        [user_id, product_id, quantity],
        (err) => {

          if (err) return res.status(500).json(err);

          res.json({ message: "Product Added" });

        }
      );

    }

  }
);
};

const getCart = (req, res) => {
    const { user_id } = req.params;
    const sql = "SELECT c.id, c.quantity, p.name, p.price FROM ecommerce_cart c JOIN ecommerce_products p ON c.product_id = p.id WHERE c.user_id = ?";

    db.query(sql, [user_id], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.status(200).json(result);
    });
};

const deleteFromCart = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM ecommerce_cart WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.status(200).json({
            message: "Product Removed From Cart"
        });
    });
};

const updateCartItem = (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    const sql = "UPDATE ecommerce_cart SET quantity = ? WHERE id = ?";
    db.query(sql, [quantity, id], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.status(200).json({
            message: "Cart Item Updated"
        });
    });
};

module.exports = { addToCart, getCart, deleteFromCart, updateCartItem };