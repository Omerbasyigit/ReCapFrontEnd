import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsComponent } from './cars.component';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { CarImageComponent } from './car-image/car-image.component';



@NgModule({
  declarations: [
    CarsComponent,
    CarDetailComponent,
    CarImageComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    
    RouterModule.forChild([
      {path:"",component:CarsComponent},
      {path:"brand/:brandId/color/:colorId",component:CarsComponent},
      {path:"cardetail/:carId",component:CarDetailComponent},
      
    ])
  ]
})
export class CarsModule { }
