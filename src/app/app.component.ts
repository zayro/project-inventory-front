import { Component, OnInit, OnChanges, SimpleChanges, LOCALE_ID, Inject, Injector } from "@angular/core";

import {
	BreakpointObserver,
	Breakpoints,
	BreakpointState,
} from "@angular/cdk/layout";


import {
	ActivatedRoute,
	Router,
	NavigationStart,
	NavigationError,
	NavigationEnd
  } from '@angular/router';
  

import { Observable } from "rxjs";

import { FormControl } from "@angular/forms";
// import change theme
import { OverlayContainer } from "@angular/cdk/overlay";

import { GeneralService } from "./services/general.service";

import { UserInformation } from './interface/general.interface';

interface infos {
	menu: any[],
	info: any
}
@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent extends GeneralService implements OnInit, OnChanges {
	isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(
		Breakpoints.Handset
	);

	public active_icon;
	mode = new FormControl('over');
	public theme;
	public config: any = {
		infoUser: {},
		shutdown: false,
		menuLateral: []
	};

	user$: UserInformation;
	menu$: any;

	languageList = [
		{ code: "en", label: "English" },
		{ code: "es", label: "Espanol" },
	];

	isToggled: boolean;

	constructor(
		@Inject(LOCALE_ID) protected localeId: string,
		//@Inject(LoggerService) private loggerService,
		//private productService : ProductService,
		//@Inject('PRODUCTSERVICE') private prdService:ProductService,
		private injector: Injector,
		private breakpointObserver: BreakpointObserver,
		public overlayContainer: OverlayContainer

	) {

		super(injector);

		console.log(localeId, LOCALE_ID);

		this.translate.setTranslate('es');

		this.isHandset.subscribe((resp) => console.log('isHandset', resp));

		this.StateService.getUser().subscribe(message => {
			console.log("AppComponent -> getUser", message)

			//this.user$ = message.info;
			this.menu$ = message;
			this.user$ = message.info[0];
		})

		this.StateService.getConfig().subscribe(message => {
			console.log("AppComponent -> getConfig", message)

			//this.user$ = message.info;
			this.config = message;

		})		

		this.router.events.subscribe(event => {
			if (event instanceof NavigationStart) {
			  // Show loading indicator
			  console.log('NavigationStart', event);
			}
	  
			if (event instanceof NavigationEnd) {
			  // Hide loading indicator
			  console.log('NavigationEnd', event);
			  
			}
	  
			if (event instanceof NavigationError) {
			  // Hide loading indicator
			  // Present error to user
			  console.log('NavigationError', event.error);
			}
		  });

		  console.log('current router',this.router.url);
		  console.log('current config', this.config );
	}


	toggleState() {
		this.isToggled = !this.isToggled;
        console.log("AppComponent -> toggleState -> this.isToggled", this.isToggled)
		
	}

	changeTheme(color) {
		this.theme = color;
	}

	ChangeTranslate(value) {
		this.translate.setTranslate(value);
	}


	closeSession() {
		localStorage.clear();
		localStorage.removeItem('config');
		this.StateService.setConfig({ shutdown: false});
		this.router.navigate(['login']);
	}

	ngOnInit() {
		console.log("component initialized");
		//this.overlayContainer.getContainerElement().classList.add(this.theme);
	}

	ngOnChanges(changes: SimpleChanges) {
		console.log("TCL: NavbarComponent -> ngOnChanges -> changes", changes);

		if (changes.theme && !changes.theme.isFirstChange()) {
			console.log(
				"TCL: NavbarComponent -> ngOnChanges -> changes.theme ",
				changes.theme
			);
		}
	}
}
