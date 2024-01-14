import React, { useState } from "react";
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  TextField,
  Button,
  Avatar,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export const ChatBox = ({ myChatHistory, publishMessage }) => {
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

    // Update the chat history
    publishMessage(inputMessage, receiver);

    // Clear the input fields
    setInputMessage("");
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Card>
        <CardHeader title="Chats" />
        <CardContent style={{ maxHeight: "300px", overflowY: "auto" }}>
          <List>
            {myChatHistory.map((message) => (
              <ListItem key={message.messageId} alignItems="flex-start">
                <Avatar>{message.from[0]}</Avatar>
                <div style={{ marginLeft: "10px" }}>
                  <strong>{message.from}:</strong> {message.content}
                </div>
              </ListItem>
            ))}
          </List>
        </CardContent>
        <form
          onSubmit={handleMessageSend}
          style={{ padding: "16px", borderTop: "1px solid #ccc" }}
        >
          <TextField
            label="To"
            variant="outlined"
            fullWidth
            margin="normal"
            value={receiver}
            onChange={handleReceiverChange}
          />
          <TextField
            label="Message"
            variant="outlined"
            multiline
            rows={3}
            fullWidth
            margin="normal"
            value={inputMessage}
            onChange={handleInputMessageChange}
            InputProps={{
              endAdornment: (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  endIcon={<SendIcon />}
                >
                  Send
                </Button>
              ),
            }}
          />
        </form>
      </Card>
    </Container>
  );
};
