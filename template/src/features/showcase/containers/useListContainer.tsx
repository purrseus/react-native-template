import { queryClient } from '@/utils';

const useListContainer = () => {
  const photosQueryKey = [queryClient.queryKeys.photos];

  return { photosQueryKey };
};

export default useListContainer;
