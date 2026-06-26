const db = require("../config/db");

const addProduct = (req, res) => {
  const { name, description, price, image, stock, category } = req.body;

  const sql =
    "INSERT INTO ecommerce_products (name, description, price, image, stock, category) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(
    sql,
    [name, description, price, image, stock, category],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: "Product Added Successfully",
      });
    }
  );
};

const getProducts = (req, res) => {
  const sql = "SELECT * FROM ecommerce_products"; 

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json(results);
  });
};

const getProductById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM ecommerce_products WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(results[0]);
  });
};

const deleteProduct = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM ecommerce_products WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  });
};

const updateProduct = (req, res) => {
  console.log("Body:", req.body);
  const { id } = req.params;
  const { name, description, price, image, stock, category } = req.body;

  const sql = "UPDATE ecommerce_products SET name = ?, description = ?, price = ?, image = ?, stock = ?, category = ? WHERE id = ?";
 console.log("Before db.query call"); // Debugging line to check if the function is reached
  db.query(sql, [name, description, price, image, stock, category, id], (err, result) => {
    console.log("Inside db.query callback"); // Debugging line to check if the callback is reached
    console.log("SQL ERROR:", err); // Debugging line to check for SQL errors
    console.log("Result:", result); // Debugging line to check the result of the query
    if (err) {
      return res.status(500).json(err);
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully" });
  });
};

module.exports = { addProduct, getProducts, getProductById, deleteProduct, updateProduct };  