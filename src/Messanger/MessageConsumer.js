import React, { useState, useEffect } from "react";
import { ChatBox } from "./ChatBox";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

export const MessageConsumer = () => {
  const [receivedMessage, setReceivedMessage] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const [publishMessage, setPublishMessage] = useState("");
  const from = localStorage.getItem("userName");
  useEffect(() => {
    const socket = new SockJS("http://icr7.in/web-socket");
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, function (frame) {
      console.log("Connected: " + frame);
      setStompClient(stompClient);
      stompClient.subscribe("/topic/" + from + "/messages", function (message) {
        console.log("message: ", message);
        console.log("message body: ", message.body);
        setReceivedMessage(message.body);
      });
    });

    return () => {
      socket.close();
    };
  }, []);

  const handlePublishMessage = (message, receiver) => {
    console.log("my message is: ", message);
    setPublishMessage(message);

    if (stompClient) {
      try {
        const messageObject = {
          content: message,
          to: receiver,
          from: from,
        };
        stompClient.send("/app/publish", {}, JSON.stringify(messageObject));
        setPublishMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };
  return (
    <ChatBox
      receivedMessage={receivedMessage}
      publishMessage={handlePublishMessage}
    />
  );
};
