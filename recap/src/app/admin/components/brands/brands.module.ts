import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandsComponent } from './brands.component';
import { RouterModule } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ToastrModule } from 'ngx-toastr';
import { BrandUpdateComponent } from './brand-update/brand-update.component';
import { LoginGuard } from 'src/app/guards/login.guard';


@NgModule({
  declarations: [
    BrandsComponent,
    BrandUpdateComponent
  ],
  imports: [
    CommonModule,
     ReactiveFormsModule,
    PipesModule,
    RouterModule.forChild([
      {path:"",component:BrandsComponent,canActivate:[LoginGuard]},
      {path:"update/:brandId",component:BrandUpdateComponent}
      
    ]),
    MatListModule,
    MatSidenavModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    
  ],exports:[
    BrandsComponent
  ],
  
})
export class BrandsModule { }
