import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl ,Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';


@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  car:Car
  carUpdateForm:FormGroup
  constructor(private carService:CarService, private activatedRoute:ActivatedRoute 
    ,private formBuilder:FormBuilder,private toastrService:ToastrService) { }
    
    ngOnInit(): void {
      this.activatedRoute.params.subscribe(params=>{
        if (params["carId"]){
          this.getCarDetailByCarId(params["carId"])
          this.createCarUpdateForm()
        }
        
      })
    }
  createCarUpdateForm(){
    this.carUpdateForm=this.formBuilder.group({
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required]
    })
  }
  updateCar(){
    if(this.carUpdateForm.valid){
      let car=Object.assign({carId:this.car.carId},this.carUpdateForm.value)
      this.carService.updateCar(car).subscribe(response=>{
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
    getCarDetailByCarId(id:number){
      this.carService.getCarDetail(id).subscribe(response=>{
        this.car=response.data;
        localStorage.setItem("carId",this.car.carId.toString())
      })
    }
}
