import {Meal,DecideRes} from './Interface';

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
export const DecideInit:DecideRes[]=[
    {
      meal:'早餐',
      recommands:[
        {
            title:'桔子早午餐',
            score:4.7,
            address:'100台北市中正區青島東路21之8號',
            imgURL:'https://lh5.googleusercontent.com/p/AF1QipMF7Rok4eVl8Prl31uox5j6_q9ntcmDcm56rEqg=w408-h306-k-no'
        },
        {
            title:'早安早點',
            score:4.4,
            address:'100台北市中正區青島東路25之1號',
            imgURL:'https://lh5.googleusercontent.com/p/AF1QipNK2mkVfZyqzx1JbV3odaXKQyZUpSEOxTRKKL_7=w408-h306-k-no'
        },
        {
            title:'雅加達漢堡專賣店',
            score:4.0,
            address:'100台北市中正區杭州南路一段10-3號',
            imgURL:'https://lh5.googleusercontent.com/p/AF1QipOps-9f1ThSa1OrcUKlv7vva2s0Bzrnj4Ztextt=w408-h306-k-no'
        }
      ]
    },
    {
        meal:'午餐',
        recommands:[
            {
                title:'Broccoli beer韓國餐酒食堂',
                score:4.5,
                address:'104台北市中山區松江路40號1樓',
                imgURL:'https://lh5.googleusercontent.com/p/AF1QipPWDSD7hQ0SH-92AtlDo-jFnLP5zvUx9xRYyIg4=w408-h274-k-no'
            },
            {
                title:'飯饌韓式料理',
                score:3.8,
                address:'100台北市中正區忠孝西路一段36號B1-8',
                imgURL:'https://lh5.googleusercontent.com/p/AF1QipPrDE5DZ1MTbNtdzWeFUhhZ2W2mUt1T7a5k9TjD=w408-h306-k-no'
            },
            {
                title:'韓太閣韓國烤肉料理',
                score:4.4,
                address:'10491台北市中山區林森北路119巷61號',
                imgURL:'https://lh5.googleusercontent.com/p/AF1QipO6t_XqNZTwqfcb9UIB0UGRzOZd5ezmRsNXC9UA=w408-h306-k-no'
            }
        ]
    },
    {
        meal:'晚餐',
        recommands:[
            {
                title:'六條家庭小吃',
                score:4.0,
                address:'10491台北市中山區林森北路107巷53號',
                imgURL:'https://lh5.googleusercontent.com/p/AF1QipPoclQd0zuewmPn31rugjaC2hEPlXNFBiN2cops=w425-h240-k-no'
            },
            {
                title:'春城雲南小吃',
                score:4.4,
                address:'100台北市中正區紹興南街4-3號',
                imgURL:'https://lh5.googleusercontent.com/p/AF1QipMnjdLOMjg2Pg3LtStbdFaVJxlDo9E1EZ9IdcxM=w408-h306-k-no'
            },
            {
                title:'咕嚕咕嚕小吃店',
                score:3.9,
                address:'10491台北市中山區林森北路261-4號',
                imgURL:'https://lh5.googleusercontent.com/p/AF1QipNpczSsnsBqdIE0S--Yr9JEuRTCWO_mQXxfx8Ez=w408-h544-k-no'
            }
        ]
    }
];