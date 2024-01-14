import "./App.css";
import React, { useState, useEffect } from "react";
import { Nav } from "./MyComponent/Nav";
import { Todos } from "./MyComponent/Todos";
import { Auth } from "./Authentication/Auth";
import { MessageConsumer } from "./Messanger/MessageConsumer";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const [username, setUserName] = useState("");
  const [myToDos, setMyToDos] = useState([]);
  const [myChatHistory, setMyChatHistory] = useState([]);
  const API_BASE_URL = "https://icr7.in";
  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      fetch(`${API_BASE_URL}/toDoApi/getUserToDos`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            setUserName(localStorage.getItem("userName"));
            return response.json();
          } else {
            alert("Token Expired Please login again");
            localStorage.removeItem("jwtToken");
            setIsAuthenticated(false);
            return null;
          }
        })
        .then((data) => {
          setMyToDos(data);
          if (data) setIsAuthenticated(true);
          else setIsAuthenticated(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

      fetch(`${API_BASE_URL}/chat/history`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setMyChatHistory(data);
        });
    }
  }, [reloadData]);

  const handleSignOut = () => {
    localStorage.removeItem("jwtToken");
    setIsAuthenticated(false);
  };

  const handleUserName = (username) => {
    if (username) {
      localStorage.setItem("userName", username);
    } else {
      localStorage.removeItem("userName");
    }
    setUserName(username);
  };

  const handleToken = (jwt) => {
    if (jwt) {
      localStorage.setItem("jwtToken", jwt);
      setReloadData((prevReloadData) => !prevReloadData); // Toggle the value
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
          <Todos myToDos={myToDos} setMyToDos={setMyToDos} />
          <MessageConsumer
            myChatHistory={myChatHistory}
            setMyChatHistory={setMyChatHistory}
          />
        </div>
      ) : (
        <Auth getUserName={handleUserName} getToken={handleToken} />
      )}
    </div>
  );
}

export default App;
