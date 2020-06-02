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
import { SupplierComponent } from './supplier/supplier.component';
import { CustomerComponent } from './customer/customer.component';
import { AddSupplierComponent } from './supplier/add-supplier/add-supplier.component';
import { EditSupplierComponent } from './supplier/edit-supplier/edit-supplier.component';
import { AddCustomerComponent } from './customer/add-customer/add-customer.component';
import { EditCustomerComponent } from './customer/edit-customer/edit-customer.component';
import { InvoiceComponent } from './report/invoice/invoice.component';
import { InventoryComponent } from './report/inventory/inventory.component';
import { ConfigComponent } from './config/config.component';
import { SaleComponent } from './report/sale/sale.component';
import { PrintSaleComponent } from './reports/print-sale/print-sale.component';


/**
 * Components Aplication
 */

@NgModule({
  declarations: [HomeComponent, EntriesComponent, OutletsComponent, ReportsComponent, WarehouseComponent, ProductComponent, AddComponent, EditComponent, SupplierComponent, CustomerComponent, AddSupplierComponent, EditSupplierComponent, AddCustomerComponent, EditCustomerComponent, InvoiceComponent, InventoryComponent, ConfigComponent, SaleComponent, PrintSaleComponent],
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
