export const PAGINATION_OUTPUT_COUNT = 9;

export enum Months {
  'Января',
  'Февраля',
  'Марта',
  'Апреля',
  'Мая',
  'Июня',
  'Июля',
  'Августа',
  'Сентября',
  'Октября',
  'Ноября',
  'Декабря',
}

export enum AppRoute {
  Root = '/',
  Catalog = '/catalog/:page',
  Product = '/product/:id/:tab',
  AnyPage = '*',
}

export enum NameSpace {
  App = 'APP',
  CameraData = 'CAMERA_DATA',
}

export enum APIRoute {
  Cameras = '/cameras/',
  Promo = '/promo',
  Reviews = '/reviews',
  Similar = '/similar',
}

export enum Tab {
  Characteristics = 'characteristics',
  Description = 'description'
}

export enum QueryParameter {
  Start = '_start',
  Limit = '_limit',
  NameLike = 'name_like',
  Sort = '_sort',
  Order = '_order',
}

export enum SortBy {
  Price = 'price',
  Rating = 'rating',
  NotSorted = 'not_sorted',
}

export enum SortType {
  Asc = 'asc',
  Desc = 'desc',
}
