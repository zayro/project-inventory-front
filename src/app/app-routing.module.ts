import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";


// AuthguardGuard
import { AuthguardGuard } from "./services/http-auth.guard";

/**
 * Module Auth
 */
import { LoginComponent } from "./modules/auth/login/login.component";
import { TestComponent } from "./modules/auth/test/test.component";

/**
 * Module APlication
 */
import { HomeComponent } from "./modules/application/home/home.component";
import { EntriesComponent } from "./modules/application/entries/entries.component";
import { WarehouseComponent } from "./modules/application/warehouse/warehouse.component";

import { ProductComponent } from "./modules/application/product/product.component";
import { AddComponent } from "./modules/application/product/add/add.component";
import { EditComponent } from "./modules/application/product/edit/edit.component";

import { SupplierComponent } from "./modules/application/supplier/supplier.component";
import { AddSupplierComponent } from "./modules/application/supplier/add-supplier/add-supplier.component";
import { EditSupplierComponent } from "./modules/application/supplier/edit-supplier/edit-supplier.component";


import { CustomerComponent } from "./modules/application/customer/customer.component";
import { AddCustomerComponent } from "./modules/application/customer/add-customer/add-customer.component";
import { EditCustomerComponent } from "./modules/application/customer/edit-customer/edit-customer.component";

const routes: Routes = [
	{ path: "login", component: LoginComponent },
	{ path: "home", component: HomeComponent, canActivate: [AuthguardGuard] },
	{ path: "entries", component: EntriesComponent },
	{ path: "warehouse", component: WarehouseComponent },
	{
		path: "supplier", component: SupplierComponent,
		children: [
			// {path: '', redirectTo: 'table-export', pathMatch: 'full'},
			{
				path: 'add', // la ruta real es movimientos/nuevo
				component: AddSupplierComponent
			},
			{
				path: 'edit/:id', // la ruta real es movimientos/editar
				component: EditSupplierComponent,
				data: { title: 'Editar', action: 'update' }
			},
			{
				path: 'delete/:id', // la ruta real es movimientos/nuevo
				component: ProductComponent
			},
			{ path: '', redirectTo: '', pathMatch: 'full' }
		]
	},
	{
		path: "customer", component: CustomerComponent,
		children: [
			// {path: '', redirectTo: 'table-export', pathMatch: 'full'},
			{
				path: 'add', // la ruta real es movimientos/nuevo
				component: AddCustomerComponent
			},
			{
				path: 'edit/:id', // la ruta real es movimientos/editar
				component: EditComponent,
				data: { title: 'Editar', action: 'update' }
			},
			{
				path: 'delete/:id', // la ruta real es movimientos/nuevo
				component: EditCustomerComponent
			},
			{ path: '', redirectTo: '', pathMatch: 'full' }
		]
	}, {
		path: 'product',
		component: ProductComponent,
		children: [
			// {path: '', redirectTo: 'table-export', pathMatch: 'full'},
			{
				path: 'add', // la ruta real es movimientos/nuevo
				component: AddComponent
			},
			{
				path: 'edit/:id', // la ruta real es movimientos/editar
				component: EditComponent,
				data: { title: 'Editar', action: 'update' }
			},
			{
				path: 'delete/:id', // la ruta real es movimientos/nuevo
				component: ProductComponent
			},
			{ path: '', redirectTo: '', pathMatch: 'full' }
		]
	},
	{ path: "test", component: TestComponent },
	{
		path: "**",
		redirectTo: "login",
		pathMatch: "full",
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	//imports: [RouterModule.forChild(routes)],	
	exports: [RouterModule],
})
export class AppRoutingModule { }
