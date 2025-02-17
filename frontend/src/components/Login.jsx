import React, { useState } from "react";
import { Link } from "react-router-dom";
import { apiPost } from "../utils/api";
import { apiFormPost } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password); // Use AuthContext login
      console.log("Login successful, navigating to dashboard");
      navigate("/dashboard");
    } catch (err) {
      setError("Login failed: " + err.message);
    }
  };

  /*const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiFormPost("/auth/login", {
        username: email,
        password: password,
      });
      navigate("/dashboard");
    } catch (err) {
      setError("Login failed");
    }*/
    /* try {
      const response = await apiFormPost("/login", {email, password});
      const data = await response.json();
      
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "/dashboard";
      
    } catch (err) {
      setError(err.message || "Login failed");
    } */
  

return (
<div className="container">
  {/* Outer Row */}
  <div className="row justify-content-center">
    <div className="col-xl-10 col-lg-12 col-md-9">
      <div className="card o-hidden border-0 shadow-lg my-5">
        <div className="card-body p-0">
          {/* Nested Row within Card Body */}
          <div className="row">
            <div className="col-lg-6 d-none d-lg-block bg-login-image" />
            <div className="col-lg-6">
              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                </div>
                <form className="user" onSubmit={handleSubmit}>
                <div className="form-group">
                <input
                  type="email"
                  className="form-control form-control-user"
                  placeholder="Enter Email Address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-user"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary btn-user btn-block">
                  Login
                </button>
                </form>
                  <hr /> 
                <div className="text-center">
                  <Link className="small" to="/register">Create an Account!</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>);

};

export default Login;
