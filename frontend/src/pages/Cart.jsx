import { useEffect, useState } from "react";
import axios from "axios";
import api from "../services/api";

function Cart(){
  const [cart, setCart] = useState([]);
const fetchCart = () => {
    const user = JSON.parse(localStorage.getItem("user")); // Assuming user info is stored in localStorage
    if (!user){
      window.location.href="/login";
      return;
    }
    api.get(`/cart/${user.id}`) // Replace with actual user ID
      .then((res) => {
        console.log(res.data);
        setCart(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeItem=(id) => {
    axios
      .delete(`https://e-commerce-backend-19g3.onrender.com/api/cart/${id}`)
      .then(() => fetchCart())
      .catch((err) => console.log(err));
  };

  const placeOrder = () => {
    console.log("Place Order clicked");
    const user = JSON.parse(localStorage.getItem("user")); // Assuming user info is stored in localStorage
    if (!user){
      window.location.href="/login";
      return;
    }
   api.post("/orders",{user_id:user.id}) // Replace with actual user ID
      .then((res) => {
        alert("Order placed successfully!");
        fetchCart();
      })
      .catch((err) => {
        console.log(err.response);
        console.log(err.response.data);  
      });
  };

  const updateQuantity = (id, quantity) => {
    axios
      .put(`https://e-commerce-backend-19g3.onrender.com/api/cart/${id}`, { quantity })
      .then(() => fetchCart())
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    fetchCart();
  }, []);

   const total = cart.reduce((sum, item)=> sum + item.price * item.quantity, 0);
  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">My Cart</h1>
      <p className="text-center text-success mb-4">Total: ₹{total.toFixed(2)}</p>
        <button
        className="btn btn-success d-block mx-auto mt-4 px-5"
        onClick={placeOrder}
      >
        Place Order
      </button>
      {cart.map((item) => (
        <div
          key={item.id}
          className="card shadow-sm p-4 mb-4 mx-auto"
          style={{ maxWidth: "600px" }}
        >
          <h2 className="fw-bold">{item.name}</h2>
          <p className="text-success">₹{item.price}</p>
        <div className="d-flex align-items-center gap-2 mt-3" >
          <button className="btn btn-outline-secondary btn-sm" disabled={item.quantity === 1} onClick={() => updateQuantity(item.id, item.quantity - 1)}>
            -
          </button>
          <span className="fw-bold fs-5">{item.quantity}</span>
          <button className="btn btn-outline-primary btn-sm mx-2" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
            +
          </button>
          <button className="btn btn-danger btn-sm ms-3" onClick={() => removeItem(item.id)}>
            Remove
          </button>
        </div>
        </div>
      ))}
    </div>
    );
}

export default Cart;