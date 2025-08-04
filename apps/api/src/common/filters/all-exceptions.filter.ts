import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { type HttpAdapterHost } from '@nestjs/core';
import { Response, Request } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception instanceof HttpException ? exception.getResponse() : 'Internal server error';

    const errorMessage = typeof message === 'object' ? (message as { message: string }).message || message : message || 'Internal server error';

    const response = {
      success: false,
      message: errorMessage,
      timestamp: new Date().toISOString(),
      path: request.url,
      data: null,
    };

    httpAdapter.reply(ctx.getResponse(), response, status);
  }
}
