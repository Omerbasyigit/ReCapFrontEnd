import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  currentCar: Car;
  filterText="";
  brandFilter:number=0
  colorFilter:number=0
  colors:Color[]=[]
  brands:Brand[]=[]
  cars:Car[]=[]
  constructor(private carService:CarService,private brandService:BrandService,private colorService:ColorService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"],params["colorId"]){
       
       this.getAllByBrandAndColorId(params["brandId"],params["colorId"])
       this.getAllBrand();
       this.getAllColor();
      }
     else{
       this.getCarDetails();
       this.getAllBrand();
       this.getAllColor();
     }
   })
  }

  getCarDetails(){
    this.carService.getAllDetails().subscribe(response=>{
      this.cars=response.data
    })
  }
  getAllByColorId(colorId:number){
    this.carService.getAllByColorId(colorId).subscribe(response=>{
      this.cars=response.data;
    })
  }
  getAllByBrandId(brandId:number){
    this.carService.getAllByBrandId(brandId).subscribe(response=>{
      this.cars=response.data;
    })
  }
  getAllColor(){
    this.colorService.getAllColors().subscribe(response=>{
      this.colors=response.data
    })
  }
  getAllBrand(){
    this.brandService.getAllBrands().subscribe(response=>{
      this.brands=response.data
    })
  }
  getAllByBrandAndColorId(brandId:number,colorId:number){
    if(brandId==0){
      this.getAllByColorId(colorId)
    }
    else if(colorId==0){
      this.getAllByBrandId(brandId)
    }
    else{
      this.carService.getAllByBrandAndColorId(brandId,colorId).subscribe(response=>{
        this.cars=response.data
      })
    }
 
  }
 
  setCurrentCar(car:Car){
    this.currentCar=car
    console.log(car.carId)
   }
   getCurrentCar(car:Car){
     if(car==this.currentCar){
       
       return "table-group-item active"
     }
     else{
       return "table-group-item"
     }
   }
     getAllDetails(){
     if(!this.currentCar){
       return "table-group-item active"
     }
     else{
       return "table-group-item"
     }
   }
   getSelectedBrand(brandId:number){

    if(this.brandFilter==brandId){
      return true;
      
    }
    else{return false;}
   }

   getSelectedColor(colorId:number){
    if(this.colorFilter==colorId){
      return true;
    }
    else{return false;}
   }
}
