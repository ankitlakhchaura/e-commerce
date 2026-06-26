import Navbar from "./components/Navbar";
import AdminOrders from "./pages/AdminOrders";
import AdminProducts from "./pages/AdminProducts";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import AdminDashboard from "./pages/AdminDashboard";

import { Routes, Route ,useLocation} from "react-router-dom";

function App() {
  const location=useLocation();
  return (
    <>
      {location.pathname !=="/login"&& location.pathname !=="/register"&&<Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/products" element={<Products/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
      </Routes>
    </>
  );
}

export default App;