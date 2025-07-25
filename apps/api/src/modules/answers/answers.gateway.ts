import { ConnectedSocket, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { createGatewayConfig } from '@sockets/config/gateway.config';
import { NAMESPACES, SOCKET_EVENTS } from '@sockets/sockets.constants';
import { Socket } from 'socket.io';
import { CreateAnswer } from './answers.types';

@WebSocketGateway(createGatewayConfig(NAMESPACES.ANSWERS))
export class AnswersGateway {
  @SubscribeMessage(SOCKET_EVENTS.JOIN_QUESTION)
  handleJoinQuestion(@ConnectedSocket() client: Socket, roomId: string) {
    client.join(roomId);
  }

  @SubscribeMessage(SOCKET_EVENTS.ANSWER_CREATED)
  handlebroadcastAnswer(@ConnectedSocket() client: Socket, payload: CreateAnswer, roomId: string) {
    client.to(roomId).emit(SOCKET_EVENTS.ANSWER_CREATED, payload);
  }
}
