import { BrowserModule, DomSanitizer } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// import Modules
import { applicationModule } from "./modules/application/application.module";
import { AuthModule } from "./modules/auth/auth.module";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from "@angular/common/http";

import { MaterialModule } from './material-module';

import { MatIconRegistry } from "@angular/material/icon";
import { MatSnackBar } from "@angular/material/snack-bar";


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Import your AvatarModule
import { AvatarModule } from "ngx-avatar";

import "jquery";

import "bootstrap";

import 'datatables.net-dt';
import 'datatables.net-buttons-dt';

//import 'jszip';
import 'pdfmake';

import 'sweetalert';

import 'select2';

// import Services
import * as service from "./services/index";

import { APP_BASE_HREF } from "@angular/common";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // Http
    HttpClientModule,
    // Form
    FormsModule,
    ReactiveFormsModule,
    // Specify AvatarModule as an import
    AvatarModule,
    // Modules
    AuthModule,
    applicationModule,
    // Routes
    AppRoutingModule,
  ],
  providers: [
    service.AuthguardGuard,
    { provide: APP_BASE_HREF, useValue: window["_app_base"] || "/" },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/svg/mdi.svg')); // Or whatever path you placed mdi.svg at
    //setTheme('bs4'); // or 'bs3'

  }
}
