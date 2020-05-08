import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AuthErrorHandler implements ErrorHandler {

  constructor(private injector: Injector, private router: Router) {}

  handleError(error) {

    throw error;
  }

//   handleError(error: Error | HttpErrorResponse) {
//     if (error instanceof HttpErrorResponse) {
//        // Server or connection error happened
//        if (!navigator.onLine) {
//          // Handle offline error
//          console.log('navegador offline');
//        } else {
//          // Handle Http Error (error.status === 403, 404...)
//          if (error.status === 401 || error.status === 403 || error.status === 500) {
//           //this.router.navigate(['/login']);
//         }
//        }
//     } else {
//       // Handle Client Error (Angular Error, ReferenceError...)
//     }
//    // Log the error anyway
//    console.error('It happens: ', error);
//  }

}
