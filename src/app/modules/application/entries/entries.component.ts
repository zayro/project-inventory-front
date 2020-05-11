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
import * as service from "../../../services/index";
import { GeneralService } from "../../../services/general.service";
import { IvyParser } from '@angular/compiler';


@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss']
})
export class EntriesComponent extends GeneralService implements OnInit {

	/**
	 * INITIAL VAR
	 */
  public form: FormGroup;
  public redirect: Boolean;
  public loading: Boolean = false;
  public mySet = new Set()
  public myMap = new Map()

  /**
   * Form
   */
  id_tipo_tercero;

  tipo_pago: any[];
  tipo_comprobante;
  tercero: any[];

  subtotal;
  descuento = new FormControl('0');
  iva = new FormControl('0');
  total;
  valorNeto = 0;

  private table: string;

  // @ts-ignore

  detallen = {
    serial: 'new',
    nombre: 'ewn',
    cantidad: 0,
    valor: 0
  };

  detalle = [];


  constructor(
    injector: Injector
  ) {
    super(injector);

    this.table = this.environments.module.login.view;

    this.form = this.formBuild.group({
      id_tipo_pago: ["", [Validators.required]],
      id_tipo_tercero: ["", [Validators.required]],
      iva: ["", [Validators.required]],
      descuento: ["", [Validators.required]]


    });


    this.translate.setTranslate('es');

    $(document).on("keypress", 'form', function (e) {
      var code = e.keyCode || e.which;
      if (code == 13) {
          e.preventDefault();
          return false;
      }
    });


  }

  add(data){
  console.log("EntriesComponent -> add -> add", data)

  
   this.detalle.push(data);
   //this.detalle = [...new Set(this.detalle)];
   //this.detalle = Array.from(new Set(this.detalle));

    this.detalle = [...new Map(this.detalle.map(item => [item.serial, item])).values()];

    if(this.detalle.length == 1){             

      const objIndex = this.detalle.findIndex((obj => obj.serial == data.serial));      
      this.detalle[objIndex].total =  this.detalle[objIndex].cantidad  * this.detalle[objIndex].precio_venta;
      
      this.subtotal = this.detalle[objIndex].total;         
      this.valorNeto = this.subtotal + (this.subtotal * (this.iva.value  / 100));
      this.valorNeto = this.valorNeto - this.descuento.value;

    } else {

      this.subtotal = this.detalle.reduce((a, b) => (a.total + b.total));
      this.valorNeto = this.subtotal + (this.subtotal * (this.iva.value  / 100));
      this.valorNeto = this.valorNeto - this.descuento.value;


    }

  }

  edit(data, field, event){

    console.log(event.target.value)
    console.log(field)


    const objIndex = this.detalle.findIndex((obj => obj.serial == data.serial));

    this.detalle[objIndex][field] = event.target.value;
    this.detalle[objIndex].total =  this.detalle[objIndex].cantidad  * this.detalle[objIndex].precio_venta;

    /*
    console.log(this.detalle.reduce(function(valorAnterior, valorActual, indice, vector){
      return valorAnterior + valorActual;
    }));
    */


    //console.log(this.detalle.reduce((a, b) => ({x: a.total + b.total})));
    
    this.subtotal = this.detalle.reduce((a, b) => (a.total + b.total));
    //this.valorNeto = this.subtotal + (this.subtotal * (this.iva.value  / 100));
    this.valorNeto = this.subtotal + (this.subtotal * (this.form.get("iva").value  / 100))
    this.valorNeto = this.valorNeto - this.descuento.value;


    /*
    const result = this.detalle.filter(user => {
      if(user[key] == value) {
        return  user[key] = newValue;
      }
   });
   */

  }


  PutIva(){   

    console.log('update iva', this.form.get("iva").value);

    //this.valorNeto = this.subtotal + (this.subtotal * (this.iva.value  / 100))
    this.valorNeto = this.subtotal + (this.subtotal * (this.form.get("iva").value  / 100))   

  }

