import React, { useState, useEffect } from "react";
import { ChatBox } from "./ChatBox";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

export const MessageConsumer = ({ myChatHistory, setMyChatHistory }) => {
  const [stompClient, setStompClient] = useState(null);
  const from = localStorage.getItem("userName");
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
    <ChatBox
      myChatHistory={myChatHistory}
      publishMessage={handlePublishMessage}
    />
  );
};
