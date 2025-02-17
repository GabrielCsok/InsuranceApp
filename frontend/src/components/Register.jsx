import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiPost, initializeCsrf } from "../utils/api";
import { useNavigate } from "react-router-dom";


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

  const navigate = useNavigate();

  useEffect(() => {
    // Initialize CSRF on component mount
    initializeCsrf()
    .then(csrfToken => console.log("CSRF Token Set:", csrfToken))
    .catch(() => {
      setError("Failed to initialize security token");
    });
  }, []);



  const [error, setError] = useState("");

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

    {/*if (response.status === 201) {
        alert("Registration successful! Please login.");
        navigate("/login");
    } else {
        const errorData = await response.json();
        setError(errorData.message || "Registration failed");
    }
    } catch (err) {
      setError("Registration failed. Please try again.");
    }*/}
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.id]: e.target.value
    });
  };

  return (
    <div className="container">
      <div className="card o-hidden border-0 shadow-lg my-5">
        <div className="card-body p-0">
          <div className="row">
            <div className="col-lg-5 d-none d-lg-block bg-register-image" />
            <div className="col-lg-7">
              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                  {error && <div className="alert alert-danger">{error}</div>}
                </div>
                <form className="user" onSubmit={handleSubmit}>
                  {/* Name Fields */}
                  <div className="form-group row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                      <input
                        type="text"
                        className="form-control form-control-user"
                        id="firstName"
                        placeholder="First Name"
                        required
                        value={userData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control form-control-user"
                        id="lastName"
                        placeholder="Last Name"
                        required
                        value={userData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control form-control-user"
                      id="email"
                      placeholder="Email Address"
                      required
                      value={userData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-user"
                      id="address"
                      placeholder="Address"
                      value={userData.address}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                      <input
                        type="tel"
                        className="form-control form-control-user"
                        id="phoneNumber"
                        placeholder="Phone Number"
                        value={userData.phoneNumber}
                        onChange={handleChange}
                        pattern="[0-9]{10}"
                        title="10-digit phone number"
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="date"
                        className="form-control form-control-user"
                        id="birthDate"
                        value={userData.birthDate}
                        onChange={handleChange}
                        max={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>

                  {/* Password Fields */}
                  <div className="form-group row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                      <input
                        type="password"
                        className="form-control form-control-user"
                        id="password"
                        placeholder="Password"
                        required
                        value={userData.password}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="password"
                        className="form-control form-control-user"
                        id="confirmPassword"
                        placeholder="Repeat Password"
                        required
                        value={userData.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-user btn-block"
                  >
                    Register Account
                  </button>
                </form>

                <div className="text-center mt-3">
                  <Link className="small" to="/login">
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