/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from '@services';
import { QueryFunction } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { photosAdapter } from '../adapters';

const getPhotos: QueryFunction<ReturnType<typeof photosAdapter>> = async ({
  pageParam = 1,
  signal,
}) => {
  const photos = await axiosInstance.get<any, AxiosRequestConfig>('/photos', {
    params: {
      _limit: 10,
      _page: pageParam,
    },
    signal,
  });

  return photosAdapter(photos);
};

const listAPI = {
  getPhotos,
};

export default listAPI;
