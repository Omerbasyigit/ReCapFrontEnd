import { CarImage } from "./carImage";

export interface Car{
    carId:number,
    brandId:number,
    colorId:number,
    modelYear:number,
    dailyPrice:number,
    description:string,
    colorName:string,
    brandName:string,
    carImages:CarImage[]
}