import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { AppStateService } from './app-state.service';
import { LoadingService } from './loading.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private ls: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    //this.appStateService.setProductState({
      //status: 'LOADING',
    //});

    this.ls.showLoadingSpinner();

    let req = request.clone({
      headers: request.headers.set('Authorization', 'Bearer JWT_TOKEN')
    });

    return next.handle(req).pipe(
      finalize(() => {
        this.ls.hideLoadingSpinner();
      })
    );
  }
}