import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentalsComponent } from './rentals.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentComponent } from './payment/payment.component';
import { RoleGuard } from 'src/app/guards/role.guard';





@NgModule({
  declarations: [
    RentalsComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path:"",component:RentalsComponent,canActivate:[RoleGuard]},
      {path:"rentals/add/:carId",component:RentalsComponent,canActivate:[RoleGuard]}
    ])
  ]
})
export class RentalsModule { }
