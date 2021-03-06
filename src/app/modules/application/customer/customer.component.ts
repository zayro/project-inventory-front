import {
  AfterViewInit,
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  Injector,
  ɵConsole
} from "@angular/core";

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

// import Services
import * as service from "../../../services/index";
import { GeneralService } from "../../../services/general.service";



@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent extends GeneralService implements AfterViewInit, OnInit, OnDestroy {


  public paramSubscription: boolean;


  // ******* Init Default config variable Component *******
  form: FormGroup;
  idTable: string;
  idValue: any;
  table_datable: any;
  lang: string;
  actionSent: string;



  /**
   * Var about Edit
   */
  info;
  table = 'tercero';
  tableId = 'id';
  tableIdValue;
  loading;
  btnEditar;

  menu$;
  user$;


  validAdd;
  validEdit;
  validDelete;


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
        this.paramSubscription = this.router.isActive('/customer', true);

        if (this.paramSubscription) {
          this.table_datable.ajax.reload();
        }

        console.log("ProductComponent -> this.router.isActive('/product', true);", this.router.isActive('/customer', true))
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator
        // Present error to user
        console.log('NavigationError', event.error);
      }
    });

    // @ts-ignore
    this.table_datable = $('#TableDbProveedor').DataTable();

    this.StateService.getUser().subscribe(data => {
      console.log("AppComponent -> getUser", data)


      this.menu$ = data.menu;
      this.user$ = data.info[0];

      console.log("AppComponent -> getUser", this.menu$)

      const objIndex = this.menu$.findIndex((obj => obj.link == "customer"));
      //const Find = this.menu$.find((obj => obj.link == "customer" && obj.link == "customer" ));
      console.log('validado el permiso', objIndex);

      if (objIndex >= 0) {
        this.validAdd = this.menu$[objIndex].add;
        this.validEdit = this.menu$[objIndex].edit;
        this.validDelete = this.menu$[objIndex].delete;
      } else {
        this.router.navigate(['home/']);
      }

    })


  }

  RedirectAdd(): void {
    // this.message = info.id + ' - ' + info.firstName;
    //console.log(info);
    this.router.navigate(['customer/add/']);
  }

  RedirectEdit(info: any): void {
    // this.message = info.id + ' - ' + info.firstName;
    //console.log(info);
    this.router.navigate(['customer/edit/' + info.id]);
  }

  getData() {

    let redirect = () => {
      this.RedirectAdd();
    }


    // AGREGAR Y EDITAR Y ELIMINAR
    if (this.validAdd === '1' && this.validEdit === '1' && this.validDelete === '1') {


      this.table_datable = $('#TableDbCustomer').DataTable({
        pagingType: 'full_numbers',
        paging: true,
        info: true,
        ordering: true,
        searching: true,
        responsive: false,
        lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, 'All']],
        pageLength: 5,
        ajax: {
          url: `${this.environments.api}/${this.environments.prefix}/${this.environments.db}/all/view_cliente`,
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
          {
            visible: true,
            searchable: false,
            className: "dt-center",
            width: "10%",
            render: function (data, type, full) {

              // return '<a data-toggle="modal" data-target="#exampleModal" data-backdrop="false"> <i  class="fa fa-plus"></i><a/> ';
              return `
            <div class="text-center">
            <button class="btn btn-outline-primary btn-sm edit"><i  class="fa fa-edit"></i></button>
            <button class="btn btn-outline-danger btn-sm delete"><i  class="fa fa-close"></i></button>
            </div>
            `;
            }
          },
          { data: 'id' },
          { data: 'nombre' },
          { data: 'email' },
          { data: 'telefono' },
          { data: 'identificacion' }
        ],
        // Declare the use of the extension in the dom parameter
        // dom: 'frtipBL',
        //dom: '<"customize"><"toolbar"fl<"clear">>rt<"bottom"ip<"clear">>',
        dom: `<'row'<'col-sm-12 col-md-6'B><'col-sm-12 col-md-6'f>>
          <'row'<'col-sm-12'tr>>
          <'row'<'col-sm-12 col-md-4'i><'col-sm-12 col-md-4 text-center'l><'col-sm-12 col-md-4'p>>`,
        // Configure the buttons
        buttons: [
          // {
          //   extend: 'copy',
          //   className: 'btn btn-outline-secondary',
          // },
          // {
          //   extend: 'excel',
          //   className: 'btn btn-outline-secondary',
          // },
          // {
          //   extend: 'print',
          //   className: 'btn btn-outline-secondary',
          //   exportOptions: {
          //     columns: [0, 1, 2,3]
          //   }
          // },
          // {
          //   extend: 'pdfHtml5',
          //   className: 'btn btn-outline-secondary',
          // },
          // {
          //   extend: 'csv',
          //   className: 'btn btn-outline-secondary',
          // },
          // {
          //   extend: 'columnsToggle',
          // },

          {
            text: '<button class="btn btn-outline-secondary"> <i  class="fa fa-plus"></i> </button> ',
            className: 'btn btn-default btn-xs',
            action: function (dt) {
              redirect();
              console.log('My custom button!');
            }
          },
        ],
        rowCallback: (row: Node, data: any, index: number) => {

          const self = this;
          // Unbind first in order to avoid any duplicate handler
          // $('td', row).unbind('click');
          $('button.edit', row).bind('click', () => self.RedirectEdit(data));
          $('button.delete', row).bind('click', () => self.destroyData(data.id));
          // $('button.btn', row).bind('click', () => self.Redirect(data));
          return row;
        },



      });

      /*
        this.table_datable = $('#TableDbCustomer').DataTable({
          destroy: true,
        });
        */
    }

    // NINGUNO
    if (this.validAdd === '0' && this.validEdit === '0' && this.validDelete === '0') {

      this.table_datable = $('#TableDbCustomer').DataTable({
        pagingType: 'full_numbers',
        paging: true,
        info: true,
        ordering: true,
        searching: true,
        responsive: false,
        lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, 'All']],
        pageLength: 5,
        ajax: {
          url: `${this.environments.api}/${this.environments.prefix}/${this.environments.db}/all/view_cliente`,
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
          { data: 'nombre' },
          { data: 'email' },
          { data: 'telefono' },
          { data: 'identificacion' }
        ],


      });

      this.table_datable.columns('.customerAction').visible(false);
      this.table_datable.columns([0]).visible(false);
      this.table_datable.columns.adjust().draw(false);

      console.log('solo visualizacion');

    }

    // AGREGAR
    if (this.validAdd === '1' && this.validEdit === '0' && this.validDelete === '0') {
      this.table_datable = $('#TableDbCustomer').DataTable({
        pagingType: 'full_numbers',
        paging: true,
        info: true,
        ordering: true,
        searching: true,
        responsive: false,
        lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, 'All']],
        pageLength: 5,
        ajax: {
          url: `${this.environments.api}/${this.environments.prefix}/${this.environments.db}/all/view_cliente`,
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
          { data: 'nombre' },
          { data: 'email' },
          { data: 'telefono' },
          { data: 'identificacion' }
        ],
        dom: `<'row'<'col-sm-6'B><'col-sm-6'f>>
        <'row'<'col-sm-12'tr>>
        <'row'<'col-sm-4'i><'col-sm-4 text-center'l><'col-sm-4'p>>`,
        buttons: [
          // {
          //   extend: 'copy',
          //   className: 'btn btn-outline-secondary',
          // },
          // {
          //   extend: 'excel',
          //   className: 'btn btn-outline-secondary',
          // },
          // {
          //   extend: 'print',
          //   className: 'btn btn-outline-secondary',
          //   exportOptions: {
          //     columns: [0, 1, 2,3]
          //   }
          // },
          // {
          //   extend: 'pdfHtml5',
          //   className: 'btn btn-outline-secondary',
          // },
          // {
          //   extend: 'csv',
          //   className: 'btn btn-outline-secondary',
          // },
          // {
          //   extend: 'columnsToggle',
          // },
          {
            text: '<button class="btn btn-outline-secondary"> <i  class="fa fa-plus"></i> </button> ',
            className: 'btn btn-default btn-xs',
            action: function (dt) {
              redirect();
              console.log('My custom button!');
            }
          },
        ],
      });

    }

    // AGREGAR Y EDITAR
    if (this.validAdd === '1' && this.validEdit === '1' && this.validDelete === '0') {

      this.table_datable = $('#TableDbCustomer').DataTable({
        pagingType: 'full_numbers',
        paging: true,
        info: true,
        ordering: true,
        searching: true,
        responsive: false,
        lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, 'All']],
        pageLength: 5,
        ajax: {
          url: `${this.environments.api}/${this.environments.prefix}/${this.environments.db}/all/view_cliente`,
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
          {
            visible: true,
            searchable: false,
            className: "dt-center",
            width: "10%",
            render: function (data, type, full) {
              return `
            <div class="text-center">
            <button class="btn btn-outline-primary edit"><i  class="fa fa-edit"></i></button>
            </div>
            `;
            }
          },
          { data: 'id' },
          { data: 'nombre' },
          { data: 'email' },
          { data: 'telefono' },
          { data: 'identificacion' }
        ],
        buttons: [{
          text: '<button class="btn btn-outline-secondary"> <i  class="fa fa-plus"></i> </button> ',
          className: 'btn btn-default btn-xs',
          action: function (dt) {
            redirect();
            console.log('My custom button!');
          }
        }],
        dom: "<'row'<'col-sm-6'B><'col-sm-6'f>>" +
          "<'row'<'col-sm-12'tr>>" +
          "<'row'<'col-sm-4'i><'col-sm-4 text-center'l><'col-sm-4'p>>",
        rowCallback: (row: Node, data: any, index: number) => {
          const self = this;
          $('button.edit', row).bind('click', () => self.RedirectEdit(data));
          return row;
        },



      });

    }

    // AGREGAR Y ELIMINAR
    if (this.validAdd === '1' && this.validEdit === '0' && this.validDelete === '1') {

      this.table_datable = $('#TableDbCustomer').DataTable({
        pagingType: 'full_numbers',
        paging: true,
        info: true,
        ordering: true,
        searching: true,
        responsive: false,
        lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, 'All']],
        pageLength: 5,
        ajax: {
          url: `${this.environments.api}/${this.environments.prefix}/${this.environments.db}/all/view_cliente`,
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
          {
            visible: true,
            searchable: false,
            className: "dt-center",
            width: "10%",
            render: function (data, type, full) {

              // return '<a data-toggle="modal" data-target="#exampleModal" data-backdrop="false"> <i  class="fa fa-plus"></i><a/> ';
              return `
              <div class="text-center">
              <button class="btn btn-outline-danger delete"><i  class="fa fa-close"></i></button>
              </div>
              `;
            }
          },
          { data: 'id' },
          { data: 'nombre' },
          { data: 'email' },
          { data: 'telefono' },
          { data: 'identificacion' }
        ],
        buttons: [{
          text: '<button class="btn btn-outline-secondary"> <i  class="fa fa-plus"></i> </button> ',
          className: 'btn btn-default btn-xs',
          action: function (dt) {
            redirect();
            console.log('My custom button!');
          }
        },],
        dom: "<'row'<'col-sm-6'B><'col-sm-6'f>>" +
          "<'row'<'col-sm-12'tr>>" +
          "<'row'<'col-sm-4'i><'col-sm-4 text-center'l><'col-sm-4'p>>",
        rowCallback: (row: Node, data: any, index: number) => {

          const self = this;
          // Unbind first in order to avoid any duplicate handler
          // $('td', row).unbind('click');
          $('button.edit', row).bind('click', () => self.RedirectEdit(data));
          $('button.delete', row).bind('click', () => self.destroyData(data.id));
          // $('button.btn', row).bind('click', () => self.Redirect(data));
          return row;
        },



      });
    }

    // EDITAR Y ELIMINAR
    if (this.validAdd === '0' && this.validEdit === '1' && this.validDelete === '1') {

      this.table_datable = $('#TableDbCustomer').DataTable({
        pagingType: 'full_numbers',
        paging: true,
        info: true,
        ordering: true,
        searching: true,
        responsive: false,
        lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, 'All']],
        pageLength: 5,
        ajax: {
          url: `${this.environments.api}/${this.environments.prefix}/${this.environments.db}/all/view_cliente`,
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
          {
            visible: true,
            searchable: false,
            className: "dt-center",
            width: "10%",
            render: function (data, type, full) {

              // return '<a data-toggle="modal" data-target="#exampleModal" data-backdrop="false"> <i  class="fa fa-plus"></i><a/> ';
              return `
              <div class="text-center">
              <button class="btn btn-outline-primary edit"><i  class="fa fa-edit"></i></button>
              <button class="btn btn-outline-danger delete"><i  class="fa fa-close"></i></button>
              </div>
              `;
            }
          },
          { data: 'id' },
          { data: 'nombre' },
          { data: 'email' },
          { data: 'telefono' },
          { data: 'identificacion' }
        ],

        rowCallback: (row: Node, data: any, index: number) => {

          const self = this;
          // Unbind first in order to avoid any duplicate handler
          // $('td', row).unbind('click');
          $('button.edit', row).bind('click', () => self.RedirectEdit(data));
          $('button.delete', row).bind('click', () => self.destroyData(data.id));
          // $('button.btn', row).bind('click', () => self.Redirect(data));
          return row;
        },



      });


    }

    // EDITAR
    if (this.validAdd === '0' && this.validEdit === '1' && this.validDelete === '0') {

      this.table_datable = $('#TableDbCustomer').DataTable({
        pagingType: 'full_numbers',
        paging: true,
        info: true,
        ordering: true,
        searching: true,
        responsive: false,
        lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, 'All']],
        pageLength: 5,
        ajax: {
          url: `${this.environments.api}/${this.environments.prefix}/${this.environments.db}/all/view_cliente`,
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
          {
            visible: true,
            searchable: false,
            className: "dt-center",
            width: "10%",
            render: function (data, type, full) {

              // return '<a data-toggle="modal" data-target="#exampleModal" data-backdrop="false"> <i  class="fa fa-plus"></i><a/> ';
              return `
              <div class="text-center">
              <button class="btn btn-outline-primary edit"><i  class="fa fa-edit"></i></button>
              </div>
              `;
            }
          },
          { data: 'id' },
          { data: 'nombre' },
          { data: 'email' },
          { data: 'telefono' },
          { data: 'identificacion' }
        ],

        rowCallback: (row: Node, data: any, index: number) => {

          const self = this;
          // Unbind first in order to avoid any duplicate handler
          // $('td', row).unbind('click');
          $('button.edit', row).bind('click', () => self.RedirectEdit(data));
          $('button.delete', row).bind('click', () => self.destroyData(data.id));
          // $('button.btn', row).bind('click', () => self.Redirect(data));
          return row;
        },



      });

    }

    // ELIMINAR
    if (this.validAdd === '0' && this.validEdit === '0' && this.validDelete === '1') {
      this.table_datable = $('#TableDbCustomer').DataTable({
        pagingType: 'full_numbers',
        paging: true,
        info: true,
        ordering: true,
        searching: true,
        responsive: false,
        lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, 'All']],
        pageLength: 5,
        ajax: {
          url: `${this.environments.api}/${this.environments.prefix}/${this.environments.db}/all/view_cliente`,
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
          {
            visible: true,
            searchable: false,
            className: "dt-center",
            width: "10%",
            render: function (data, type, full) {

              // return '<a data-toggle="modal" data-target="#exampleModal" data-backdrop="false"> <i  class="fa fa-plus"></i><a/> ';
              return `
              <div class="text-center">
              <button class="btn btn-outline-danger delete"><i  class="fa fa-close"></i></button>
              </div>
              `;
            }
          },
          { data: 'id' },
          { data: 'nombre' },
          { data: 'email' },
          { data: 'telefono' },
          { data: 'identificacion' }
        ],

        rowCallback: (row: Node, data: any, index: number) => {

          const self = this;
          // Unbind first in order to avoid any duplicate handler
          // $('td', row).unbind('click');
          $('button.edit', row).bind('click', () => self.RedirectEdit(data));
          $('button.delete', row).bind('click', () => self.destroyData(data.id));
          // $('button.btn', row).bind('click', () => self.Redirect(data));
          return row;
        },



      });


    }




  }

  destroyData(id) {


    this.alert({
      title: "Esta seguro de eliminar el registro ?",
      text: "una vez eliminado no podra recuperarlo!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {

          this.loading = true;
          // utiliza la peticion al api general
          //console.log('http_lptipoausentismo', `/${this.environments.prefix}/${this.environments.dataBase}/all/lptipoausentismo`)
          this.api
            .delete(
              `/${this.environments.prefix}/${this.environments.db}/destroy/${this.table}/${this.tableId}/${id}`
            )
            .subscribe(
              (response) => {
                this.loading = false;

                if (response.success) {

                  this.table_datable.ajax.reload();

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

        } else {
          console.log('not delete row');
        }
      });



  }

  hiddenData(id) {
    this.loading = true;


    const send = {
      "update": this.table,
      "set": this.form.value,
      "where": { "id": this.tableIdValue }
    };

    this.api
      .update(
        `/unsafe/inventario/edit/${id}`
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
    console.log('ngOnInit');


  }

  ngAfterViewInit(): void {

    console.log('ngAfterViewInit');
    this.getData();

  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
  }
}
