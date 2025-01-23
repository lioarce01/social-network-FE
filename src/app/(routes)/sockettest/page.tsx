"use client";

import { useEffect, useState } from "react";
import { io, type Socket } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SocketTest() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    // Create socket connection
    const socketInstance = io("http://localhost:4000", {
      transports: ["websocket", "polling"],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Connection event handlers
    socketInstance.on("connect", () => {
      console.log("Connected to server");
      setConnected(true);
      setMessages((prev) => [...prev, "Connected to server"]);
    });

    socketInstance.on("disconnect", (reason) => {
      console.log("Disconnected:", reason);
      setConnected(false);
      setMessages((prev) => [...prev, `Disconnected: ${reason}`]);
    });

    socketInstance.on("connect_error", (error) => {
      console.log("Connection error:", error);
      setMessages((prev) => [...prev, `Connection error: ${error.message}`]);
    });

    socketInstance.on("test-event", (data) => {
      console.log("Received test event:", data);
      setMessages((prev) => [...prev, `Server: ${data.message}`]);
    });

    socketInstance.on("echo", (data) => {
      console.log("Received echo:", data);
      setMessages((prev) => [...prev, `Echo: ${data.message}`]);
    });

    setSocket(socketInstance);

    // Cleanup on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socket && message) {
      socket.emit("message", { text: message });
      setMessages((prev) => [...prev, `You: ${message}`]);
      setMessage("");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Socket.IO Test
          <span
            className={`h-3 w-3 rounded-full ${
              connected ? "bg-green-500" : "bg-red-500"
            }`}
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-[300px] overflow-y-auto border rounded-md p-4 space-y-2">
          {messages.map((msg, i) => (
            <div key={i} className="text-sm">
              {msg}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button onClick={sendMessage}>Send</Button>
        </div>
      </CardContent>
    </Card>
  );
}
