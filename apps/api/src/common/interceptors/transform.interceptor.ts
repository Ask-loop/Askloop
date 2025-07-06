import { MESSAGE_KEY } from '@common/decorators/message.decorator';
import { IApiResponse } from '@common/interfaces/response.interface';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, IApiResponse<T>> {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<IApiResponse<T>> {
    const message = this.reflector.get<string>(MESSAGE_KEY, context.getHandler());

    return next.handle().pipe(
      map(data => ({
        data: data,
        success: true,
        message: message || 'success',
        timestamp: new Date().toISOString(),
        statusCode: context.switchToHttp().getResponse().statusCode,
      })),
    );
  }
}
