const db = require("../config/db");

const getDashboardStats = (req, res) => {

    const sql = `
    SELECT
    (SELECT COUNT(*) FROM ecommerce_users) AS totalUsers,
    (SELECT COUNT(*) FROM ecommerce_products) AS totalProducts,
    (SELECT COUNT(*) FROM ecommerce_orders) AS totalOrders,
    (SELECT COUNT(*) FROM ecommerce_orders WHERE status='Pending') AS pendingOrders,
    (SELECT COUNT(*) FROM ecommerce_orders WHERE status='Delivered') AS deliveredOrders
    `;

    db.query(sql, (err, result) => {

        if(err){
            return res.status(500).json(err);
        }

        res.status(200).json(result[0]);
    });
};

const getRecentOrders = (req, res) => {
    const sql = `
    SELECT * FROM ecommerce_orders
    ORDER BY created_at DESC
    LIMIT 5
    `;

    db.query(sql, (err, result) => {
        if(err){
            return res.status(500).json(err);
        }
        res.status(200).json(result);
    });
};

module.exports = { getDashboardStats, getRecentOrders };