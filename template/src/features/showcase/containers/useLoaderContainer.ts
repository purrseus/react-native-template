import { OverlayLoading } from '@/components/core';

const useLoaderContainer = () => {
  const handleOverlayLoading = async () => {
    OverlayLoading.show();
    await wait(duration({ s: 3 }));
    OverlayLoading.hide();
  };

  return { handleOverlayLoading };
};

export default useLoaderContainer;
