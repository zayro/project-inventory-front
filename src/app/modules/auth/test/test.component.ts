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


//import swal from 'sweetalert';
import Swal from 'sweetalert2';

// import Services
import * as service from "../../../services/index";
import { GeneralService } from "../../../services/general.service";


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent extends GeneralService implements OnInit {

  title: string;

  info: any;

  // ******* Init Default config variable Component *******
  form: FormGroup;
  table: string;
  idTable: string;
  idValue: any;
  table_datable: any;
  lang: string;
  actionSent: string;

  /** Form values default */
  crud = {
    nombre: ''
  };



  constructor(injector: Injector) {
    super(injector);

    console.log('********** init controller crud ************');

    // ******* config variable Component *******
    this.table = 'producto';
    this.idTable = 'id_producto';

    this.form = this.formBuild.group({
      nombre: [this.crud.nombre, [Validators.required]]
    });

    // @ts-ignore
    this.table_datable = $('#TableDb').DataTable();


  }

  /**
   *
   *
   * @param {*} data
   * @memberof AppHomeComponent
   */
  loadForm(data) {
    console.log('loadForm', data);
    // ******* config form Component *******
    this.idValue = data.id_producto
    this.form = this.formBuild.group({
      nombre: [data.nombre, [Validators.required]]
    });
  }

  actions(act: string) {
    switch (act) {
      case 'insert':
        this.save();
        break;
      case 'update':
        this.update();
        break;
    }
  }

  /**
   * Init DataTable
   *
   * @memberof crud
   */
  TableUpdate() {
    this.table_datable.ajax.url('http://localhost:8000/unsafe/demo/all/producto').load();
  }


  /**
   * Insert Row into table
   *
   * @memberof crud
   */
  save() {
    const send = {
      insert: 'producto',
      values: [this.form.value],
      increment: 'id_producto'
    };
    this.api.insert(
      `${this.environments.insert.general}`,
      send).subscribe(
        (response: any) => {
          console.log(response);
          this.TableUpdate();
          $('#exampleModal').modal('hide');
        },
        err => {
          console.error('Error occured.', err);
        }
      );
  }

  /**
   * Update Row into Table
   *
   * @returns
   * @memberof crud
   */
  update() {
    const send: any = {
      update: this.table,
      set: this.form.value,
      where: {}
    };

    send.where[this.idTable] = this.idValue;


    this.api
      .update(
        `${this.environments.update.insecure}`,
        send
      )
      .subscribe(
        (response: any) => {
          console.log(response);
          this.TableUpdate();
          $('#exampleModal').modal('hide');
        },
        err => {
          console.error('Error occured.', err);
        }
      );
  }

  /**
   *
   *
   * @param {*} data
   * @memberof crud
   */
  delete(data) {

    console.log(data);
    const send = {
      delete: this.table,
      where: {}
    };


    send.where[this.idTable] = data.id_producto;

    this.api
      .general(
        'POST',
        `${this.environments.delete.insecure}`,
        '',
        send
      )
      .subscribe(
        (response: any) => {

          console.log(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )

          this.TableUpdate();


          this.snackBar.open(`Exitoso: ${response.message}`, 'Cerrar', {
            duration: 3000
          });

          console.log(response);
        },
        err => {
          console.error('Error occured.', err);
          this.snackBar.open(`Ocurrio un Error: ${err.error.message}`, 'Cerrar', {
            duration: 3000
          });
        }
      );
  }

  /**
   *
   *
   * @memberof AppHomeComponent
   */
  hidden() {
    const send = {
      update: this.table,
      where: {}
    };
    send.where[this.idTable] = this.idValue;
    this.api
      .update(
        `${this.environments.desactivate.general}`,
        send
      )
      .subscribe(
        (response: any) => {
          this.snackBar.open(`Exitoso: ${response.message}`, 'Cerrar', {
            duration: 3000
          });
          console.log(response);
        },
        err => {
          console.error('Error occured.', err);
          this.snackBar.open(`Ocurrio un Error: ${err.error.message}`, 'Cerrar', {
            duration: 3000
          });
        }
      );
  }

  /**
   * Load Table
   *
   * @memberof AppHomeComponent
   */
  Loadtable() {


    let capturar = (info, data) => {

      console.log('capturar', data);
      //código de la función


      if (info == 'create') {
        this.actionSent = 'insert';
        this.loadForm(this.crud);
        $('#exampleModal').modal({
          backdrop: false,
          show: true
        });

      }

      if (info == 'edit') {
        this.loadForm(data);
        this.actionSent = 'update';
        $('#exampleModal').modal({
          backdrop: false,
          show: true
        });
      }

      if (info == 'destroy') {

        // @ts-ignore
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {


            this.delete(data);

          }


        })

      }
    }

     // @ts-ignore
    this.table_datable = $('#TableDb').DataTable({
      //ajax: 'php/select_patient_care_team.php?pid=' + pid,
      ajax: 'http://localhost:8000/unsafe/demo/all/producto',
      deferRender: true,
      responsive: true,
      language: { url: this.lang },
      dom: '<"top"lBf>rt<"bottom"ip>',
      buttons: [
        {
          extend: 'excel',
        },
        {
          extend: 'print',
        },
        {
          text: '<a><i  class="fa fa-plus"></i><a/>',
          action: function (dt) {
            console.log('My custom button!');
            capturar('create', '');
          }
        },
      ],
      columns: [
        { data: 'id_producto' },
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
      rowCallback: function (row, data, index) {

        $('i.fa-edit', row).bind('click', function () {

          capturar('edit', data);

          return row;
        });

        $('i.fa-close', row).bind('click', function () {

          capturar('destroy', data);

          return row;
        });

        return row;

      }
    });
  }

  ngOnInit() {

    console.log('ngOnInit -> Crud');

    this.Loadtable();

     // @ts-ignore
    if ($.fn.dataTable.isDataTable('#TableDb')) {
      console.log('se cargo table ********************');
    } else {
      console.log('cargando table ********************');
    }


  }


}

