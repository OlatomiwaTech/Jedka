import type { Server as SocketIOServer } from "socket.io";

export function registerSocketHandlers(io: SocketIOServer) {
  io.on("connection", (socket) => {
    socket.on("join-room", (roomId: string) => {
      socket.join(roomId);
    });

    socket.on("typing", (payload: { roomId: string; userId: string; isTyping: boolean }) => {
      socket.to(payload.roomId).emit("typing", payload);
    });

    socket.on("message:sent", (payload: { roomId: string; message: unknown }) => {
      socket.to(payload.roomId).emit("message:received", payload.message);
    });
  });
}
