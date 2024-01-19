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

    getUserName(email);
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
      <p className="mt-2 text-center text-sm text-gray-600">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          type="button"
          className={
            isSignUp
              ? "text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              : "text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          }
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? "Login" : "Sign Up"}
        </button>
      </p>
    </div>
  );
};
