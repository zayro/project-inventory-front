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
import { GeneralService } from "../../../services/general.service";



@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss']
})
export class EntriesCopyComponent extends GeneralService implements OnInit {

	/**
	 * INITIAL VAR
	 */
  public form: FormGroup;
  public redirect: Boolean;
  public loading: Boolean = false;
  public mySet = new Set()
  public myMap = new Map()
  public tableP;
  user$: any;

  /**
   * Form
   */
  id_tipo_tercero;

  tipo_pago: any[];
  tipo_comprobante;
  tercero: any[];

  subtotal;
  BuscarProducto = new FormControl('');
  descuento = new FormControl('0');
  iva = new FormControl('0');
  total;
  valorNeto = 0;

  private table: string;

  displayedColumns: string[] = ['action', 'serial', 'nombre', 'precio_venta', 'cantidad', 'total'];

  // @ts-ignore

  detalle = [];

  


  constructor(
    injector: Injector
  ) {
    super(injector);

    this.table = this.environments.module.login.view;

    console.log('environments', this.environments);

    this.form = this.formBuild.group({
      descripcion: [null, [Validators.required]],
      id_tipo_pago: [null, [Validators.required]],
      id_tipo_comprobante: [null, [Validators.required]],
      identificacion_tercero: [null, [Validators.required]],
      impuesto: [null, [Validators.required]],
      descuento: [null, [Validators.required]],
      total: [null, [Validators.required]],
      identificacion_usuario: [null, [Validators.required]],
      
    });

    
    this.translate.setTranslate('es');

    $(document).on("keypress", 'form', function (e) {
      var code = e.keyCode || e.which;
      if (code == 13) {
          e.preventDefault();
          return false;
      }
    });


		this.StateService.getUser().subscribe(message => {
			console.log("AppComponent -> message", message)

      this.user$ = message.info[0];

      this.form.get('identificacion_usuario').setValue(this.user$.id);
      
      
		})



  }

  /**
   * Methods And Actions
   * @param data 
   */

  add(data){

   console.log("EntriesComponent -> add -> add", data);
  
   this.detalle.push(data);

   //this.detalle = [...new Set(this.detalle)];
   //this.detalle = Array.from(new Set(this.detalle));

    // Not duplicate content
    this.detalle = [...new Map(this.detalle.map(item => [item.serial, item])).values()];

    this.getTotalCost();



    /*
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
    */


  }

  edit(data, field, event){
    
    // console.log(data)
    // console.log(event.target.value)
    // console.log(field)

    const objIndex = this.detalle.findIndex((obj => obj.serial == data.serial));
    
    //console.log("EntriesComponent -> edit -> objIndex", objIndex)

    this.detalle[objIndex][field] = event.target.value;
    this.detalle[objIndex].total =  this.detalle[objIndex].cantidad  * this.detalle[objIndex].precio_venta;

    this.subtotal = this.detalle.map(t => t.total).reduce((acc, value) => acc + value, 0);
    this.valorNeto = this.subtotal + (this.subtotal * (this.form.get("impuesto").value  / 100))
    this.valorNeto = this.valorNeto - this.descuento.value;
    this.form.get('total').setValue(this.valorNeto);

    // console.log("EntriesComponent -> edit -> detalle", this.detalle)

    // console.log(this.detalle.reduce(function(valorAnterior, valorActual, indice, vector){    return valorAnterior + valorActual;    }));

    //console.log(this.detalle.reduce((a, b) => ({x: a.total + b.total})));
    //this.valorNeto = this.subtotal + (this.subtotal * (this.iva.value  / 100));

    /*

    if(this.detalle.length == 1){   
      
      this.subtotal = this.detalle[objIndex].total;
      this.valorNeto = this.subtotal + (this.subtotal * (this.form.get("impuesto").value  / 100))
      this.valorNeto = this.valorNeto - this.descuento.value;

    } else {

      this.subtotal = this.detalle.reduce((a, b) =>{     return a.total + b.total    }    );
      this.valorNeto = this.subtotal + (this.subtotal * (this.form.get("impuesto").value  / 100))
      this.valorNeto = this.valorNeto - this.descuento.value;

    }*/


    

    /*
    const result = this.detalle.filter(user => {
      if(user[key] == value) {
        return  user[key] = newValue;
      }
   });
   */

  }

