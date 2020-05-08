import { Injectable, Injector, ErrorHandler } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { config } from '../config/';
import { environment } from '../../environments/environment';
import { RequestHttp } from './../enum/list.enum';

@Injectable({
  providedIn: 'root'
})
export class HttpData {
  // private api: String = `${config.API_URL}`;
  private api: String = `${environment.api}`;

  constructor(
    public http: HttpClient,
    private router: Router,
    private injector: Injector
  ) { }

  messages: string[] = [];

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      if (!navigator.onLine) {
        // Handle offline error
        console.log('navegador offline');
      } else {
        // Handle Http Error (error.status === 403, 404...)
        if (
          error.status === 401 ||
          error.status === 403 ||
          error.status === 500
        ) {
          //        this.router.navigate(['home']);

          console.log(error.status);
        }
      }
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was:`,
        error
      );
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }

  /**
   * Returns a Request Http
   * @param {data} data send data request post, put
   * @param {string} method should get, post, put, delete
   * @param {string} url should request http://
   * @param {string} param it's optional
   * @returns {promise}  The result of operation: return promise
   */
  general(method: string, url: string, param?: string, data?: Object) {
    const parametros = param ? new HttpParams({ fromString: param }) : null;

    const options = {
      params: parametros,
      body: data
    };

    const urlSend = `${this.api}${url}`;

    return this.http.request(method, urlSend, options);
  }

  /* GET heroes whose name contains search term */
  select(url: string, data?: any) {
    let parametros = null;

    if (localStorage.getItem('token')) {
      parametros = data
        ? {
          params: new HttpParams({ fromString: data }),
          headers: new HttpHeaders()
            .set('Authorization', localStorage.getItem('token'))
            .set('Content-Type', 'application/json')
        }
        : {
          headers: new HttpHeaders()
            .set('Authorization', localStorage.getItem('token'))
            .set('Content-Type', 'application/json')
        };
    } else {
      parametros = data
        ? {
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
          params: new HttpParams({ fromString: data })
        }
        : {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
        };
    }

    return this.http
      .get(`${this.api}${url}`, parametros)
      .pipe(catchError(this.handleError));
  }

  /** POST: add to the database */
  insert(url: string, data?: any): Observable<{}> {
    let parametros = null;

    if (localStorage.getItem('token')) {
      parametros = data
        ? {
          params: new HttpParams({ fromString: data }),
          headers: new HttpHeaders()
            .set('Authorization', localStorage.getItem('token'))
            .set('Content-Type', 'application/json')
        }
        : {
          headers: new HttpHeaders()
            .set('Authorization', localStorage.getItem('token'))
            .set('Content-Type', 'application/json')
        };
    } else {
      parametros = data
        ? {
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
          params: new HttpParams({ fromString: data })
        }
        : {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
        };
    }

    return (
      this.http
        // .post(`${this.api}${url}`, data, {reportProgress: true, withCredentials: true})
        .post(`${this.api}${url}`, data, parametros)
        .pipe(catchError(this.handleError))
    );
  }

  /** UPDATE: delete  from the server */
  update(url: string, data?: any): Observable<{}> {
    let parametros = null;

    if (localStorage.getItem('token')) {
      parametros = data
        ? {
          params: new HttpParams({ fromString: data }),
          headers: new HttpHeaders()
            .set('Authorization', localStorage.getItem('token'))
            .set('Content-Type', 'application/json')
        }
        : {
          headers: new HttpHeaders()
            .set('Authorization', localStorage.getItem('token'))
            .set('Content-Type', 'application/json')
        };
    } else {
      parametros = data
        ? {
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
          params: new HttpParams({ fromString: data })
        }
        : {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
        };
    }

    return this.http
      .put(`${this.api}${url}`, data, parametros)
      .pipe(catchError(this.handleError));
  }

  /** DELETE: delete  from the server */
  delete(url: string, data?: any): Observable<{}> {

    let parametros = null;

    if (localStorage.getItem('token')) {
      parametros = data
        ? {
          params: new HttpParams({ fromString: data }),
          body: data,
          headers: new HttpHeaders()
            .set('Authorization', localStorage.getItem('token'))
            .set('Content-Type', 'application/json')
        }
        : {
          headers: new HttpHeaders()
            .set('Authorization', localStorage.getItem('token'))
            .set('Content-Type', 'application/json')
        };
    } else {
      parametros = data
        ? {
          params: new HttpParams({ fromString: data }),
          headers: new HttpHeaders().set('Content-Type', 'application/json')
        }
        : {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
        };
    }

    return this.http
      .delete(`${this.api}${url}`, data)
      .pipe(catchError(this.handleError));
  }




}
