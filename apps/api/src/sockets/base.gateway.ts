import { WebSocketGateway, WebSocketServer, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket as IOSocket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { WsAuthGuard } from './guards/ws-auth.guard';

@WebSocketGateway({
  namespace: '/',
  cors: { origin: process.env.ALLOWED_ORIGIN, credentials: true },
  transports: ['websocket'],
  autoConnect: true,
})
@UseGuards(WsAuthGuard)
export class BaseGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(@ConnectedSocket() client: IOSocket) {
    console.log('Client connected', client.data.user);
  }

  handleDisconnect(@ConnectedSocket() client: IOSocket) {
    console.log('Client disconnected', client.data.user);
  }
}
