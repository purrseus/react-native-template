import { QueryClient } from '@tanstack/react-query';

class AppQueryClient extends QueryClient {
  queryKeys = {
    photos: 'photos',
  };
}

export const queryClient = new AppQueryClient();
