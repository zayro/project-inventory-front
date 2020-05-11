import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class TranslateService {
	public es;
	public en;
	public locale;

	constructor() {
    // Spanish
		this.es = {
			PLUGINS: {
				dataTable: {
					lang: "assets/i18n/datable/es.json",
				},
			},
			TITLES: {
				add_record: "Add record",
				update_record: "Update record",
				delete_record: "Delete record",
				list_record: "List record",
			},
			VALIDATION: {
				field_required: "Campo Requerido",
				field_invalid: "Campo Invalidado",
			},
			FORM: {
				user: 'Digite usuario',
				user_email: 'Digite email o usuario',
				email: 'Digite email',
				password: 'Digite clave',
				new_pass: "Digite nueva clave",	
				chechk_pass: "Digite verificacion de clave",	
				full_name: 'Digite nombre completo',
				first_name: "primer nombre",
				second_name: "Digite segundo nombre",
				first_surname: "Digite primer apellido",
				second_surname: "Digite segundo apellido",
				phone: "Digite telefono"			

			},
			BUTTON: {
				login: "INGRESO",
				send: "ENVIAR",
				cancel: "CANCELAR",
				edit: "editar",
				add: "agregar",
				delete: "eliminar",
				clear: "limpiar",
				clear_file: "clear file",
			},
			HOME: {
				slogan: "GENTE UTIL (EMPRESAS)",
				TITLE: "Hello Angular with ngx-translate!",
				SELECT: "Change language",
			},
			MODULES: {
				login: {
					title: "Autenticacion",
				},
				config: {
					title_tab1: "Configuracion",
					title_tab2: "Cambiar Clave",
					title_tab3: "Recuperar Clave",
					title_tab4: "Cambiar Menu",
				},
			},
			MENU: {
				home: { title: "Inicio" },
				audit: {
					title: "Auditoria",
					table: {
						process: "proceso",
						message: "mensaje",
					},
				},
				config: {
					title: "Configuracion",
				},
			},
		};

    // English
		this.en = {
			PLUGINS: {
				dataTable: {
					lang: "assets/i18n/datable/en.json",
				},
			},
			TITLES: {
				add_record: "Add record",
				update_record: "Update record",
				delete_record: "Delete record",
				list_record: "List record",
			},
			VALIDATION: {
				field_required: "required field",
				field_invalid: "invalid field",
			},
			BUTTON: {
				login: "LOGIN",
				send: "SEND",
				cancel: "CANCEL",
				edit: "edit",
				add: "add",
				delete: "delete",
				clear: "clear",
				clear_file: "clear file",
			},
			HOME: {
				slogan: "ZAVWEB",
				TITLE: "Hello Angular with ngx-translate!",
				SELECT: "Change language",
			},
			MODULES: {
				LOGIN: {
					title: "Authentication",
				},
				config: {
					title_tab1: "Configuration",
					title_tab2: "Change Password",
					title_tab3: "Change Menu",
				},
			},
			FORM: {
				first_name: "first name",
				second_name: "second name",
				first_surname: "first surname",
				second_surname: "second surname",
				phone: "phone",
			},

			MENU: {
				home: { title: "Home" },
				audit: {
					title: "Audit",
					table: {
						process: "process",
						message: "message",
						user: "user",
					},
				},
				config: {
					title: "Configuration",
				},
			},
		};
	}

	public setTranslate(value) {
		switch (value) {
			case "es":
				this.locale = this.es;
				break;
			case "en":
				this.locale = this.en;
				break;
			default:
				console.log(
					"Lo lamentamos, por el momento no disponemos de " + value + "."
				);
		}
	}
}
