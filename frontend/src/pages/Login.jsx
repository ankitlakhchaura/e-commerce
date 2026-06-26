import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    api.post("/auth/login", {
      email,
      password,
    })
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Login Successful");
      navigate("/");
    })
    .catch((err) => {
      console.log(err);
      alert("Login Failed");
    });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center"
    style={{ minHeight:"90vh"}}>
        <div className="card shadow p-4"
        style={{width: "400px",
            borderRadius: "15px"
        }}>
      <h1 className="text-center mb-4">Login</h1>

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


      <button className="btn btn-primary w-100" onClick={login}>
        Login
      </button>
      <p className="text-center mt-3">Don't have an account?{""}
        <a href="/register">Register</a></p>
    </div>
    </div>
  );
}

export default Login;