import { WebSocketGateway, WebSocketServer, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket as IOSocket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { WsAuthGuard } from './guards/ws-auth.guard';
import { createGatewayConfig } from './config/gateway.config';
import { NAMESPACES } from './sockets.constants';

// Base gateway for handling WebSocket connections
@WebSocketGateway(createGatewayConfig(NAMESPACES.ROOT))
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
