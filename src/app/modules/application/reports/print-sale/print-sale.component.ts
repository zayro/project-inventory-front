import { Component, OnInit, Injector } from '@angular/core';

import { GeneralService } from "../../../../services/general.service";

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-print-sale',
  templateUrl: './print-sale.component.html',
  styleUrls: ['./print-sale.component.scss']
})
export class PrintSaleComponent  extends GeneralService  implements OnInit {

  encabezado: {
    persona: string,
    descripcion: string,
    descuento: string,
    identificacion: string,
    impuesto: string,
    movimiento: string,
    naturaleza: string,
    pago: string,
    telefono: string,
    email: string,
    total: string,
    fecha: string
  };
  detalle: any;
  subtotal;
  impuesto;
  total;
  descuento;
  valorNeto;
  loading;


  id;


  constructor(
    injector: Injector
  ) {
    super(injector);


    /*
    console.log(this.route.snapshot.params);
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.params.id);
    console.log(this.route.snapshot.url);
    console.log(this.route.snapshot.url.join(''));
    console.log(this.route.snapshot.data);
    console.log(this.route.snapshot.parent);
    console.log(this.route.snapshot.children);
    console.log(this.route.snapshot.root);
    console.log(this.route.snapshot.url[0].path);
    */

   this.id = this.route.snapshot.queryParamMap.get("id");

   console.log(this.route.snapshot.queryParamMap.get("id"));



  }


  http_movimientos_detalles(id) {
    this.loading = true;
    // utiliza la peticion al api general
    //console.log('http_lptipoausentismo', `/${this.environments.prefix}/${this.environments.dataBase}/all/lptipoausentismo`)
    this.api
      .select(
        `/${this.environments.prefix}/${this.environments.db}/filters/movimientos_detalles/id_maestro_movimiento/${id}`
      )
      .subscribe(
        (response) => {
          this.loading = false;

          this.detalle = response.data;


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

  http_movimientos_encabezados(id) {
    this.loading = true;
    // utiliza la peticion al api general
    //console.log('http_lptipoausentismo', `/${this.environments.prefix}/${this.environments.dataBase}/all/lptipoausentismo`)
    this.api
      .select(
        `/${this.environments.prefix}/${this.environments.db}/filters/movimientos_encabezados/id/${this.id}`
      )
      .subscribe(
        (response) => {
          this.loading = false;

          this.encabezado = response.data[0];



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


    this.route.paramMap.subscribe(params => {
      this.id = params.get("id")
      this.http_movimientos_encabezados(this.id);
      this.http_movimientos_detalles(this.id);

    })


    $("#print_pdf").click(function () {
      html2canvas(document.querySelector("div.contenedor")).then(canvas => {

        //document.body.appendChild(canvas);

        var data = canvas.toDataURL();
        var img = 'data:image/png;base64,' + data;

        document.getElementById('export').appendChild(canvas);


        $("#export").hide();

        let pdf = new jsPDF('p', 'mm', 'a4');
        //pdf.addImage(canvas.toDataURL('image/png'), 'PNG', -50, 0);
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 5);
        console.log($(document).width(), 'width');
        console.log($(document).height(), 'height');
        pdf.save('order.pdf');

      });

    });

    $("#print_jpg").click(function () {


      html2canvas(document.querySelector("div.contenedor")).then(canvas => {

        var a = document.createElement('a');
        a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg",
          "image/octet-stream");
        a.download = 'order.jpg';
        a.click();



      });

    });

    $("#print_only").click(function () {

      //printJS('contenedor', 'html');
      window.print();



    });

  }

}
