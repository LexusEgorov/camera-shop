export const PAGINATION_OUTPUT_COUNT = 9;

export enum AppRoute {
  Root = '/',
  Catalog = '/catalog/:page',
  Product = '/product/:id',
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
