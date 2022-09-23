import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsModule } from './cars/cars.module';
import { HomeModule } from './home/home.module';
import { RentalsModule } from './rentals/rentals.module';
import { RouterModule } from '@angular/router';
import { CreditCardsModule } from './credit-cards/credit-cards.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { ProfileModule } from './profile/profile.module';






@NgModule({
  declarations: [
  
  ],
  imports: [
    CommonModule,
    HomeModule,
    RentalsModule,
    RouterModule,
    CarsModule,
    CreditCardsModule,
    RegisterModule,
    LoginModule,
    ProfileModule,

  ]

  
})
export class ComponentsModule { }
