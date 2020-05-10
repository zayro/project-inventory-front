import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MaterialModule} from '../../material-module';

/**
 * Components Auth
 */
import { LoginComponent } from './login/login.component';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [LoginComponent, TestComponent],
  imports: [
    CommonModule,
    // Form
		FormsModule,
    ReactiveFormsModule,
    // Material
    MaterialModule
  ],
  exports: [
    // Component    
  ]
})
export class AuthModule { }
