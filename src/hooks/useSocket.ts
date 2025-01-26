import { addPosts } from "@/redux/slices/postSlice";
import { AppDispatch } from "@/redux/store";
import { Post } from "@/types/Post";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { io, Socket } from "socket.io-client";

const useSocket = (
  url: string,
  setShowNewPostsButton: (value: boolean) => void,
) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const socket: Socket = io(url, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on("connect", () => {
      console.log("Conectado al servidor WebSocket");
    });

    socket.on("new-posts", (data: { posts: Post[]; totalCount: number }) => {
      console.log("Nuevos posts recibidos:", data);
      dispatch(addPosts(data.posts));
      setShowNewPostsButton(true);
    });

    socket.on("connect_error", (error) => {
      console.error("Error de conexión WebSocket:", error);
    });

    socket.on("disconnect", (reason) => {
      console.log("Desconectado del servidor WebSocket:", reason);
    });

    return () => {
      socket.disconnect();
    };
  }, [url, dispatch, setShowNewPostsButton]);
};

export default useSocket;
