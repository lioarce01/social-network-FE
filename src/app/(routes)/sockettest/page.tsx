"use client";
import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const WebSocketTest = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  // URL del servidor WebSocket
  const socketUrl = "http://localhost:4000";

  useEffect(() => {
    // Crear la conexión WebSocket
    const newSocket = io(socketUrl, {
      transports: ["websocket"], // Usar solo WebSocket
      reconnection: true, // Habilitar reconexión automática
      reconnectionAttempts: 5, // Número máximo de intentos de reconexión
      reconnectionDelay: 1000, // Tiempo entre intentos de reconexión (en ms)
    });

    // Manejar la conexión exitosa
    newSocket.on("connect", () => {
      console.log("Conectado al servidor WebSocket");
      setMessages((prev) => [...prev, "Conectado al servidor WebSocket"]);
    });

    // Manejar errores de conexión
    newSocket.on("connect_error", (error) => {
      console.error("Error de conexión WebSocket:", error);
      setMessages((prev) => [...prev, `Error de conexión: ${error.message}`]);
    });

    // Escuchar eventos personalizados desde el servidor
    newSocket.on("new-posts", (data: any) => {
      console.log("Evento 'new-posts' recibido:", data);
      setMessages((prev) => [...prev, `Nuevos posts: ${JSON.stringify(data)}`]);
    });

    // Manejar la desconexión
    newSocket.on("disconnect", (reason) => {
      console.log("Desconectado del servidor WebSocket:", reason);
      setMessages((prev) => [...prev, `Desconectado: ${reason}`]);
    });

    // Guardar la instancia del socket en el estado
    setSocket(newSocket);

    // Limpiar la conexión al desmontar el componente
    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Función para enviar un mensaje al servidor
  const sendMessage = () => {
    if (socket && inputValue.trim()) {
      socket.emit("test-message", inputValue); // Enviar un mensaje de prueba
      setInputValue("");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Prueba de WebSocket</h1>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "200px",
          overflowY: "scroll",
          marginBottom: "10px",
        }}
      >
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Escribe un mensaje"
        style={{ padding: "5px", marginRight: "10px" }}
      />
      <button onClick={sendMessage} style={{ padding: "5px 10px" }}>
        Enviar mensaje
      </button>
    </div>
  );
};

export default WebSocketTest;
