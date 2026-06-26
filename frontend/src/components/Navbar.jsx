import{ Link } from "react-router-dom";
function Navbar() {
  return (
    <nav
      className="navbar navbar-expend-lg navbar-dark bg-dark shadow px-4"
    >
      <h2 className="navbar-brand mb-0 fw-bold">E-Shop</h2>

      <div className="d-flex align-items-center gap-3">
        <Link to="/" className="text-white text-decoration-none">Home</Link>
        <Link to="/cart" className="text-white text-decoration-none">Cart</Link>
        <Link to="/login" className="text-white text-decoration-none">Login</Link>
        <Link to="/orders" className="text-white text-decoration-none">Orders</Link>
        <button onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }} className="btn btn-danger btn-sm">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;