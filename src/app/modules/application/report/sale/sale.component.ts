import {
  AfterViewInit,
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  Injector
} from "@angular/core";
//import { MatSnackBar } from '@angular/material';

import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
  FormGroupDirective,
  NgForm,
} from "@angular/forms";

import {
  ActivatedRoute,
  Router,
  NavigationStart,
  NavigationError,
  NavigationEnd
} from '@angular/router';


//import swal from 'sweetalert';
import Swal from 'sweetalert2';

// import Services

import { GeneralService } from "../../../../services/general.service";


@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent extends GeneralService implements AfterViewInit, OnInit, OnDestroy {


  public paramSubscription: boolean;

  // ******* Init Default config variable Component *******
  form: FormGroup;
  table: string;
  idTable: string;
  idValue: any;
  table_datable: any;
  lang: string;
  actionSent: string;



  constructor(
    injector: Injector,
  ) {
    super(injector);
    this.paramSubscription = true;

    this.route.params.subscribe(res => console.log('this.route.params.subscribe', res));

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
        console.log('NavigationStart', event);
      }

      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        this.paramSubscription = this.router.isActive('/product', true);
        console.log("ProductComponent -> this.router.isActive('/product', true);", this.router.isActive('/product', true))
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator
        // Present error to user
        console.log('NavigationError', event.error);
      }
    });

    // @ts-ignore
    this.table_datable = $('#TableReportSale').DataTable();

  }


  // Must be declared as 'any', not as 'DataTables.Settings'

  getData() {




    this.table_datable = $('#TableReportSale').DataTable({
      pagingType: 'full_numbers',
      paging: true,
      info: true,
      ordering: true,
      searching: true,
      responsive: false,
      lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, 'All']],
      pageLength: 5,
      ajax: {
        url: `${this.environments.api}/${this.environments.prefix}/${this.environments.db}/all/movimientos_encabezados`,
        type: 'GET',
        beforeSend: function (request) {
          if (localStorage.getItem('token')) {
            request.setRequestHeader(
              'Authorization',
              localStorage.getItem('token')
            );
          }
        }
      },
      order: [[1, 'desc']],
      columns: [
        { data: 'id' },
        { data: 'persona' },
        { data: 'identificacion' },
        { data: 'movimiento' },
        { data: 'pago' },
        { data: 'naturaleza' },
        { data: 'descuento' },
        { data: 'impuesto' },
        { data: 'total' },
        {
          visible: true,
          searchable: false,
          className: "dt-center",
          width: "10%",
          render: function (data, type, full) {

            // return '<a data-toggle="modal" data-target="#exampleModal" data-backdrop="false"> <i  class="fa fa-plus"></i><a/> ';

            return `
            <div class="text-center">
            <button class="btn btn-outline-primary edit">exportar</button>
            </div>
            `;
          }
        }
      ],

      rowCallback: (row: Node, data: any, index: number) => {

        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // $('td', row).unbind('click');
        //$('i.fa-edit', row).bind('click', () => self.RedirectEdit(data));
        // $('button.btn', row).bind('click', () => self.Redirect(data));
        return row;
      },

      // Declare the use of the extension in the dom parameter
      // dom: 'frtipBL',
      //dom: '<"customize"><"toolbar"fl<"clear">>rt<"bottom"ip<"clear">>',
      dom:    "<'row'<'col-sm-6'B><'col-sm-6'f>>" +
      "<'row'<'col-sm-12'tr>>" +
      "<'row'<'col-sm-4'i><'col-sm-4 text-center'l><'col-sm-4'p>>",
      // Configure the buttons
      buttons:  [
        {
          extend: 'copy',
          className: 'btn btn-outline-secondary',
        },
        {
          extend: 'excel',
          className: 'btn btn-outline-secondary',
        },
        {
          extend: 'print',
          className: 'btn btn-outline-secondary',
          exportOptions: {
            columns: [0,1,2,3,4,5,6,7,8]
            }
        },
        {
          extend: 'csv',
          className: 'btn btn-outline-secondary',
        },
        // {
        //   extend: 'pdf',
        //   className: 'btn btn-outline-secondary',
        // },
        // {
        //   extend: 'columnsToggle',
        //   className: 'btn btn-link',
        //   columns: ':not([data-visible="false"])',
        //   exportOptions: {
        //     columns: [0,1,2,3,4,5,6,7,8]
        //   }
        // }
      ],

    });
  }

  ngOnInit(): void {
    console.log('INGRESO TABLE EXPORT');

    this.getData();
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy() { }
}
