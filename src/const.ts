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
  Cart = '/cart',
  AnyPage = '*',
}

export enum NameSpace {
  App = 'APP',
  CameraData = 'CAMERA_DATA',
  FilterData = 'FILTER_DATA',
  ShoppingCartData = 'SHOPPING_CART_DATA',
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
  PriceMin = 'price_gte',
  PriceMax = 'price_lte',
  Category = 'category',
  Type = 'type',
  Level = 'level',
}

export enum SortBy {
  Price = 'price',
  Rating = 'rating',
  NotSorted = 'not_sorted',
}

export enum SortType {
  Asc = 'asc',
  Desc = 'desc',
  NotSorted = 'not_sorted',
}

export enum FilterType {
  Photo = 'photocamera',
  Video = 'videocamera',
  Digital = 'digital',
  Film = 'film',
  Snapshot = 'snapshot',
  Collection = 'collection',
  Zero = 'zero',
  NonProfessional = 'non-professional',
  Professional = 'professional',
}

export enum FilterValue {
  Photo = 'Фотоаппарат',
  Video = 'Видеокамера',
  Digital = 'Цифровая',
  Film = 'Плёночная',
  Snapshot = 'Моментальная',
  Collection = 'Коллекционная',
  Zero = 'Нулевой',
  NonProfessional = 'Любительский',
  Professional = 'Профессиональный',
}
