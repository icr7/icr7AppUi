import "./App.css";
import React, { useState, useEffect } from "react";
import { Nav } from "./MyComponent/Nav";
import { Todos } from "./MyComponent/Todos";
import { Auth } from "./Authentication/Auth";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUserName] = useState("");

  useEffect(() => {
    // Check for JWT token during initial render
    setIsAuthenticated(!!localStorage.getItem("jwtToken"));
    setUserName(localStorage.getItem("userName"));
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("jwtToken");
    setIsAuthenticated(false);
  };

  const handleUserName = (username) => {
    if (username) {
      console.log("username set ho gya");
      localStorage.setItem("userName", username);
    } else {
      localStorage.removeItem("userName");
    }
    setUserName(username);
  };

  const handleToken = (jwt) => {
    if (jwt) {
      console.log("jwt set ho gyi");
      localStorage.setItem("jwtToken", jwt);
    } else {
      localStorage.removeItem("jwtToken");
    }
    setIsAuthenticated(!!jwt);
  };

  return (
    <div className="App">
      {/* Conditional rendering based on isAuthenticated */}
      {isAuthenticated ? (
        <div>
          <Nav navUserName={username} onSignOut={handleSignOut} />
          <Todos />
        </div>
      ) : (
        <Auth getUserName={handleUserName} getToken={handleToken} />
      )}
    </div>
  );
}

export default App;
