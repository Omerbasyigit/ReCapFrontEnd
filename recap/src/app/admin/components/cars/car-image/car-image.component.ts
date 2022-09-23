import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxFileDropEntry,FileSystemDirectoryEntry,FileSystemFileEntry } from 'ngx-file-drop';
import { ToastrService } from 'ngx-toastr';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { __assign } from 'tslib';

@Component({
  selector: 'app-car-image',
  templateUrl: './car-image.component.html',
  styleUrls: ['./car-image.component.css']
})
export class CarImageComponent implements OnInit {

  file:File
  carId:number
  imageAddForm:FormGroup
  currentImageId:number
  carImages:CarImage[]=[]
  constructor(private carImageService:CarImageService, private activatedRoute:ActivatedRoute,private toastrService:ToastrService,
    private formBuilder:FormBuilder,) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getImagesByCarId(params["carId"])
        this.carId=params["carId"]
        console.log(this.carId)
        this.createImageAddForm()
      }
    })
  }
  getImagesByCarId(carId:number){
    this.carImageService.getImagesByCarId(carId).subscribe(response=>{
      this.carImages=response.data

      
    })
  }

  createImageAddForm() {
    this.imageAddForm = this.formBuilder.group({
      file: [null],
    });
  }
 
  uploadFile(event:any) {
    const carImage = (event.target as HTMLInputElement).files[0];
    this.imageAddForm.patchValue({
      file: carImage
    });
    this.imageAddForm.get('file').updateValueAndValidity()
  }
  submitForm() {
    if(this.imageAddForm.valid){
      var formData: any = new FormData();
      formData.append("file", this.imageAddForm.get('file').value);
      formData.append("CarId", this.carId);
      this.carImageService.upload(formData).subscribe(response=>{
        this.toastrService.success(response.message);
       
      },error=>{
        this.toastrService.error(error.error.message);
      })
    }else{
      this.toastrService.error('Form Bilgileriniz Eksik');
    }

  }
  
  delete(carImage:CarImage){
    this.carImageService.deleteImage(carImage).subscribe(response=>{
      this.toastrService.success(response.message);
    })
    
  }
}
