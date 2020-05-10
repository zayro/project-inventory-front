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

const routes: Routes = [
	{ path: "login", component: LoginComponent },
	{ path: "home", component: HomeComponent, canActivate: [AuthguardGuard] },
	{ path: "entries", component: EntriesComponent },
	{ path: "test", component: TestComponent },
	{
		path: "**",
		redirectTo: "login",
		pathMatch: "full",
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
