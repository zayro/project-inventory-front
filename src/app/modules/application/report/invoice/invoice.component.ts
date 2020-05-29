import { Component, OnInit, Injector } from "@angular/core";
//import { MatSnackBar } from '@angular/material';
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
  FormGroupDirective,
  NgForm,
} from "@angular/forms";

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

// import Services
import * as service from "../../../../services/index";
import { GeneralService } from "../../../../services/general.service";
import { IvyParser } from '@angular/compiler';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent   extends GeneralService implements OnInit {

  /**
* INITIAL VAR
*/
  public form: FormGroup;
  public redirect: Boolean;
  public loading: Boolean = false;
  public mySet = new Set()
  public myMap = new Map()


  constructor(
    injector: Injector
  ) {
    super(injector);


  }

  http_maestro() {
    this.loading = true;
    // utiliza la peticion al api general
    //console.log('http_lptipoausentismo', `/${this.environments.prefix}/${this.environments.dataBase}/all/lptipoausentismo`)
    this.api
      .select(
        `/${this.environments.prefix}/${this.environments.db}/all/movimientos_encabezados/`
      )
      .subscribe(
        (response) => {
          this.loading = false;          


        },
        err => {
          this.loading = false;
          console.error("Error occured.", err);
          this.snackBar.open(
            `Ocurrio un Error: http_lptipoausentismo`,
            "Cerrar",
            {
              duration: 3000
            }
          );
        }
      );
  }



  Redirect(): void {
    // this.message = info.id + ' - ' + info.firstName;
    //console.log(info);
    this.router.navigate(['report/']);
  }


  ngOnInit(): void {
    this.http_maestro();
   }


}
