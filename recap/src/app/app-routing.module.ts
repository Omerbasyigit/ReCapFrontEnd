import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { LoginGuard } from './guards/login.guard';
import { HomeComponent } from './ui/components/home/home.component';

const routes: Routes = [

  {path:"",component:HomeComponent},
  {path:"cars",loadChildren:()=>import("./ui/components/cars/cars.module").then(module=>module.CarsModule)},
  {path:"rentals",loadChildren:()=>import("./ui/components/rentals/rentals.module").then(module=>module.RentalsModule)},
  {path:"creditcards",loadChildren:()=>import("./ui/components/credit-cards/credit-cards.module").then(module=>module.CreditCardsModule)},
  {path:"register",loadChildren:()=>import("./ui/components/register/register.module").then(module=>module.RegisterModule)},
  {path:"login",loadChildren:()=>import("./ui/components/login/login.module").then(module=>module.LoginModule)},
  {path:"profile",loadChildren:()=>import("./ui/components/profile/profile.module").then(module=>module.ProfileModule)},

  {path:"admin",component:LayoutComponent,canActivate:[LoginGuard],children:[
    {path:"",component:DashboardComponent},
    {path:"customers",loadChildren:()=>import("./admin/components/customers/customers.module").then(module=>module.CustomersModule)},
    {path:"cars",loadChildren:()=>import("./admin/components/cars/cars.module").then(module=>module.CarsModule)},
    {path:"brands",loadChildren:()=>import("./admin/components/brands/brands.module").then(module=>module.BrandsModule)},
    {path:"colors",loadChildren:()=>import("./admin/components/colors/colors.module").then(module=>module.ColorsModule)},
    {path:"rentals",loadChildren:()=>import("./admin/components/rentals/rentals.module").then(module=>module.RentalsModule)}
  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
