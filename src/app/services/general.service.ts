import { Observable } from 'rxjs';
import { Injectable, Injector } from '@angular/core';

import {
  ChangeDetectorRef,
} from '@angular/core';


import {
  ActivatedRoute,
  Router,
  NavigationStart,
  NavigationError,
  NavigationEnd
} from '@angular/router';


import {
  FormGroup,
  FormBuilder
} from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

import { DomSanitizer } from '@angular/platform-browser';

// Servicio
import { HttpData } from './http-data.service';

// Variables de Entorno
import { environment } from '../../environments/environment';

import { JwtService } from './jwt.service';

import { StateService } from '../store/RxJS/state.service';

import { TranslateService } from './translate.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  public renderer;
  public route;
  public router;
  public dialog;
  public snackBar;
  public sanitizer;
  public translate;
  public ref;
  public api;
  public jwt;
  public StateService;
  public form: FormGroup;
  public formBuild: FormBuilder;
  public environments = environment;

  constructor(
    injector: Injector
  ) {
    this.route = injector.get(ActivatedRoute);
    this.router = injector.get(Router);
    this.formBuild = injector.get(FormBuilder);
    this.snackBar = injector.get(MatSnackBar);
    this.sanitizer = injector.get(DomSanitizer);
    this.ref = injector.get(ChangeDetectorRef);
    this.api = injector.get(HttpData);
    this.api = injector.get(HttpData);
    this.jwt = injector.get(JwtService);
    this.StateService = injector.get(StateService);
    this.translate = injector.get(TranslateService);    
  }

}
