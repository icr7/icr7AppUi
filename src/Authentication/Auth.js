import { Login } from "./Login";
const AUTH_BASE_URL = "https://icr7.in/auth";

export const Auth = ({ onSignIn }) => {
  const handleSignIn = (email, password) => {
    const todoUser = {
      email: email,
      password: password,
      role: "user",
    };

    fetch(`${AUTH_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoUser),
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Authentication failed:", response.statusText);
          return null; // Set jwt to null if the response is not okay
        }
        return response.text();
      })
      .then((jwt) => {
        console.log("auth jwt token -> ", jwt);
        onSignIn(jwt);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  return <Login onSignIn={handleSignIn} />;
};
