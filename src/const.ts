export const PAGINATION_OUTPUT_COUNT = 9;

export enum AppRoute {
  Root = '/',
  Catalog = '/catalog/:page',
  Product = '/product/:id',
  AnyPage = '*',
}
