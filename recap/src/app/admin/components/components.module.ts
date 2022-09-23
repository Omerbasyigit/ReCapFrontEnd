import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentalsModule } from './rentals/rentals.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CustomersModule } from './customers/customers.module';
import { CarsModule } from './cars/cars.module';
import { BrandsModule } from './brands/brands.module';
import { ColorsModule } from './colors/colors.module';







@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ColorsModule,
    RentalsModule,
    DashboardModule,
    CustomersModule,
    CarsModule,
    BrandsModule,

    
  ],
  exports:[]
})
export class ComponentsModule { }
