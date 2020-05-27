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
//import { IvyParser } from '@angular/compiler';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss']
})
export class AddSupplierComponent  extends GeneralService implements OnInit {

  /**
 * INITIAL VAR
 */
public form: FormGroup;
public redirect: Boolean;
public loading: Boolean = false;
public mySet = new Set()
public myMap = new Map()


  /**
   * Var about  Http Response
   */
private table;
private tableId;



  constructor(
    injector: Injector
  ) {
    super(injector);

    this.table = 'producto';
    this.tableId = 'id';

    this.form = this.formBuild.group({
      nombre: ["", [Validators.required]],
      identificacion: ["0000", [Validators.required]],
      email: ["0000", [Validators.required]],
      telefono: ["0", [Validators.required]],
      id_tipo_tercero: ["2", [Validators.required]],
    });
  }

  Redirect(): void {
    // this.message = info.id + ' - ' + info.firstName;
    //console.log(info);
    this.router.navigate(['supplier']);
  }



  save(){
    this.loading = true;
    // utiliza la peticion al api general
    //console.log('http_lptipoausentismo', `/${this.environments.prefix}/${this.environments.dataBase}/all/lptipoausentismo`)

    const send = {
      "insert": "tercero",
      "values": [this.form.value],
      "increment": "id"
    };

    this.api
      .insert(
        `/unsafe/inventario/create`,
        send
      )
      .subscribe(
        (response) => {
          this.loading = false;

          if(response.success){

            this.alert("Proceso exitoso  ", "Restornar a la lista", "success");            
            this.router.navigate(['supplier/']);

          }


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


  ngOnInit(): void {


  }

}
