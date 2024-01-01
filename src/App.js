import "./App.css";
import React, { useState, useEffect } from "react";
import { Nav } from "./MyComponent/Nav";
import { Todos } from "./MyComponent/Todos";
import { Auth } from "./Authentication/Auth";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for JWT token during initial render
    setIsAuthenticated(!!localStorage.getItem("jwtToken"));
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("jwtToken");
    setIsAuthenticated(false);
  };

  const handleToken = (jwt) => {
    localStorage.setItem("jwtToken", jwt);
    setIsAuthenticated(!!jwt);
  };

  return (
    <div className="App">
      {/* Conditional rendering based on isAuthenticated */}
      {isAuthenticated ? (
        <div>
          <Nav onSignOut={handleSignOut} />
          <Todos />
        </div>
      ) : (
        <Auth getToken={handleToken} />
      )}
    </div>
  );
}

export default App;
