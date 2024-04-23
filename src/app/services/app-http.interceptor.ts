import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { AppStateService } from './app-state.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private appStateService: AppStateService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    this.appStateService.setProductState({
      status: 'LOADING',
    });

    let req = request.clone({
      headers: request.headers.set('Authorization', 'Bearer JWT_TOKEN')
    });

    return next.handle(req).pipe(
      finalize(() => {
        this.appStateService.setProductState({
          status: 'LOADED',
        });
      })
    );
  }
}