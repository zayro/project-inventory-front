import { Component, OnInit, OnChanges, SimpleChanges, LOCALE_ID, Inject, Injector } from "@angular/core";

import {
	BreakpointObserver,
	Breakpoints,
	BreakpointState,
} from "@angular/cdk/layout";

import { Observable } from "rxjs";

import { FormControl } from "@angular/forms";
// import change theme
import { OverlayContainer } from "@angular/cdk/overlay";


import { GeneralService } from "./services/general.service";

interface infos  {
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
    shutdown: true,
    menuLateral: []
  };

  user$ : any;

  languageList = [
	{ code: "en", label: "English" },		
	{ code: "es", label: "Espanol" },
];

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

	


    this.isHandset.subscribe((resp) => console.log(resp));
    
    this.StateService.getUser().subscribe(message => {
      this.user$ = message;
    })
  }


  changeTheme(color) {
    this.theme = color;
  }

  ChangeTranslate(value){
		this.translate.setTranslate(value);
  }


  closeSession() {
    localStorage.clear();
    localStorage.removeItem('config');
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
