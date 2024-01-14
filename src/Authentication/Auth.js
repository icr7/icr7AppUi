import React, { useState } from "react";
import { AuthForm } from "./AuthForm";

const AUTH_BASE_URL = "https://icr7.in/auth";

export const Auth = ({ getUserName, getToken }) => {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuthForm = (email, password) => {
    const todoUser = {
      email: email,
      password: password,
      role: "user",
    };
    const parts = email.split("@");
    const username = parts[0];
    getUserName(username);
    fetch(`${AUTH_BASE_URL}/${isSignUp ? "signUp" : "login"}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoUser),
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Authentication failed:", response.statusText);
          window.alert("Authentication failed. Please check your credentials.");
          return null;
        }
        return response.text();
      })
      .then((jwt) => {
        getToken(jwt);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div>
      <AuthForm onAuthFormSubmit={handleAuthForm} isSignUp={isSignUp} />
      <p>
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <button onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? "Login" : "Sign Up"}
        </button>
      </p>
    </div>
  );
};
