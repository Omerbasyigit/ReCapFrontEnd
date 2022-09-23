import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorsComponent } from './colors.component';
import { RouterModule } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { ColorUpdateComponent } from './color-update/color-update.component';




@NgModule({
  declarations: [
    ColorsComponent,
    ColorUpdateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:ColorsComponent},
      {path:"update/:colorId",component:ColorUpdateComponent}
    ]),
    MatListModule,
    MatSidenavModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class ColorsModule { }
