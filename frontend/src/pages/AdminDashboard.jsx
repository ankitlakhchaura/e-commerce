import { useState, useEffect } from "react";
import axios from "axios";
import api from "../services/api";

function AdminDashboard() {
const [dashboardData, setDashboardData] = useState({});

useEffect(() => {
    axios.get("http://localhost:5000/api/dashboard")
        .then((res) => setDashboardData(res.data))
        .catch((err) => console.log(err));
}, []);

return (
<div className="container mt-4">
  <h2 className="mb-4">Admin Dashboard</h2>

  <div className="row">

    <div className="col-md-3 mb-3">
      <div className="card text-white bg-primary">
        <div className="card-body">
          <h5>Total Users</h5>
          <h2>{dashboardData.totalUsers}</h2>
        </div>
      </div>
    </div>

    <div className="col-md-3 mb-3">
      <div className="card text-white bg-success">
        <div className="card-body">
          <h5>Total Products</h5>
          <h2>{dashboardData.totalProducts}</h2>
        </div>
      </div>
    </div>

    <div className="col-md-3 mb-3">
      <div className="card text-white bg-warning">
        <div className="card-body">
          <h5>Total Orders</h5>
          <h2>{dashboardData.totalOrders}</h2>
        </div>
      </div>
    </div>

    <div className="col-md-3 mb-3">
      <div className="card text-white bg-danger">
        <div className="card-body">
          <h5>Pending Orders</h5>
          <h2>{dashboardData.pendingOrders}</h2>
        </div>
      </div>
    </div>

  </div>
</div>
);
}
export default AdminDashboard;

