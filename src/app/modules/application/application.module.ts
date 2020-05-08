import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { EntriesComponent } from './entries/entries.component';
import { OutletsComponent } from './outlets/outlets.component';


@NgModule({
  declarations: [ HomeComponent, EntriesComponent, OutletsComponent],
  imports: [
    CommonModule
  ],
  exports: [
     HomeComponent
  ]
})
export class applicationModule { }
