import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpMiddleware  implements HttpInterceptor  {

  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('interceptando peticiones', req);

    if (localStorage.getItem('token')) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', localStorage.getItem('token'))
    });
    return next.handle(authReq);
    }

  }


}
