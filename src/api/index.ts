import http from './http';
import { AxiosError } from 'axios';
import { IImagePreview } from '../interface';

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
      error: true,
      message: error.message,
      ...error,
    }; //vidit kako cemo hendlat errore
  }
};
