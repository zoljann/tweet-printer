export interface IImagePreview {
  product: string;
  tweetUrl: string;
  color: string;
  side: string;
}

export interface ICartItem {
  product: Product;
  color: ProductColor;
  size: ProductSize;
  printSide: ProductPrintSide;
  tweetUrl: string;
  image: string;
  price: number;
}

export interface IOrderPayload {
  name: string;
  mobileNumber: string;
  state: string;
  city: string;
  address: string;
  shipping: string;
  items: any[];
}

export enum Product {
  SHIRT = 'shirt',
  MUG = 'mug',
}

export enum ProductColor {
  WHITE = 'white',
  BLACK = 'black',
}

export enum ProductSize {
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
}

export enum ProductPrintSide {
  FRONT = 'Natpis naprijed',
  BACK = 'Natpis pozadi',
}

export const SvgShirtIconPath =
  'M4.89 19.55L11.72 19a.86.86 0 0 1 1 .65c0 .06 0 .12 0 .17v28.5H41.61V19.81a.85.85 0 0 1 .85-.84 1 1 0 0 1 .24 0l6.76.55L52.52 8.37 36.43 2.05a9.13 9.13 0 0 1-2.66 5.3 9.39 9.39 0 0 1-6.6 2.7 9.36 9.36 0 0 1-6.59-2.7 9.2 9.2 0 0 1-2.67-5.3L1.83 8.37ZM34.75 1.85a50.7 50.7 0 0 1-7.58.57 50.68 50.68 0 0 1-7.57-.58 7.55 7.55 0 0 0 2.17 4.32 7.71 7.71 0 0 0 5.4 2.21 7.68 7.68 0 0 0 5.4-2.21A7.47 7.47 0 0 0 34.75 1.85ZM18.87 0a48.73 48.73 0 0 0 8.3.72A47.91 47.91 0 0 0 35.5 0h0a.91.91 0 0 1 .46 0l17.83 7a.84.84 0 0 1 .52 1l-3.39 12.7a.84.84 0 0 1-1 .64l-6.63-.52V49.16a.85.85 0 0 1-.85.84H11.89a.85.85 0 0 1-.85-.84V20.85l-6.62.52a.85.85 0 0 1-1-.64L0 8.06a.83.83 0 0 1 .51-1l17.79-7A1 1 0 0 1 18.68 0ZM37.36 19.09a.84.84 0 1 1 0 1.68H30.57a.84.84 0 1 1 0-1.68Z';

export const SvgMugIconPath =
  'M42.2,9.35H37.31V1.92A1.92,1.92,0,0,0,35.38,0H1.92A1.92,1.92,0,0,0,0,1.92V44a6,6,0,0,0,6,6H31.33a6,6,0,0,0,6-6V39.47h4.9A5.76,5.76,0,0,0,48,33.72V15.09A5.74,5.74,0,0,0,42.2,9.35Zm-4.89,7.37h2.61a.94.94,0,0,1,.93.94V31.1a.94.94,0,0,1-.94.94h-2.6Zm-6,31.36H6A4.06,4.06,0,0,1,1.92,44V2.12H35.38V44A4.05,4.05,0,0,1,31.33,48.08ZM42.2,37.54H37.31V34h3.54A1.92,1.92,0,0,0,42.77,32h0V16.72h0a1.92,1.92,0,0,0-1.93-1.92H37.31V11.27H42.2A3.83,3.83,0,0,1,46,15.09V33.72A3.82,3.82,0,0,1,42.2,37.54Z';
