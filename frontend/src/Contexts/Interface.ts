export interface Meal{
    name:string,
    time:{
      date:string,
      hour:number,
      min:number
    },
    location:{
      name:string,
      lat:number,
      lng:number
    }
  }

  export interface Restaurant{
    title:string,
    score:number,
    address:string,
    imgURL:string
    location:Location
  }
  export interface DecideRes{
    meal:string,
    recommands:Restaurant[]
  }
  export interface Location{
    lat:number,
    lng:number
  }