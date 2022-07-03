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
    imgURL:string
    place_id:string,
    name:string,
    score:number,
    location:{
      lat:number,
      lng:number
    },
    corrwith:number,
    address:string,
    photo_id:string,
    tag:string,
    url:string
  }
  export interface DecideRes{
    meal:string,
    recommands:Restaurant[]
  }
  export interface Location{
    lat:number,
    lng:number
  }
  export interface RestaurantStyle {
    name:string,
    url:string
  }