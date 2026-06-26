import { useEffect, useState } from "react";
import api from "../services/api";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchProducts = () => {
    api.get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };

  const editProduct = (product) => {
    setEditingId(product.id);
    setName(product.name);
    setPrice(product.price);
  };

  const addProduct = () => {
  api.post("/products/add", {
    name,
    price,
    category
  })
  .then(() => {
    alert("Product Added");
    setName("");
    setPrice("");
    fetchProducts();
  })
  .catch((err) => console.log(err));
};

const updateProduct = () => {
  api.put(`/products/${editingId}`, {
    name,
    price
  })
  .then(() => {
    alert("Product Updated");
    setEditingId(null);
    setName("");
    setPrice("");
    fetchProducts();
  })
  .catch((err) => console.log(err));
};

    const handleDelete = async (id) => {
        await api.delete(`/products/${id}`);
        fetchProducts();
    }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mt-4">
        <h2 className="mb-4">Admin Products</h2>
      <div className="row mb-4">
  <div className="col-md-4">
    <input
      type="text"
      className="form-control"
      placeholder="Product Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  </div>

  <div className="col-md-3">
    <input
      type="number"
      className="form-control"
      placeholder="Price"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
    />
  </div>

  <div className="col-md-3">
    <select
      className="form-select"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
    >
      <option value="">Select Category</option>
      <option value="Electronics">Electronics</option>
      <option value="Fashion">Fashion</option>
      <option value="Shoes">Shoes</option>
    </select>
  </div>

  <div className="col-md-2">
    <button
      className={`btn ${editingId ? "btn-warning" : "btn-success"} w-100`}
      onClick={editingId ? updateProduct : addProduct}
    >
      {editingId ? "Update" : "Add"}
    </button>
  </div>
</div>
  

      {products.map((product) => (
        <div
          key={product.id}
          className="card p-4 mb-4 shadow-sm border-0"
        >
          <h4 className="fw-bold">{product.name}</h4>
          <p className="text-success fw-bold">Price: ₹{product.price}</p>
          <div className="d-flex gap-2">
          <button className="btn btn-warning px-4" onClick={() => editProduct(product)}>
            Edit
          </button>
          <button className="btn btn-danger px-4" onClick={() => {
            handleDelete(product.id);
          }}>
            Delete
          </button>
          </div>
        </div>
      ))}

</div>
  );
}

export default AdminProducts;