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
        location: '住家'
    },
    {
        name:'午餐',
        time:{
            hour: 12,
            min:0
        },
        location: '公司'
    },
    {
        name:'晚餐',
        time:{
            hour: 18,
            min:0
        },
        location: '住家'
    }

];