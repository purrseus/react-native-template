import { overlayLoading } from '@utilities';

const useLoaderContainer = () => {
  const handleOverlayLoading = async () => {
    overlayLoading.show();
    await wait(duration({ seconds: 3 }));
    overlayLoading.hide();
  };

  return { handleOverlayLoading };
};

export default useLoaderContainer;
