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


// import Services
import * as service from "../../../services/index";
import { GeneralService } from "../../../services/general.service";


@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent extends GeneralService implements OnInit {


  // ******* Init Default config variable Component *******
  info: any;
  table: string;
  idTable: string;
  idValue: any;

  // Local
  password: string | null = '';
  formChangePassword: FormGroup;
  loading = false;

  constructor(injector: Injector) {
    super(injector);
    this.createForm();

    this.table = 'users_information';
    this.idTable = 'id_users_information';
    this.idValue = 1;


    this.info = {}
    this.info.image = null;



    this.formChangePassword = this.formBuild.group({
      user: ['', [Validators.required]],
      oldPass: ['', [Validators.required, Validators.minLength(6)]],
      newPass: ['', [Validators.required, Validators.minLength(6)]]
    });


  }


  /**
   *  ////////////// TAB 1 //////////////////
   */
  createForm() {
    this.form = this.formBuild.group({
      first_name: ['', Validators.required],
      second_name: [''],
      first_surname: ['', Validators.required],
      second_surname: [''],
      phone: ['', Validators.required],
      image: [''],
    })

  }

  UpdateForm(data) {
    this.form = this.formBuild.group({
      first_name: [data.first_name, Validators.required],
      second_name: [data.second_name],
      first_surname: [data.first_surname, Validators.required],
      second_surname: [data.second_surname],
      phone: [data.phone, Validators.required],
      image: [data.image],
    })

  }

  onFileChange(event) {
    let file = event.target.files[0];

    jQuery('span.image').html(file.name);
    console.log("TCL: AppConfigComponent -> reader.onload -> file.name", file.name)
    console.log("TCL: AppConfigComponent -> reader.onload -> file.type", file.type)

    let reader = new FileReader();

    reader.onload = () => {
      /*
      this.form.get('image').setValue({
        filename: file.name,
        filetype: file.type,
        value: reader.result
      });



      const output:any = document.getElementById('output');
      output.src = reader.result;
      */


      this.form.get('image').setValue(reader.result);
      this.info.image = reader.result;
      //console.log("ConfigComponent -> reader.onload -> reader.result", reader.result)
    }

    reader.readAsDataURL(file);

    // console.log("TCL: upload -> onFileChange -> this.form.get('file').value", this.form.get('image').value);
  }

  Select() {

    const send = {
      from: 'users_information',
      fields: '*',
      where: {}
    };

    send.where['id_users_information'] = '1';
    // ${this.environments.api}/${this.environments.prefix}/${this.environments.db}/`

    this.api
      .insert(`/${this.environments.prefix}/${this.environments.dbAccess}/select`, send)

      .subscribe(
        (info: any) => {
          this.info = info.data[0];
          // console.log("TCL: AppConfigComponent -> Select -> this.info", info)

          this.UpdateForm(this.info);


        },
        err => console.error('Ops: ' + err.message),
        () => {
          console.log('Complete: ');
        }
      );
  }


  /**
   * Update
   *
   * @returns
   * @memberof AppConfigComponent
   */
  updateConfig() {
    const send = {
      update: this.table,
      set: this.form.value,
      where: {}
    };

    send.where[this.idTable] = this.idValue;

    this.api
      .update(
        `/${this.environments.prefix}/${this.environments.dbAccess}/edit`,
        send
      )
      .subscribe(
        (response: any) => {
          // console.log("TCL: AppConfigComponent -> update -> response", response)

          this.Select();
        },
        err => {
          console.error('Error occured.', err);
        }
      );
  }


  /**
   *  ////////////// TAB 2 //////////////////
   */


  /**
   * Update
   *
   * @returns
   * @memberof AppConfigComponent
   */
  /**
   *
   *
   * @memberof LoginChangePassComponent
   */
  changePass() {
    this.loading = true;
    // utiliza la peticion al api general
    this.api.insert('/auth/changePassword', this.formChangePassword.value).subscribe(
      (response: any) => {

        console.log(response);
        console.log(response.status);

        if (response.status) {

          this.snackBar.open(`Message: Bienvenido`, 'Cerrar', {
            duration: 3000
          });

        } else {

          this.snackBar.open(`Ocurrio un Error: los datos no coinciden`, 'Cerrar', {
            duration: 3000
          });

        }


        // loading
        this.loading = false;


      },
      err => {
        this.loading = false;
        console.error('Error occured.', err);
        this.snackBar.open(`Ocurrio un Error: ${err.error.message}`, 'Cerrar', {
          duration: 3000
        });


      }
    );

  }



  ngOnInit() {
    console.log('component ini');
    this.Select();

    $(document).ready(function () {


      /*
    jQuery('input[type=file]').change(function(e){

      console.log('input file');

      let filename: any = '';

       //filename = jQuery(this).val().split('\\').pop();
       //fileName = e.target.files[0].name;
       // filename = jQuery(this).val();

       console.log("TCL: AppConfigComponent -> ngOnInit -> filename", filename)

      var idname = jQuery(this).attr('id');
      console.log(jQuery(this));
      console.log(filename);
      console.log(idname);
      //jQuery('span.'+idname).next().find('span').html(filename);
      jQuery('span.'+idname).html(filename);
     });
     */


    });


  }

}
