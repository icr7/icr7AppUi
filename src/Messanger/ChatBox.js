import React, { useState, useEffect, useRef, useMemo } from "react";

export const ChatBox = ({ myChatHistory, publishMessage, selectedUser }) => {
  const [newMessage, setNewMessage] = useState("");
  const chatContainerRef = useRef(null);

  const getUserMessages = () => {
    return myChatHistory.filter(
      (message) => message.from === selectedUser || message.to === selectedUser
    );
  };

  const userMessages = useMemo(
    () => getUserMessages(),
    [myChatHistory, selectedUser]
  );

  const handlePublishMessage = () => {
    if (newMessage.trim() !== "") {
      publishMessage(newMessage, selectedUser);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handlePublishMessage();
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [userMessages]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, []); // Empty dependency array means this effect runs only once after mount

  return (
    <div className="flex-1 flex flex-col bg-gray-100 p-4">
      <div className="flex-1 overflow-y-auto" ref={chatContainerRef}>
        {userMessages.map((message) => (
          <div
            key={message.messageId}
            className={`flex mb-3 flex-wrap ${
              message.from === selectedUser ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`${
                message.from === selectedUser
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } p-2 rounded-lg max-w-[90%]`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center mt-2">
        <input
          type="text"
          className="flex-1 border p-2 rounded"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          className="ml-2 bg-blue-500 text-white p-2 rounded"
          onClick={handlePublishMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};
