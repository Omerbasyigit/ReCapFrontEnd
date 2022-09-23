import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';



@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  brandAddForm:FormGroup
  brandFilter="";
  currentBrand:Brand={brandId:0,brandName:""}
  brands:Brand[]=[]
  brand:Brand
  constructor(private brandService:BrandService,private formBuilder:FormBuilder,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getAllBrands();
    this.createBrandAddForm();
  }
  getAllBrands(){
    this.brandService.getAllBrands().subscribe(response=>{
      this.brands=response.data
    })
  }
  setCurrentBrand(brand:Brand){
    this.currentBrand=brand
   }
   getCurrentBrand(brand:Brand){
     if(brand==this.currentBrand){
       return "table-group-item active"
     }
     else{
       return "table-group-item"
     }
   }
   getAllByBrandId(){
     if(!this.currentBrand){
       return "table-group-item active"
     }
     else{
       return "table-group-item"
     }
   }
   createBrandAddForm(){
    this.brandAddForm=this.formBuilder.group({
      brandName:["",Validators.required],
    })
  }


  addBrand(){
    if(this.brandAddForm.valid){
     let brand=Object.assign({},this.brandAddForm.value)
     this.brandService.addBrand(brand).subscribe(response=>{
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
   deleteBrand(){
  
    this.brandService.deleteBrand(this.currentBrand).subscribe(response=>{
      this.toastrService.success(response.message)
    },responeError=>{
      if(this.currentBrand==undefined){
        this.toastrService.error(responeError)
        
      }
    })
   }

}
