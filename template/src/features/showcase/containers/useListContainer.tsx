import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useCallback, useMemo } from 'react';
import { ListRenderItem } from 'react-native';
import { Item } from '../components';

export interface Data {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const useListContainer = () => {
  const config = useMemo(() => ({ accessProperties: ['data'] }), []);

  const getPhotos = useCallback(
    (requestConfig: AxiosRequestConfig): Promise<AxiosResponse<Data>> =>
      axios.get('https://jsonplaceholder.typicode.com/photos', requestConfig),
    [],
  );

  const renderItem: ListRenderItem<Data> = ({ item }) => <Item {...item} />;

  return { config, renderItem, getPhotos };
};

export default useListContainer;
