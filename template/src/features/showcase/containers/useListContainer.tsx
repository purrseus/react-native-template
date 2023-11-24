import { QueryKey } from '@/core/enums';

const useListContainer = () => {
  const photosQueryKey = [QueryKey.Photos];

  return { photosQueryKey };
};

export default useListContainer;
