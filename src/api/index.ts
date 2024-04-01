import http from './http';
import { AxiosError } from 'axios';
import { IImagePreview, IOrderPayload } from '../interface';

export const createImagePreview = async ({
  product,
  tweetUrl,
  color,
  side,
}: IImagePreview) => {
  const params = {
    product,
    tweetUrl,
    color,
    side,
  };

  try {
    const result = await http.get(`/image/generate`, { params });

    return result.data;
  } catch (e) {
    const error = e instanceof AxiosError && e.response ? e.response.data : e;

    return {
      error:
        error.message ||
        'Ne možemo generisati sliku sa proslijeđenim linkom 😭',
    };
  }
};

export const createOrder = async (orderPayload: IOrderPayload) => {
  try {
    const result = await http.post('/order/create', orderPayload);

    return result.data;
  } catch (e) {
    const error = e instanceof AxiosError && e.response ? e.response.data : e;

    return {
      error:
        error.message ||
        'Došlo je do greške prilikom kreiranja naružbe, pokušaj opet 😭',
    };
  }
};
