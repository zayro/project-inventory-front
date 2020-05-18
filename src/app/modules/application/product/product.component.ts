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
import * as service from "../../../services/index";
import { GeneralService } from "../../../services/general.service";


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent extends GeneralService implements AfterViewInit, OnInit, OnDestroy {


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

    this.route.params.subscribe(res => console.log(res));

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
      }

      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        this.paramSubscription = this.router.isActive('/table-export', true);
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator
        // Present error to user
        console.log('NavigationError', event.error);
      }
    });

        // @ts-ignore
        this.table_datable = $('#TableDb').DataTable();

  }

  dtOptions: any = {};
  public dialogo = {};
  message = '';
  // dtOptions: DataTables.Settings = {};

  someClickHandler(info: any): void {
    // this.message = info.id + ' - ' + info.firstName;
    console.log(info);
    this.router.navigate(['producto/edit/' + info.id_producto]);
  }

  // Must be declared as 'any', not as 'DataTables.Settings'

  getData() {
    this.table_datable = $('#TableDb').DataTable({
      pagingType: 'full_numbers',
      paging: true,
      info: true,
      ordering: true,
      searching: true,
      lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, 'All']],
      pageLength: 5,
      ajax: {
        url: `${this.environments.api}/${this.environments.prefix}/${this.environments.db}/all/producto`,
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
        {
          visible: true,
          searchable: false,
          className: "dt-center",
          width: "10%",
          render: function (data, type, full) {

            // return '<a data-toggle="modal" data-target="#exampleModal" data-backdrop="false"> <i  class="fa fa-plus"></i><a/> ';
            return '<a><i  class="fa fa-edit"></i><a/><a><i  class="fa fa-close"></i><a/>';
          }
        }
      ],
      responsive: true,
      rowCallback: (row: Node, data: any, index: number) => {

        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // $('td', row).unbind('click');
        $('i.fa-edit', row).bind('click', () => self.someClickHandler(data));
        // $('button.btn', row).bind('click', () => self.someClickHandler(data));
        return row;
      },

      // Declare the use of the extension in the dom parameter
      // dom: 'frtipBL',
      dom: '<"customize"><"toolbar"fl<"clear">>rt<"bottom"ip<"clear">>',
      // Configure the buttons
      buttons: ['columnsToggle', 'copy', 'print', 'excel']
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
