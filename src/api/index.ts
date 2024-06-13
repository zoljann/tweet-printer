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
    console.log(error);

    return {
      error:
        error.message ||
        'Ne možemo generisati sliku sa proslijeđenim linkom 😭',
    };
  }
};

export const getAllOrders = async (page: number) => {
  const params = {
    page,
  };

  try {
    const result = await http.get('/order/get-all', { params });

    return result.data;
  } catch (e) {
    const error = e instanceof AxiosError && e.response ? e.response.data : e;

    return {
      error: error.message || 'Došlo je do greške prilikom dohvaćanja naružbi',
    };
  }
};

export const updateByOrderId = async (
  orderId: string,
  status: string,
  note?: string
) => {
  try {
    const result = await http.patch('/order/update', {
      orderId,
      status,
      note,
    });

    return result.data;
  } catch (e) {
    const error = e instanceof AxiosError && e.response ? e.response.data : e;

    return {
      error: error.message || 'Došlo je do greške prilikom ažuriranja narudžbe',
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

export const getAllImages = async () => {
  try {
    const result = await http.get('/product/get-all-images');

    return result.data.reverse();
  } catch (e) {
    const error = e instanceof AxiosError && e.response ? e.response.data : e;

    return {
      error: error.message || 'Došlo je do greške prilikom dohvaćanja naružbi',
    };
  }
};

export const completePaypalOrder = async (orderId: string) => {
  try {
    const result = await http.post('/order/complete-paypal-order', { orderId });

    return result.data;
  } catch (e) {
    const error = e instanceof AxiosError && e.response ? e.response.data : e;

    return {
      error:
        error.message ||
        'Došlo je do greške prilikom plaćanja, pokušaj opet 😭',
    };
  }
};

export const cancelPaypalTransation = async (paypalOrderId: string) => {
  try {
    const result = await http.post('/order/cancel-paypal-order', {
      paypalOrderId,
    });

    return result.data;
  } catch (e) {
    const error = e instanceof AxiosError && e.response ? e.response.data : e;

    return {
      error:
        error.message ||
        'Došlo je do greške prilikom plaćanja, pokušaj opet 😭',
    };
  }
};
