import { overlayLoading } from '@/utils';

const useLoaderContainer = () => {
  const handleOverlayLoading = async () => {
    overlayLoading.show();
    await wait(duration({ s: 3 }));
    overlayLoading.hide();
  };

  return { handleOverlayLoading };
};

export default useLoaderContainer;
