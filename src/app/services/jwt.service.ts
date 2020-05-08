import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class JwtService {
  /**
   * Obtine el token almacenado
   */
  getToken(): string {
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    } else {
      return null;
    }
  }

  /**
   * Almacena el token almacenado
   */
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  /**
   * Valida el tiempo del token almacenado
   */
  getTokenExpirationDate(): Date {
    if (this.getToken() === null) {
      return null;
    } else {
      const decoded = jwt_decode(this.getToken());

      if (decoded.exp === undefined) {
        return null;
      }

      const date = new Date(0);
      date.setUTCSeconds(decoded.exp);
      return date;
    }
  }

  /**
   * Valida el token almacenado
   */
  isTokenExpired(): boolean {
    const date = this.getTokenExpirationDate();
    if (date === null) {
      return true;
    } else {
      if (date === undefined) {
        return true;
      }
      return !(date.valueOf() > new Date().valueOf());
    }
  }
}
