import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() { }
  
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('currentUserToken');
    let updatedRequest = request;
    if (token != null) {
          updatedRequest = request.clone({
          headers: request.headers.set('Authorization', 'Bearer ' + token)
        });
    }

    return next.handle(updatedRequest).pipe();
  }
}
