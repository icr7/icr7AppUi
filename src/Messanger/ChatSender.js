import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { ChatBox } from "./ChatBox";

const avatarColors = ["#007BFF", "#28A745", "#DC3545", "#FFC107", "#6C757D"];

export const ChatSender = ({ myChatHistory, publishMessage }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [latestMessages, setLatestMessages] = useState([]);

  const handleCardClick = (user) => {
    setSelectedUser(user);
  };

  useEffect(() => {
    // Filter out the messages from the current user
    const otherUserMessages = myChatHistory.filter(
      (message) => message.from !== localStorage.getItem("userName")
    );
    // Create a map to group messages by sender's email
    const groupedMessages = otherUserMessages.reduce((acc, message) => {
      const key = message.from;
      if (!acc[key] || message.messageId > acc[key].messageId) {
        acc[key] = message;
      }
      return acc;
    }, {});

    // Convert the grouped messages map to an array and sort by messageId in descending order
    setLatestMessages(
      Object.values(groupedMessages).sort((a, b) => b.messageId - a.messageId)
    );
  }, [myChatHistory]);

  return (
    <div className="flex justify-start m-4 mb-8 border border-gray-800 overflow-y-scroll h-[60vh]">
      <ul
        role="list"
        className="w-96 divide-y divide-gray-100 overflow-y-auto max-h-full"
      >
        {latestMessages.map((message, index) => (
          <li
            key={message.messageId}
            className={`py-3 cursor-pointer ${
              selectedUser === message.from
                ? "bg-blue-100"
                : "hover:bg-gray-100"
            }`}
            onClick={() => handleCardClick(message.from)}
          >
            <div className="h-20 p-4 rounded cursor-pointer flex items-center justify-between ">
              <div className="flex items-center gap-x-4">
                <Avatar
                  size="48"
                  round={true}
                  name={message.from}
                  color={avatarColors[index % avatarColors.length]}
                  fgColor="#fff"
                  className="flex-none"
                />
                <div className="min-w-0">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {message.from}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {message.content}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {selectedUser && (
        <ChatBox
          myChatHistory={myChatHistory}
          publishMessage={publishMessage}
          selectedUser={selectedUser}
        />
      )}
    </div>
  );
};
