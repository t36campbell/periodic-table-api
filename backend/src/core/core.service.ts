import { Injectable, ExecutionContext } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { HttpRequest } from './core.model';

@Injectable()
export class CoreService {
  constructor() {}

  private async httpContext(context: ExecutionContext): Promise<HttpArgumentsHost> {
    return context.switchToHttp()
  }
  
  async getRequest<T>(context: ExecutionContext): Promise<HttpRequest<T>> {
    // check returned object to update http request type
    const ctx = await this.httpContext(context)
    return ctx.getRequest<HttpRequest<T>>();
  }
  
  async getResponse<T>(context: ExecutionContext): Promise<T> {
    const ctx = await this.httpContext(context)
    return ctx.getResponse<T>();
  }
  
  async getNext<T>(context: ExecutionContext): Promise<T> {
    const ctx = await this.httpContext(context)
    return ctx.getNext<T>();
  }
}
