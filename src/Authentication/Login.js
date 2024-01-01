import React, { useState } from "react";

export const Login = ({ onSignIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform any client-side validation if needed
    if (email && password) {
      // Call the onSignIn callback provided by the parent component
      onSignIn(email, password);
    } else {
      // Handle validation error
      console.error("Please enter both email and password");
    }
  };
  return (
    <div className="container" style={{ margin: "40px" }}>
      <h1 className="display-2">Login</h1>
      <form style={{ margin: "40px" }} onSubmit={handleLogin}>
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-6">
            <input
              type="email"
              className="form-control"
              id="inputEmail3"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-6">
            <input
              type="password"
              className="form-control"
              id="inputPassword3"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-success">
          Login
        </button>
      </form>
    </div>
  );
};
