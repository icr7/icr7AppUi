import React, { useState, useEffect } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { ChatSender } from "./ChatSender";

export const MessageConsumer = ({ myChatHistory, setMyChatHistory }) => {
  const [newEmail, setNewEmail] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const from = localStorage.getItem("userName");

  const handleNewEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!newEmail) {
      alert("Please enter email");
      return;
    } else {
      const messageObject = {
        messageId: 999999,
        content: "",
        to: from,
        from: newEmail,
      };

      setMyChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        messageObject,
      ]);
      console.log("added : ", messageObject);
      setNewEmail("");
    }
  };

  useEffect(() => {
    const socket = new SockJS("https://icr7.in/web-socket");
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, function (frame) {
      setStompClient(stompClient);
      stompClient.subscribe("/topic/" + from + "/messages", function (message) {
        console.log("messege aya : ", message.body);
        const receivedMessage = JSON.parse(message.body);

        // Check if the received message is not already in the chat history
        if (
          !myChatHistory.some(
            (msg) => msg.messageId === receivedMessage.messageId
          )
        ) {
          console.log("Message received: ", receivedMessage);
          setMyChatHistory((prevChatHistory) => [
            ...prevChatHistory,
            receivedMessage,
          ]);
        }
      });
    });

    return () => {
      socket.close();
    };
  }, []);

  const handlePublishMessage = (message, receiver) => {
    if (stompClient) {
      try {
        const messageObject = {
          content: message,
          to: receiver,
          from: from,
        };
        stompClient.send("/app/publish", {}, JSON.stringify(messageObject));
        setMyChatHistory([...myChatHistory, messageObject]);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };
  return (
    <>
      <div className="m-4 mb-8">
        <form className="flex flex-col lg:flex-row items-start lg:items-center bg-gray-100 p-4 rounded-md shadow-md">
          <div className="flex-1 lg:w-2/3 lg:mr-3">
            <label className="sr-only" htmlFor="inlineFormInputGroupUsername">
              User Email
            </label>
            <div className="flex items-center bg-white rounded-md overflow-hidden">
              <div className="bg-gray-200 text-gray-800 p-3 rounded-l-md">
                Add Contact
              </div>
              <input
                type="text"
                className="flex-1 px-4 py-2 bg-white focus:outline-none w-36 sm:w-48 md:w-64"
                id="inlineFormInputGroupUsername"
                placeholder="Enter user email"
                value={newEmail}
                onChange={handleNewEmailChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition duration-300 lg:w-auto"
          >
            Add to Chat
          </button>
        </form>
      </div>

      <ChatSender
        myChatHistory={myChatHistory}
        publishMessage={handlePublishMessage}
      />
    </>
  );
};
