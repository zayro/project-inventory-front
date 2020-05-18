import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from "@angular/router";


import { HomeComponent } from './home/home.component';
import { EntriesComponent } from './entries/entries.component';
import { OutletsComponent } from './outlets/outlets.component';
import { ReportsComponent } from './reports/reports.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../material-module';
import { ProductComponent } from './product/product.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { AddComponent } from './product/add/add.component';
import { EditComponent } from './product/edit/edit.component';
import { DeleteComponent } from './product/delete/delete.component';

/**
 * Components Aplication
 */

@NgModule({
  declarations: [HomeComponent, EntriesComponent, OutletsComponent, ReportsComponent, WarehouseComponent, ProductComponent, AddComponent, EditComponent, DeleteComponent],
  imports: [
    CommonModule,
    // Form
    FormsModule,
    ReactiveFormsModule,
    // Material
    MaterialModule,
    // Route
    RouterModule
  ],
  exports: [
    // Form
    FormsModule,
    ReactiveFormsModule,
    // Material
    MaterialModule,

  ]
})
export class applicationModule { }
