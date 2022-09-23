import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import {MatListModule} from '@angular/material/list';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
  MatListModule
  ]
})
export class DashboardModule { }
