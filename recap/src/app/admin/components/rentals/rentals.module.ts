import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentalsComponent } from './rentals.component';
import { RouterModule } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';


@NgModule({
  declarations: [
    RentalsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:RentalsComponent}
    ]),
    MatListModule,
    MatSidenavModule
  ]
})
export class RentalsModule { }
