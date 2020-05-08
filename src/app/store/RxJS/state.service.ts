import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class StateService {


  public config;
  public user;

  constructor() {

    if (sessionStorage.getItem('user')) {
      this.user = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('user')));
    } else {
      const conf: any = {
        info: {first_name: 'marlon', last_name:'arias'},
        menu: []
       }  ;
      sessionStorage.setItem('user', JSON.stringify(conf));
      this.user = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('user')));
      //this.user = new BehaviorSubject<any>('');
    }


    if (localStorage.getItem('config')) {
      this.config = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('config')));
    } else {
      const conf = {shutdown: false, locale: 'es'};
      localStorage.setItem('config', JSON.stringify(conf));
      this.config = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('config')));

    }

  }


  /**
   * Info user
   * @param data
   */

  setUser(key: any, value: any){

    let info: any = {};

    if(sessionStorage.getItem('user')) {

      info = JSON.parse(sessionStorage.getItem('user'));

    }

    info[key] = value;

    console.log('%c localStorage user' , 'background: #222; color: #bada55' , JSON.stringify(info));
    console.log('%c setUser' , 'background: #222; color: #bada55' , info);

    sessionStorage.setItem('user', JSON.stringify(info));



    this.user.next(info);
    //this.info_user.complete();
  }

  editUser(key: any, value: any, newValue: any){

    let info: any = [];

    if(sessionStorage.getItem('user')) {

      info = JSON.parse(sessionStorage.getItem('user'));


      const result = info.filter(user => {
         if(user[key] == value) {
           return  user[key] = newValue;
         }
      });

      console.log('%c localStorage user' , 'background: #222; color: #bada55' , JSON.stringify(info));
      console.log('%c setUser' , 'background: #222; color: #bada55' , info);

      sessionStorage.setItem('user', JSON.stringify(info));

      this.user.next(info);

      //this.info_user.complete();

    }


  }

  deleteUser(key: any, value: any){

    let info: any = [];

    if(sessionStorage.getItem('user')) {

      info = JSON.parse(sessionStorage.getItem('user'));


      const result = info.filter(user => user[key] !== value);

      //  delete info[0][key];

      console.log('%c deleteUser' , 'background: #222; color: #bada55' , result);

      sessionStorage.setItem('user', JSON.stringify(result));

      this.user.next(result);
      //this.info_user.complete();


    }


  }

  getUser(){
    //return this.user.subscribe(val => console.log(val));
    return this.user.asObservable();
  }

  clearUser() {
    sessionStorage.clear()
    this.user.next();
}



/**
 * Configuration
 * @param data
 */
  setConfig(data: any) {

    sessionStorage.setItem('userConfig', JSON.stringify(data));
    this.config.next(data);
    //this.info_user.complete();
  }

  getConfig(){
    //return this.user.subscribe(val => console.log(val));
    return this.config.asObservable();
  }


  ClearConfig() {
    this.config.next();
}


}