  delete(data){

    console.log(this.detalle.length);
    
    this.detalle = this.detalle.filter(item => item.serial !== data.serial)

    console.log(this.detalle.length);

    if(this.detalle.length == 0){    

      this.subtotal = 0;
      this.valorNeto = 0;  

    }

    this.getTotalCost();

    //this.detalle.splice(objIndex);

  }

  clearCustomer(){
    console.log('ingreso');
    this.id_tipo_tercero = '';
  }

  getTotalCost() {
    //return this.detalle.map(t => t.total).reduce((acc, value) => acc + value, 0);
    this.subtotal = this.detalle.map(t => t.total).reduce((acc, value) => acc + value, 0);
    this.valorNeto = this.subtotal + (this.subtotal * (this.form.get("impuesto").value / 100));
    this.valorNeto = this.valorNeto - this.form.get("descuento").value ;
    this.form.get('total').setValue(this.valorNeto);
  }

  PutTax(){   

    console.log('update iva', this.form.get("impuesto").value);

    //this.valorNeto = this.subtotal + (this.subtotal * (this.iva.value  / 100))
    this.valorNeto = this.subtotal + (this.subtotal * (this.form.get("impuesto").value  / 100))
    this.form.get('total').setValue(this.valorNeto);

  }

  PutDiscount(){ 

    console.log('update PutDiscount', this.form.get("descuento").value);

    //this.valorNeto = this.valorNeto - this.descuento.value;
    this.valorNeto = this.valorNeto - this.form.get("descuento").value;
    this.form.get('total').setValue(this.valorNeto);

  }

  /**
   *  HTTP REQUEST
   * 
   */

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
          `/${this.environments.prefix}/${this.environments.db}/filters/producto/serial/${value}`
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

  httpSave(){
    this.loading = true;
    // utiliza la peticion al api general
    //console.log('http_lptipoausentismo', `/${this.environments.prefix}/${this.environments.dataBase}/all/lptipoausentismo`)

    const send = {
      "maestro_movimiento": this.form.value,
      "detalle_movimiento":  this.detalle 
    };

    this.api
      .insert(
        `/proccess/create/invoice`,
        send
      )
      .subscribe(
        (response) => {
          this.loading = false;

          if(response.success){

            this.alert("Proceso exitoso  ", "Restornar a la lista", "success");

          }

        },
        err => {
          this.loading = false;
          console.error("Error occured.", err);
          this.snackBar.open(
            `Ocurrio un Error: httpSave`,
            "Cerrar",
            {
              duration: 3000
            }
          );
        }
      );
  }


  ngOnInit(): void {

    this.http_tipo_pago();

    this.http_tipo_comprobante();

    let urlSearch = `${this.environments.api}/${this.environments.prefix}/${this.environments.db}/filterLikeSearch/producto/nombre/`;

    let redirect = () => {
      console.log('agregando', dataProducto);     
      let item: any = {};
      item = dataProducto;
      item.cantidad = 1;
      item.total = 1 * item.precio_venta;     
      this.add(item);
    };

    let dataProducto;

    var $eventSelect = $(".js-example-basic-single");

    $eventSelect.on("select2:select", function (e) { 
      console.log("EntriesComponent -> ngOnInit -> e", e);
      redirect();
      $(".js-example-basic-single").val(null).trigger("change");
     });
    
    $('.js-example-basic-single').on('change', function (e) {
      
      console.log($(".js-example-basic-single").val());
      
    });



      
      $('.js-example-basic-single').select2({
        minimumInputLength: 1,
        allowClear: true,
        ajax: {
          url: urlSearch,
          dataType: 'json',
          data: function (params) {
            var query = {
              search: params.term,
              type: 'public'
            }
      
            // Query parameters will be ?search=[term]&type=public
            return query;
          },
          processResults: function (response, page) {
            return {

                results: $.map(response.data, function (item) {               
                  

                  
                  dataProducto = item
    
                  //redirect(item);                             
                  
                    return {
                        text: item.nombre,
                        name: item.nombre,
                        id: item.id
                    }


                })
            };
        }, 

        }

      });



    

  }


}
