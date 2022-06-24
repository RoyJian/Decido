export interface Meal{
    name:string,
    time:{
      hour:number,
      min:number
    },
    location:{
      name:string,
      lat:number,
      lng:number
    }
  }