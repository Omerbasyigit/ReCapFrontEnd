import { DomElementSchemaRegistry } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  car:Car
  carAddForm:FormGroup
  carUpdateForm:FormGroup
  brandFilter:number=0;
  colorFilter:number=0;
   colors:Color[]=[]
   brands:Brand []=[]
   filterText="";
   currentCar:Car={carId:0,colorId:0,brandId:0,carImages:[],colorName:"",brandName:"",dailyPrice:0,description:"",modelYear:0}
   cars:Car[]=[]
   
   constructor(private carService:CarService, private activatedRoute:ActivatedRoute ,private colorService:ColorService, 
    private brandService:BrandService,private formBuilder:FormBuilder,private toastrService:ToastrService) { }
 
   ngOnInit(): void {
     this.activatedRoute.params.subscribe(params=>{
        if(params["brandId"],params["colorId"]){
         
         this.getAllByBrandAndColorId(params["brandId"],params["colorId"])
         this.getAllBrand();
         this.getAllColor();
         this.createCarAddForm()
       }
       
       else{
         this.getCarDetails();
         this.getAllBrand();
         this.getAllColor();
         this.createCarAddForm()
         
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
    createCarAddForm(){
      this.carAddForm=this.formBuilder.group({
        brandId:["",Validators.required],
        colorId:["",Validators.required],
        modelYear:["",Validators.required],
        dailyPrice:["",Validators.required],
        description:["",Validators.required]
      })
    }


    addCar(){
      if(this.carAddForm.valid){
       let car=Object.assign({},this.carAddForm.value)
       this.carService.addCar(car).subscribe(response=>{
         this.toastrService.success(response.message)
       },responseError=>{
         if(responseError.error.ValidationErrors.length>0){
           for(let i=0;i<responseError.error.ValidationErrors.length;i++){
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage)
            console.log(responseError)
           }
         }
       })
      }else{
        this.toastrService.error("Lütfen boş alanları doldurunuz.")
      }
     }
     deleteCar(){
    
      this.carService.deleteCar(this.currentCar).subscribe(response=>{
        this.toastrService.success(response.message)
      },responeError=>{
        if(this.currentCar==undefined){
          this.toastrService.error(responeError)
          
        }
      })
     }

}
