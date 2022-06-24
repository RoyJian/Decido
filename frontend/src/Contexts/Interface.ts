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

  export interface Restaurant{
    title:string,
    score:number,
    address:string,
    imgURL:string
  }
  export interface DecideRes{
    meal:string,
    recommands:Restaurant[]
  }