import { useState } from "react";
import api from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = () => {
    api.post("/auth/register", {
      name,
      email,
      password,
    })
    .then(() => {
      alert("Registration Successful");
    })
    .catch((err) => {
      console.log(err);
      alert("Registration Failed");
    });
  };

  return (
    <div className="container py-5">
        <div className="row justify-content-center">
            <div className="col-md-5">
                <div className="card shadow-sm p-4"
                style={{ width:"400px", borderRadius:"15px"}}>
      <h1 className="text-center mb-4">Register</h1>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

     

      <input
        type="email"
        className="form-control mb-3"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />



      <input
        type="password"
        className="form-control mb-3"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

   

      <button className="btn btn-primary w-100" onClick={register}>
        Register
      </button>
      <p className="text-center mt-3">
        Already have an account? <a href="/login">Login</a>
      </p>
      </div>
      </div>
      </div>
    </div>
  );
}

export default Register;