import React, { useState } from "react";

export const ChatBox = ({ receivedMessage, publishMessage }) => {
  const [inputMessage, setInputMessage] = useState("");
  const [receiver, setReceiver] = useState("");

  const handleInputMessageChange = (e) => {
    setInputMessage(e.target.value);
  };
  const handleReceiverChange = (e) => {
    setReceiver(e.target.value);
  };

  const handleMessageSend = (e) => {
    e.preventDefault();
    // Validate input fields
    if (!inputMessage || !receiver) {
      alert("Please fill Message");
      return;
    }

    // Update the todo list
    publishMessage(inputMessage, receiver);

    // Clear the input fields
    setInputMessage("");
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">Latest Message</div>
        <div className="card-body">{receivedMessage}</div>
      </div>

      <form onSubmit={handleMessageSend} className="mt-3">
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            to
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={receiver}
            onChange={handleReceiverChange}
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            id="messageInput"
            rows="10" // Adjust the number of rows as needed
            placeholder="Enter your message here..."
            aria-describedby="msgHelp"
            value={inputMessage}
            onChange={handleInputMessageChange}
          />
          <div id="msgHelp" className="form-text">
            End to end encrypted message
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </form>
    </div>
  );
};
