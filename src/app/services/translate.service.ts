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
				field_required: "required field",
				field_invalid: "invalid field",
			},
			BUTTON: {
				login: "INGRESO",
				send: "ENVIAR",
				cancel: "CANCELAR",
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
					title: "Autenticacion",
				},
				config: {
					title_tab1: "Configuracion",
					title_tab2: "Cambiar Clave",
					title_tab3: "Cambiar Menu",
				},
			},
			FORM: {
				first_name: "primer nombre",
				second_name: "segundo nombre",
				first_surname: "primer apellido",
				second_surname: "segundo apellido",
				phone: "telefono",
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
