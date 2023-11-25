import http from '@/services';
import { QueryFunctionContext } from '@tanstack/react-query';
import { PhotosSchema } from '../schemas';

const fetchPhotos = http.responseDataAdapter(
  PhotosSchema,
  ({ pageParam = 1, signal }: QueryFunctionContext) =>
    http.get('/photos', {
      params: {
        _limit: 10,
        _page: pageParam,
      },
      signal,
    }),
);

const listAPI = {
  fetchPhotos,
};

export default listAPI;
