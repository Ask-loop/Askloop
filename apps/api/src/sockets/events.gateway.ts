import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  BaseWsExceptionFilter,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket as IOSocket } from 'socket.io';
import { UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { WsAuthGuard } from './guards/ws-auth.guard';
import { AnswersService } from '../modules/answers/answers.service';
import { NAMESPACES, SOCKET_EVENTS } from './sockets.constants';

@WebSocketGateway({
  namespace: '/events',
  cors: { origin: process.env.ALLOWED_ORIGIN, credentials: true },
  transports: ['websocket'],
  autoConnect: true,
})
@UseFilters(new BaseWsExceptionFilter())
@UseGuards(WsAuthGuard)
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly answersService: AnswersService) {}

  afterInit(server: Server) {}

  handleConnection(client: IOSocket) {
    console.log('Client connected', client.data.user);
  }

  handleDisconnect(client: IOSocket) {
    console.log('Client disconnected', client.data.user);
  }

  @SubscribeMessage(SOCKET_EVENTS.JOIN_QUESTION)
  handleJoinQuestion(@ConnectedSocket() client: IOSocket, @MessageBody() questionId: number) {
    client.join(`question_${questionId}`);

    console.log(`Client joined question ${questionId}`);
  }

  @SubscribeMessage(SOCKET_EVENTS.CREATE_ANSWER)
  async handleCreateAnswer(@ConnectedSocket() client: IOSocket, @MessageBody() data: { questionId: number; content: string }) {
    const user = client.data.user;

    const answer = await this.answersService.createAnswer({ questionId: data.questionId, userId: user.id, content: data.content });

    this.server.to(`question_${data.questionId}`).emit(SOCKET_EVENTS.ANSWER_CREATED, answer);

    return answer;
  }
}
