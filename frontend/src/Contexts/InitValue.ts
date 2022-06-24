import {Meal} from './Interface';

export const restaurantStyles : string[]= [
    '韓式',
    '日式',
    '泰式',
    '歐美',
    '火鍋',
    '早午餐',
    '甜點',
];
export const initMealsArr:Meal[] = [
    {
        name:'早餐',
        time:{
            hour: 8,
            min:0
        },
        location: {
            name:'住家',
            lat:25.03950866617472,
            lng:121.53506260031203
            
        }
    },
    {
        name:'午餐',
        time:{
            hour: 12,
            min:0
        },
        location: {
            name:'公司',
            lat:25.03847474175392, 
            lng:121.53243942537702
        }
    },
    {
        name:'晚餐',
        time:{
            hour: 18,
            min:0
        },
        location: {
            name:'住家',
            lat:25.03950866617472,
            lng:121.53506260031203
        }
    }

];