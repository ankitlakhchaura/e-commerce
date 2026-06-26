import { useEffect, useState } from "react";
import api from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    api.get(`/orders?user_id=${user.id}`)
      .then((res) =>{
        console.log(res.data)
      setOrders(res.data);
    })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">My Orders</h1>

      {orders.length === 0 ? (
    <h4 className="text-center text-muted">No Orders Yet</h4>
) : (
      orders.map((order) => (
        <div
          key={order.id}
          className="card shadow-sm rounded-4 mb-4"
        >
          <div className="card-body">
          <h3 className="mb-3">Product ID: {order.product_id}</h3>
          <p><strong>Quantity:</strong> {order.quantity}</p>
          <p><strong>Status:</strong>{" "}
          <span className={
            order.status==="Delivered"?"badge bg-success":
            order.status==="Shipped"?"badge bg-primary":
            "badge bg-warning text-dark"}>
         {order.status}</span></p>
          <p><strong> Date:</strong>{" "}
          {new Date(order.created_at).toLocaleDateString()}</p>
        </div>
        </div>
      ))
)}
    </div>
  );
}

export default Orders;