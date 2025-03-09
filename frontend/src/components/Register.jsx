import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiPost, initializeCsrf } from "../utils/api";

const Register = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phoneNumber: "",
    birthDate: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    initializeCsrf()
      .then((csrfToken) => console.log("CSRF Token Set:", csrfToken))
      .catch(() => {
        setError("Failed to initialize security token");
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.password !== userData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    console.log("Form submitted", userData);

    try {
      await initializeCsrf();
      const result = await apiPost("/users/register", {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        address: userData.address,
        phoneNumber: userData.phoneNumber,
        birthDate: userData.birthDate,
        password: userData.password,
        confirmPassword: userData.confirmPassword
      });

      console.log("Response after registration:", result);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error("Error during registration:", err);
      setError("Registration failed. Please try again.");
    }
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.id]: e.target.value
    });
  };

  return (
    <div className="d-flex flex-column min-vh-100 custom-background">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="card my-5 shadow">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Create an Account!</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                  {/* Name Fields */}
                  <div className="row mb-3">
                    <div className="col">
                      <label htmlFor="firstName" className="form-label">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder="First Name"
                        required
                        value={userData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="lastName" className="form-label">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        placeholder="Last Name"
                        required
                        value={userData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Email Address"
                      required
                      value={userData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="Address"
                      value={userData.address}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="row mb-3">
                    <div className="col">
                      <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phoneNumber"
                        placeholder="Phone Number"
                        value={userData.phoneNumber}
                        onChange={handleChange}
                        pattern="[0-9]{10}"
                        title="10-digit phone number"
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="birthDate" className="form-label">Birth Date</label>
                      <input
                        type="date"
                        className="form-control"
                        id="birthDate"
                        value={userData.birthDate}
                        onChange={handleChange}
                        max={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                  </div>

                  {/* Password Fields */}
                  <div className="row mb-3">
                    <div className="col">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        required
                        value={userData.password}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        required
                        value={userData.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn custom-submit-button w-100">
                    Register Account
                  </button>
                </form>
                <div className="text-center mt-3">
                  <Link className="link-primary" to="/login">
                    Already have an account? Login!
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;