import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.css']
})
export class ColorsComponent implements OnInit {

 colorAddForm:FormGroup
  colorFilter="";
  currentColor:Color={colorId:0,colorName:""}
  colors:Color[]=[]
  constructor(private colorService:ColorService,private formBuilder:FormBuilder
    ,private activatedRoute:ActivatedRoute,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getAllColors();
    this.createColorAddForm();
  }

  getAllColors(){
    this.colorService.getAllColors().subscribe(response=>{
      this.colors=response.data
    })
  }
  setCurrentColor(color:Color){
    this.currentColor=color
   }
   getCurrentColor(color:Color){
     if(color==this.currentColor){
       return "table-group-item active"
     }
     else{
       return "table-group-item"
     }
   }
   getAllByColorId(){
     if(!this.currentColor){
       return "table-group-item active"
     }
     else{
       return "table-group-item"
     }
   }
   createColorAddForm(){
    this.colorAddForm=this.formBuilder.group({
      colorName:["",Validators.required],
    })
  }
  addColor(){
    if(this.colorAddForm.valid){
     let color=Object.assign({},this.colorAddForm.value)
     this.colorService.addColor(color).subscribe(response=>{
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
   deleteColor(){
  
    this.colorService.deleteColor(this.currentColor).subscribe(response=>{
      this.toastrService.success(response.message)
    },responeError=>{
      if(this.currentColor==undefined){
        this.toastrService.error(responeError)
        
      }
    })
   }

}
