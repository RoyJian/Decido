import { Meal, DecideRes, RestaurantStyle } from './Interface';

export const restaurantStyles: RestaurantStyle[] = [
  {
    name: '日式',
    url: 'https://www.gomaji.com/blog/wp-content/uploads/2019/12/F1.jpg',
  },
  {
    name: '美式',
    url: 'https://blog.kkday.com/wp-content/uploads/%E7%BE%8E%E5%BC%8F%E9%A4%90%E5%BB%B3%EF%BC%88source-campus-cafe.jpeg',
  },
  {
    name: '韓式',
    url: 'https://www.upmedia.mg/upload/article/20201221173539605553.jpg',
  },
  {
    name: '小吃',
    url: 'https://images.deliveryhero.io/image/fd-tw/LH/e6kc-hero.jpg',
  },
  {
    name: '中餐',
    url: 'https://hotel.fhgh.com.tw/upload/news_dining_b/ALL_news_dining_21E21_aXVUglwioo.jpg',
  },
  {
    name: '麵館',
    url: 'https://images.deliveryhero.io/image/fd-tw/LH/a1eh-hero.jpg',
  },
];
export const initMealsArr: Meal[] = [
  {
    name: '早餐',
    time: {
      date: new Date().toDateString(),
      hour: 8,
      min: 0,
    },
    location: {
      name: '住家',
      lat: 25.03950866617472,
      lng: 121.53506260031203,
    },
  },
  {
    name: '午餐',
    time: {
      date: new Date().toDateString(),
      hour: 12,
      min: 0,
    },
    location: {
      name: '公司',
      lat: 25.03847474175392,
      lng: 121.53243942537702,
    },
  },
  {
    name: '晚餐',
    time: {
      date: new Date().toDateString(),
      hour: 18,
      min: 0,
    },
    location: {
      name: '住家',
      lat: 25.03950866617472,
      lng: 121.53506260031203,
    },
  },
];