import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { EntriesComponent } from './entries/entries.component';
import { OutletsComponent } from './outlets/outlets.component';
import { ReportsComponent } from './reports/reports.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MaterialModule} from '../../material-module';
import { ProductComponent } from './product/product.component';
import { WarehouseComponent } from './warehouse/warehouse.component';

/**
 * Components Aplication
 */

@NgModule({
  declarations: [ HomeComponent, EntriesComponent, OutletsComponent, ReportsComponent, ProductComponent, WarehouseComponent],
  imports: [
    CommonModule,
    // Form
		FormsModule,
    ReactiveFormsModule,
    // Material
    MaterialModule
  ],
  exports: [
    // Form
		FormsModule,
    ReactiveFormsModule,
     // Material
     MaterialModule,
     // componentes
     HomeComponent,
     EntriesComponent
  ]
})
export class applicationModule { }
