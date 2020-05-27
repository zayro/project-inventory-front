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
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent extends GeneralService implements OnInit {

  /**
* INITIAL VAR
*/
  public form: FormGroup;
  public redirect: Boolean;
  public loading: Boolean = false;



  /**
   * Var about  Http Response
   */



  /**
   * Var about Edit
   */
  info;
  table = 'tercero';
  tableId = 'id';
  tableIdValue;


  constructor(
    injector: Injector
  ) {
    super(injector);

    this.form = this.formBuild.group({
      nombre: {value: null, disabled: true},
      identificacion: {value: null, disabled: true},
      email: ["0000", [Validators.required]],
      telefono: ["0", [Validators.required]],
      
    });
  }

  http_find(id) {
    this.loading = true;
    // utiliza la peticion al api general
    //console.log('http_lptipoausentismo', `/${this.environments.prefix}/${this.environments.dataBase}/all/lptipoausentismo`)
    this.api
      .select(
        `/unsafe/inventario/filters/view_cliente/id/${id}`
      )
      .subscribe(
        (response) => {
          this.loading = false;

          this.info = response.data[0];
          console.log("AddComponent -> http_producto -> this.info", this.info)

          this.tableIdValue =this.info.id;
          
          this.form.setValue({
            nombre: this.info.nombre,
            email: this.info.email,
            telefono: this.info.telefono,
            identificacion: this.info.identificacion
          });

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

  update() {
    this.loading = true;
    // utiliza la peticion al api general
    //console.log('http_lptipoausentismo', `/${this.environments.prefix}/${this.environments.dataBase}/all/lptipoausentismo`)

    const send = {
      "update": "tercero",
      "set": this.form.value,
      "where": { "id": this.tableIdValue }
    };

    this.api
      .update(
        `/unsafe/inventario/edit`,
        send
      )
      .subscribe(
        (response) => {

          this.loading = false;

          if(response.success){

            this.alert("Proceso exitoso  ", "Restornar a la lista", "success");            
            this.router.navigate(['customer/']);
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

  Redirect(): void {
    // this.message = info.id + ' - ' + info.firstName;
    //console.log(info);
    this.router.navigate(['customer/']);
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tableIdValue = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
   });
    this.http_find(this.tableIdValue);
   }


}
