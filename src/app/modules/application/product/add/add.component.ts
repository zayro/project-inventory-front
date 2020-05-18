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
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent extends GeneralService implements OnInit {

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
  tipo_categoria;
  tipo_bodega;
  tipo_unidad;


  /**
   * Var about Edit
   */
  info;
  table;
  tableId;
  tableIdValue;


  constructor(
    injector: Injector
  ) {
    super(injector);

    this.table = 'producto';
    this.tableId = 'id';

    this.form = this.formBuild.group({
      nombre: ["", [Validators.required]],
      serial: ["0000", [Validators.required]],
      precio_compra: ["0", [Validators.required]],
      precio_venta: ["0", [Validators.required]],
      id_tipo_unidad: ["0", [Validators.required]],
      id_bodega: ["0", [Validators.required]],
      id_categoria: ["0", [Validators.required]],
      stock_emergencia: ["0", [Validators.required]],
      stock_alerta: ["0", [Validators.required]]
    });
  }

  http_tipo_bodega() {
    this.loading = true;
    // utiliza la peticion al api general
    //console.log('http_lptipoausentismo', `/${this.environments.prefix}/${this.environments.dataBase}/all/lptipoausentismo`)
    this.api
      .select(
        `/unsafe/inventario/all/bodega`
      )
      .subscribe(
        (response) => {
          this.loading = false;

          this.tipo_bodega = response.data;

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
  
  http_tipo_categoria() {
    this.loading = true;
    // utiliza la peticion al api general
    //console.log('http_lptipoausentismo', `/${this.environments.prefix}/${this.environments.dataBase}/all/lptipoausentismo`)
    this.api
      .select(
        `/unsafe/inventario/all/categoria`
      )
      .subscribe(
        (response) => {
          this.loading = false;

          this.tipo_categoria = response.data;

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

  http_tipo_unidad() {
    this.loading = true;
    // utiliza la peticion al api general
    //console.log('http_lptipoausentismo', `/${this.environments.prefix}/${this.environments.dataBase}/all/lptipoausentismo`)
    this.api
      .select(
        `/unsafe/inventario/all/tipo_unidad`
      )
      .subscribe(
        (response) => {
          this.loading = false;

          this.tipo_unidad = response.data;

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

  http_producto() {
    this.loading = true;
    // utiliza la peticion al api general
    //console.log('http_lptipoausentismo', `/${this.environments.prefix}/${this.environments.dataBase}/all/lptipoausentismo`)
    this.api
      .select(
        `/unsafe/inventario/filters/producto/id/1`
      )
      .subscribe(
        (response) => {
          this.loading = false;

          this.info = response.data[0];
          console.log("AddComponent -> http_producto -> this.info", this.info)

          this.tableIdValue =this.info.id;
          
          this.form.setValue({
            nombre: this.info.nombre,
            serial: this.info.serial,
            precio_compra: this.info.precio_compra,
            precio_venta: this.info.precio_venta,
            stock_emergencia: this.info.stock_emergencia,
            stock_alerta: this.info.stock_alerta,
            id_categoria: this.info.id_categoria,
            id_bodega: this.info.id_bodega,
            id_tipo_unidad: this.info.id_tipo_unidad

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

  save(){
    this.loading = true;
    // utiliza la peticion al api general
    //console.log('http_lptipoausentismo', `/${this.environments.prefix}/${this.environments.dataBase}/all/lptipoausentismo`)

    const send = {
      "insert": "producto",
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

  update(){
    this.loading = true;
    // utiliza la peticion al api general
    //console.log('http_lptipoausentismo', `/${this.environments.prefix}/${this.environments.dataBase}/all/lptipoausentismo`)

    const send = {
      "update": "producto",
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
    this.http_tipo_bodega();
    this.http_tipo_categoria();
    this.http_tipo_unidad();
    this.http_producto();
  }

}
