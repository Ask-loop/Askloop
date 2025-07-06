import { IApiResponse } from '@common/interfaces/response.interface';

export function successResponse<T>(data: T, message?: string): IApiResponse<T> {
  return {
    success: true,
    data,
    message,
  };
}
