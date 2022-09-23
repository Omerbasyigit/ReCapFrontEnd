import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,FormControl, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  color:Color
  colorUpdateForm:FormGroup
  constructor(private formBuilder:FormBuilder,private toastrService:ToastrService, 
    private colorService:ColorService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["colorId"]){
        this.getColorDetailByColorId(params["colorId"])
        this.createColorUpdateForm()
      }
    })
  }

  createColorUpdateForm(){
    this.colorUpdateForm=this.formBuilder.group({
      colorName:["",Validators.required]

    })
  }
updateColor(){
  if(this.colorUpdateForm.valid){
    let color=Object.assign({colorId:this.color.colorId},this.colorUpdateForm.value)
    this.colorService.updateColor(color).subscribe(response=>{
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
  getColorDetailByColorId(colorId:number){
    this.colorService.getColorById(colorId).subscribe(response=>{
      this.color=response.data;
      
    })
  }
}
