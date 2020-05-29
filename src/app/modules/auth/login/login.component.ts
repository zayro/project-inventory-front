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
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
})
export class LoginComponent extends GeneralService implements OnInit {

	/**
	 * INITIAL VAR
	 */
	public formSend: FormGroup;
	public formRecovery: FormGroup;
	public redirect: Boolean;
	public loading: Boolean = false;

	// Var Route
	private table: string;

	constructor(
		injector: Injector
	) {
		super(injector);
		
		this.table = this.environments.module.login.view;

		this.formSend = this.formBuild.group({
			user: ["", [Validators.required]],
			password: ["", [Validators.required, Validators.minLength(6)]],
		});

		this.formRecovery = this.formBuild.group({
			email: ["", [Validators.required]]
		});

		this.translate.setTranslate('es');

	}

	/**
	 *
	 *
	 * @param {string} message
	 * @param {string} action
	 * @memberof LoginComponent
	 */
	openSnackBar(message: string, action?: string) {
		this.snackBar.open(message, action, {
			duration: 2000,
		});
	}

	/**
	 *
	 *
	 * @memberof LoginComponent
	 */
	menu(data: any) {
		const select = {
			from: 'view_privileges',
			fields: "*",
			where: { username: data },
		};

		this.api.insert("/api/access/select", select).subscribe(
			(response: any) => {
				if (response.status) {
					
					this.StateService.setUser("menu", response.data);
				}
			},
			(err) => {
				this.loading = false;
				console.error("Error occured.", err);
			}
		);
	}


	/**
	 *
	 *
	 * @memberof LoginComponent
	 */
	infoUser(data: string) {
		const select = {
			from: "view_information_users",
			fields: "*",
			where: { username: data },
		};

		this.api.insert("/api/access/select", select).subscribe(
			(response: any) => {
				console.log("TCL: infoUser -> response", response);

				if (response.status) {
					this.StateService.setUser("info", response.data);
					this.StateService.setConfig({ shutdown: true});
				}
			},
			(err) => {
				this.loading = false;
				console.error("Error occured.", err);
			}
		);
	}

	/**
	 *
	 *
	 * @memberof LoginComponent
	 */
	login() {
		this.loading = true;
		// utiliza la peticion al api general
		this.api.insert("/auth/login", this.formSend.value).subscribe(
			(response: any) => {
				console.log(response);
				console.log(response.status);

				if (response.status) {
					// almacenamos token
					localStorage.setItem("token", response.token);
					// consulta permisos del menu
					this.menu(this.formSend.get("user").value);
					// search information user
					this.infoUser(this.formSend.get("user").value);
					// redirecciona
					this.router.navigate(["home"]);
				}

				// loading
				this.loading = false;

				this.openSnackBar(`Message: Bienvenido`, "Cerrar");
			},
			(err) => {
				this.loading = false;
				console.error("Error occured.", err);
				this.openSnackBar(`Datos no validos para el accesso`);
			}
		);
	}

	recovery() {
		this.loading = true;
		// utiliza la peticion al api general
		this.api.insert("/auth/recoveryPassword", this.formRecovery.value).subscribe(
			(response: any) => {
				console.log(response);
				console.log(response.status);

				if (response.status) {
					this.router.navigate(["login"]);
				}

				// loading
				this.loading = false;

				this.openSnackBar(`Correo enviando`, "Cerrar");
			},
			(err) => {
				this.loading = false;
				console.error("Error occured.", err);
				this.openSnackBar(`ocurrio un problema al enviar el correo`);
			}
		);
	}	

	/**
	 *
	 *
	 * @memberof LoginComponent
	 */
	ngOnInit() {
		if (this.jwt.isTokenExpired) {
			this.router.navigate(["home"]);
		}
	}
}