  PutDiscount(){ 

    console.log('update PutDiscount', this.form.get("descuento").value);

    //this.valorNeto = this.valorNeto - this.descuento.value;
    this.valorNeto = this.valorNeto - this.form.get("descuento").value;

  }

  delete(data){

    console.log(this.detalle.length);
    
    this.detalle = this.detalle.filter(item => item.serial !== data.serial)

    console.log(this.detalle.length);

    if(this.detalle.length == 0){    

      this.subtotal = 0;
      this.valorNeto = 0;  

    }
    
    if(this.detalle.length == 1){      
      
      this.subtotal = this.detalle[0].total;
      this.valorNeto = this.subtotal + (this.subtotal * (this.iva.value  / 100));
      this.valorNeto = this.valorNeto - this.descuento.value;
  

    } else {

      this.subtotal = this.detalle.reduce((a, b) => (a.total + b.total));
      this.valorNeto = this.subtotal + (this.subtotal * (this.iva.value  / 100));
      this.valorNeto = this.valorNeto - this.descuento.value;

    }




    //this.detalle.splice(objIndex);

  }

  clear(){
    console.log('ingreso');
    this.id_tipo_tercero = '';
  }


  http_tipo_pago() {
    this.loading = true;
    // utiliza la peticion al api general
    //console.log('http_lptipoausentismo', `/${this.environments.prefix}/${this.environments.dataBase}/all/lptipoausentismo`)
    this.api
      .select(
        `/unsafe/inventario/all/tipo_pago`
      )
      .subscribe(
        (response) => {
          this.loading = false;

          console.log('http_tipo_pago', response);
          console.log('http_tipo_pago', response.data);
          console.log('http_tipo_pago', response.data.length);
          console.log('http_tipo_pago', typeof response.data);
          console.log('http_tipo_pago', Array.isArray(response.data));


          this.tipo_pago = response.data;

          console.log('http_tipo_pago', this.tipo_pago);
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

  http_tipo_comprobante() {
    this.loading = true;
    // utiliza la peticion al api general
    //console.log('http_lptipoausentismo', `/${this.environments.prefix}/${this.environments.dataBase}/all/lptipoausentismo`)
    this.api
      .select(
        `/unsafe/inventario/all/tipo_comprobante`
      )
      .subscribe(
        (response) => {
          this.loading = false;



          this.tipo_comprobante = response.data;

          console.log('http_tipo_pago', this.tipo_pago);
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
  
  http_tercero(id) {
    this.loading = true;
    // utiliza la peticion al api general
    //console.log('http_lptipoausentismo', `/${this.environments.prefix}/${this.environments.dataBase}/all/lptipoausentismo`)
    this.api
      .select(
        `/unsafe/inventario/filters/tercero/identificacion/${id}`
      )
      .subscribe(
        (response) => {
          this.loading = false;


          this.tercero = response.data[0];

          console.log('http_tipo_pago', this.tipo_pago);
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


  http_producto(event, value){
    if(event.charCode == 13){
      console.log('buscando');
      this.loading = true;
      // utiliza la peticion al api general
      //console.log('http_lptipoausentismo', `/${this.environments.prefix}/${this.environments.dataBase}/all/lptipoausentismo`)
      this.api
        .select(
          `/unsafe/inventario/filters/producto/serial/${value}`
        )
        .subscribe(
          (response) => {
            this.loading = false;

            if(response.success){

              let dataProduct: any = {  };
              dataProduct = response.data[0];
              dataProduct.cantidad = 1;
              dataProduct.total = 1 * dataProduct.precio_venta;         

              this.add(dataProduct);

              console.log('cantidad de articulos', this.detalle.length);




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

  }


  ngOnInit(): void {
    this.http_tipo_pago();
    this.http_tipo_comprobante();


  }





}
