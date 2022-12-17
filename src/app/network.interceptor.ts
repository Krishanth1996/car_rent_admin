import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, finalize, Observable } from 'rxjs';
import { LoadingService } from './services/loading.service';

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {

  constructor(private loader:LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loader.show();
    const sessionToken = sessionStorage.getItem("sessionToken");
    if (sessionToken) {
      const cloned = request.clone({
          headers: request.headers.set("Authorization",
              "Bearer " + sessionToken)
      });

      // return next.handle(cloned);
      return next.handle(cloned).pipe(
        finalize( ()=>{
          this.loader.hide()
        })
      );
  }
  else {
      // return next.handle(request);
      return next.handle(request).pipe(
        finalize( ()=>{
          this.loader.hide()
        })
      );
  }
  }
}
