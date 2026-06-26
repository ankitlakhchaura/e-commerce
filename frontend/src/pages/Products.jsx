import { useEffect, useState } from "react";
import api from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);
  const[search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    api.get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);
const addToCart = (productId) => {
  const user = JSON.parse(localStorage.getItem("user")); // Assuming user info is stored in localStorage
  console.log({ user_id: user.id, product_id: productId, quantity: 1 });
    api.post("/cart/add", { 
        user_id: user.id, // Replace with actual user ID
        product_id: productId,
        quantity: 1
    })
     .then(()=> alert("Product added to cart"))
     .catch((err) => console.log(err));
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4 fw-bold">Products</h1>
      <div className="row g-3 mb-4">
        <div className="col-md-4">
      <input
        type="text"
        className="form-control"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      </div>
      <div className="col-md-4">
      <select
        className="form-select"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="">Sort by...</option>
        <option value="low">Price: Low to High</option>
        <option value="high">Price: High to Low</option>
      </select>
      </div>

      <div className="col-md-4">
      <select
        className="form-select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        
      >
        <option value="">All Categories</option>
        <option value="mobile">Mobile</option>
        <option value="laptop">Laptop</option>
        <option value="headphones">Headphones</option>
        <option value="accessories">Accessories</option>
      </select>
      </div>
      </div>

      <div
        className="row g-4 mt-4"
      >
        {products.filter((product) => {const matchSearch = product.name.toLowerCase().includes(search.toLowerCase());
        const matchCategory = category ? product.category === category : true;
        return matchSearch && matchCategory;
      })
        .sort((a, b) => {
          if (sort === "low") {
            return a.price - b.price;
          } else if (sort === "high") {
            return b.price - a.price;
          }
          return 0;
        }).map((product) => (
          <div className="col-md-4 mx-auto"
            key={product.id}>
            <div className="card shadow-sm p-3 text-center h-100 product-card"
          >
            <h4 className="fw-bold">{product.name}</h4>

            <h5 className="text-success mb-3">₹{product.price}</h5>

            <button
              className="btn btn-primary mt-3"
                onClick={() => addToCart(product.id)}
                >
              Add To Cart
            </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;