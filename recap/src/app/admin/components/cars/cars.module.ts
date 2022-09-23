import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsComponent } from './cars.component';
import { RouterModule } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { CarImageComponent } from './car-image/car-image.component';
import { ToastrModule } from 'ngx-toastr';
import {MatTableModule} from '@angular/material/table';
import { CarUpdateComponent } from './car-update/car-update.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { LoginGuard } from 'src/app/guards/login.guard';




@NgModule({
  declarations: [
    CarsComponent,
    CarDetailComponent,
    CarImageComponent,
    CarUpdateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:CarsComponent},
      {path:"cardetail/:carId",component:CarDetailComponent},
      {path:"brand/:brandId/color/:colorId",component:CarsComponent},
      {path:"update/:carId",component:CarUpdateComponent}
    ]),
    MatListModule,
    MatSidenavModule,
    FormsModule,
    PipesModule,
    ReactiveFormsModule,
    NgxFileDropModule,
    MatTableModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
  ]
})
export class CarsModule { }
