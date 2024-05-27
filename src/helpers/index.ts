import { Product, ProductColor } from '../interface';

export const isValidUrl = (url: any) => {
  try {
    const newUrl = new URL(url);

    const validProtocols = ['http:', 'https:'];
    const validHostnames = ['twitter.com', 'x.com'];

    return (
      validProtocols.includes(newUrl.protocol) &&
      validHostnames.includes(newUrl.hostname)
    );
  } catch (err) {
    return false;
  }
};

export const formatColorName = (color: ProductColor) => {
  switch (color) {
    case ProductColor.BLACK:
      return 'Crna';
    case ProductColor.WHITE:
      return 'Bijela';
  }
};

export const formatProductName = (product: Product) => {
  switch (product) {
    case Product.SHIRT:
      return 'Majica';
    case Product.MUG:
      return 'Šolja';
  }
};
