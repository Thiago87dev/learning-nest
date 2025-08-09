/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const now = Date.now();

    console.log('[INTERCEPTOR]: Mostrando user da requisição que foi criado pelo middleware:');

    console.log(request['user']);
    
    console.log(`[INTERCEPTOR REQUEST] ${method} ${url} - Inicio da req`);

    return next.handle().pipe(
      tap(() => {
        console.log(`[INTERCEPTOR RESPONSE] ${method} ${url} - ${Date.now() - now}ms`);
      }),
    );
  }
}
