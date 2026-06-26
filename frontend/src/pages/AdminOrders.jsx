import { useEffect, useState } from "react";
import api from "../services/api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    api.get("/orders/all")
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = (id, status) => {
    api.put(`/orders/${id}`, { status })
      .then(() => {
        alert("Status Updated");
        fetchOrders();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">Admin Orders</h1>

      {orders.map((order) => (
        <div
          key={order.id}
          className="card shadow-sm p-4 mb-4 mx-auto"
        >
          <h3 className="fw-bold text-primary">{order.product_name}</h3>
          <p><strong>User:</strong> {order.user_name}</p>
          <p><strong>Quantity:</strong> {order.quantity}</p>
          <p><strong>Status:</strong>
            <select
            className="form-select w-auto d-inline-block ms-2"
              value={order.status}
              onChange={(e) => updateStatus(order.id, e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </p>
          <p >Date: {new Date(order.created_at).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}

export default AdminOrders;