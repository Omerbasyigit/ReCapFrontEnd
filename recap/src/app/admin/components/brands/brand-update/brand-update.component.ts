import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl ,Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  brand:Brand
  brandUpdateForm:FormGroup
  constructor(private brandService:BrandService,private formBuilder:FormBuilder,
    private toastrService:ToastrService,private activatedRoute:ActivatedRoute) { }

    
    ngOnInit(): void {
      this.activatedRoute.params.subscribe(params=>{
        if (params["brandId"]){
          this.getBrandDetailByBrandId(params["brandId"])
          this.createBrandUpdateForm()
        }
        
      })
    }
  
    createBrandUpdateForm(){
      this.brandUpdateForm=this.formBuilder.group({
        brandName:["",Validators.required]

      })
    }
  updateBrand(){
    if(this.brandUpdateForm.valid){
      let brand=Object.assign({brandId:this.brand.brandId},this.brandUpdateForm.value)
      this.brandService.updateBrand(brand).subscribe(response=>{
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
    getBrandDetailByBrandId(brandId:number){
      this.brandService.getBrandDetailByID(brandId).subscribe(response=>{
        this.brand=response.data;
        
      })
    }
}
